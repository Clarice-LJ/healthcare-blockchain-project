import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { MarketplaceService } from './Marketplace.service';
import { RecordService } from '../Record/Record.service';
import { TransferService } from '../Transfer/Transfer.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-record',
  templateUrl: './Marketplace.component.html',
  styleUrls: ['./Marketplace.component.css'],
  providers: [RecordService, TransferService]
})

export class MarketplaceComponent implements OnInit {

    myForm: FormGroup;
    myTransferForm: FormGroup;
    isModalVisible = false;
    private errorMessage;
    private allAssets;

    private allTransactions;
    private Transaction;
    // private currentId;

    private currentRecordId;

    recordId = new FormControl('', Validators.required);
    description = new FormControl('', Validators.required);
    contant = new FormControl('', Validators.required);
    length = new FormControl('', Validators.required);
    state = new FormControl('', Validators.required);
    price = new FormControl('', Validators.required);
    owner = new FormControl('', Validators.required);

    record = new FormControl('', Validators.required);
    newOwner = new FormControl('', Validators.required);
    transactionId = new FormControl('', Validators.required);
    timestamp = new FormControl('', Validators.required);
    
    constructor(public serviceRecord: RecordService, public serviceTransfer: TransferService, fb: FormBuilder) {
        this.myForm = fb.group({
          recordId: this.recordId,
          description: this.description,
          contant: this.contant,
          length: this.length,
          state: this.state,
          price: this.price,
          owner: this.owner
        });

        this.myTransferForm = fb.group({
          record: this.record,
          newOwner: this.newOwner,
          transactionId: this.transactionId,
          timestamp: this.timestamp
        });
      };
      

    ngOnInit(): void {
        this.loadAll();
      }
    
    loadAll(): Promise<any> {
      const tempList = [];
      return this.serviceRecord.getAll()
      .toPromise()
      .then((result) => {
          this.errorMessage = null;
          result.forEach(asset => {
              if (asset.state.toString() === "FOR_SALE") {
                  tempList.push(asset);
              }             
          });
      this.allAssets = tempList;
      })
      .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
          this.errorMessage = error;
      }
      });

    }

    // Make Buying Modal visiable and get the current recordId
    toggleModalVisibility(recordToBuy) {
      this.isModalVisible = !this.isModalVisible;
      this.currentRecordId = recordToBuy;
    }

    cancelModal() {
      this.isModalVisible = false;
    }

    addTransaction(form: any): Promise<any> {
      this.isModalVisible = !this.isModalVisible;
      this.Transaction = {
        $class: 'org.healthcare.network.Transfer',
        // 'record': this.record.value,
        'record': this.currentRecordId,
        'newOwner': this.newOwner.value
      };
  
      this.myTransferForm.setValue({
        'record': null,
        'newOwner': null,
        'transactionId': null,
        'timestamp': null
      });
  
      return this.serviceTransfer.addTransaction(this.Transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myTransferForm.setValue({
          'record': null,
          'newOwner': null,
          'transactionId': null,
          'timestamp': null
        });
        this.loadAll();
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
    }
}