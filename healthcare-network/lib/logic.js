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

    // set the new owner of the record
    transfer.record.owner = transfer.newOwner;
    let assetRegistry = await getAssetRegistry('org.healthcare.network.Record');

    // emit a notification that a transfer has occurred
    let transferNotification = getFactory().newEvent('org.healthcare.network', 'TransferNotification');
    transferNotification.record = transfer.record;
    emit(transferNotification);

    // persist the state of the record
    await assetRegistry.update(transfer.record);
}
