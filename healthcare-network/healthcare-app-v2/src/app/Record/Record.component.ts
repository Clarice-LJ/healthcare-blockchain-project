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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecordService } from './Record.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-record',
  templateUrl: './Record.component.html',
  styleUrls: ['./Record.component.css'],
  providers: [RecordService]
})
export class RecordComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  recordId = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  content = new FormControl('', Validators.required);
  length = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceRecord: RecordService, fb: FormBuilder) {
    this.myForm = fb.group({
      recordId: this.recordId,
      description: this.description,
      content: this.content,
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
        tempList.push(asset);
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.healthcare.network.Record',
      'recordId': this.recordId.value,
      'description': this.description.value,
      'content': this.content.value,
      'length': this.length.value,
      'state': this.state.value,
      'price': this.price.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'recordId': null,
      'description': null,
      'content': null,
      'length': null,
      'state': null,
      'price': null,
      'owner': null
    });

    return this.serviceRecord.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'recordId': null,
        'description': null,
        'content': null,
        'length': null,
        'state': null,
        'price': null,
        'owner': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.healthcare.network.Record',
      'description': this.description.value,
      'content': this.content.value,
      'length': this.length.value,
      'state': this.state.value,
      'price': this.price.value,
      'owner': this.owner.value
    };

    return this.serviceRecord.updateAsset(form.get('recordId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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


  deleteAsset(): Promise<any> {

    return this.serviceRecord.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceRecord.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'recordId': null,
        'description': null,
        'content': null,
        'length': null,
        'state': null,
        'price': null,
        'owner': null
      };

      if (result.recordId) {
        formObject.recordId = result.recordId;
      } else {
        formObject.recordId = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.content) {
        formObject.content = result.content;
      } else {
        formObject.content = null;
      }

      if (result.length) {
        formObject.length = result.length;
      } else {
        formObject.length = null;
      }

      if (result.state) {
        formObject.state = result.state;
      } else {
        formObject.state = null;
      }

      if (result.price) {
        formObject.price = result.price;
      } else {
        formObject.price = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      this.myForm.setValue(formObject);

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

  resetForm(): void {
    this.myForm.setValue({
      'recordId': null,
      'description': null,
      'content': null,
      'length': null,
      'state': null,
      'price': null,
      'owner': null
      });
  }

}
