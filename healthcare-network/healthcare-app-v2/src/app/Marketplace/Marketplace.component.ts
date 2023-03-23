import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { MarketplaceService } from './Marketplace.service';
import { RecordService } from '../Record/Record.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-record',
  templateUrl: './Marketplace.component.html',
  styleUrls: ['./Marketplace.component.css'],
  providers: [RecordService]
})

export class MarketplaceComponent implements OnInit {

    myForm: FormGroup;
    private errorMessage;
    private allAssets;

    recordId = new FormControl('', Validators.required);
    description = new FormControl('', Validators.required);
    contant = new FormControl('', Validators.required);
    length = new FormControl('', Validators.required);
    state = new FormControl('', Validators.required);
    price = new FormControl('', Validators.required);
    owner = new FormControl('', Validators.required);
    
    constructor(public serviceRecord: RecordService, fb: FormBuilder) {
        this.myForm = fb.group({
          recordId: this.recordId,
          description: this.description,
          contant: this.contant,
          length: this.length,
          state: this.state,
          price: this.price,
          owner: this.owner
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
}