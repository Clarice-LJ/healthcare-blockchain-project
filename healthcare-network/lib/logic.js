/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Transfer the record to a new owner
 * @param {org.healthcare.network.Transfer} transfer
 * @transaction
 */
async function transferRecord(transfer) {
    if(transfer.record.state === 'PRIVATE') {
      transfer.record.owner = transfer.newOwner;
      let assetRegistry = await getAssetRegistry('org.healthcare.network.Record');
      await assetRegistry.update(transfer.record);
    }

    if(transfer.record.state === 'FOR_SALE') {
      // Update the balance of seller and buyer
      var seller = transfer.record.owner;
      var buyer = transfer.newOwner;
      var price = transfer.record.price;
      if (buyer.wallet < price) {
        throw new Error('Point in the wallet is smaller than the price of record');
      }
      seller.wallet += price;
      buyer.wallet -= price;

      // set the new owner of the record
      transfer.record.owner = transfer.newOwner;
      
      // Mark the record as PRIVATE and set the price as 0
      transfer.record.state = 'PRIVATE';
      transfer.record.price = 0;

      let assetRegistry = await getAssetRegistry('org.healthcare.network.Record');

      // persist the state of the participants and record
      // Update seller
      if (seller.getFullyQualifiedType() === 'org.healthcare.network.Patient') {
        let participantRegistry  = await getParticipantRegistry('org.healthcare.network.Patient');
          await participantRegistry.update(seller);
      }
      else if (seller.getFullyQualifiedType() === 'org.healthcare.network.Doctor') {
        let participantRegistry  = await getParticipantRegistry('org.healthcare.network.Doctor');
          await participantRegistry.update(seller);
      }
      else if (seller.getFullyQualifiedType() === 'org.healthcare.network.HealthcareProvider') {
          let participantRegistry  = await getParticipantRegistry('org.healthcare.network.HealthcareProvider');
          await participantRegistry.update(seller);
      }
      else if (seller.getFullyQualifiedType() === 'org.healthcare.network.Government') {
          let participantRegistry  = await getParticipantRegistry('org.healthcare.network.Government');
          await participantRegistry.update(seller);
      }
    
      // Update buyer
      if (buyer.getFullyQualifiedType() === 'org.healthcare.network.Patient') {
        let participantRegistry  = await getParticipantRegistry('org.healthcare.network.Patient');
          await participantRegistry.update(buyer);
      }
      else if (buyer.getFullyQualifiedType() === 'org.healthcare.network.Doctor') {
        let participantRegistry  = await getParticipantRegistry('org.healthcare.network.Doctor');
          await participantRegistry.update(buyer);
      }
      else if (buyer.getFullyQualifiedType() === 'org.healthcare.network.HealthcareProvider') {
          let participantRegistry  = await getParticipantRegistry('org.healthcare.network.HealthcareProvider');
          await participantRegistry.update(buyer);
      }
      else if (buyer.getFullyQualifiedType() === 'org.healthcare.network.Government') {
          let participantRegistry  = await getParticipantRegistry('org.healthcare.network.Government');
          await participantRegistry.update(buyer);
      }

      // emit a notification that a transfer has occurred
      // let transferNotification = getFactory().newEvent('org.healthcare.network', 'TransferNotification');
      // transferNotification.record = transfer.record;
      // emit(transferNotification);
      
      await assetRegistry.update(transfer.record);
    }
}
