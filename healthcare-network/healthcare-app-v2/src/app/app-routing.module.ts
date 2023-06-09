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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { RecordComponent } from './Record/Record.component';
import { MarketplaceComponent } from './Marketplace/Marketplace.component';

import { PatientComponent } from './Patient/Patient.component';
import { DoctorComponent } from './Doctor/Doctor.component';
import { HealthcareProviderComponent } from './HealthcareProvider/HealthcareProvider.component';
import { GovernmentComponent } from './Government/Government.component';

import { TransferComponent } from './Transfer/Transfer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Record', component: RecordComponent },
  { path: 'Marketplace', component: MarketplaceComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'Doctor', component: DoctorComponent },
  { path: 'HealthcareProvider', component: HealthcareProviderComponent },
  { path: 'Government', component: GovernmentComponent },
  { path: 'Transfer', component: TransferComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
