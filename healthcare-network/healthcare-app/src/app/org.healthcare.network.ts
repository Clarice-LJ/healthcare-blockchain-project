import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.healthcare.network{
   export abstract class User extends Participant {
      email: string;
      firstName: string;
      lastName: string;
   }
   export class Patient extends User {
   }
   export class Doctor extends User {
      organisation: string;
   }
   export class HealthcareProvider extends User {
      organisation: string;
   }
   export class Government extends User {
      organisation: string;
   }
   export class Record extends Asset {
      recordId: string;
      description: string;
      content: string;
      length: string;
      owner: User;
   }
   export class Transfer extends Transaction {
      record: Record;
      newOwner: User;
   }
   export class TransferNotification extends Event {
      record: Record;
   }
   export class RemoveNotification extends Event {
      record: Record;
   }
// }
