import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookARide, DatabaseOperationsService } from '../database-operations.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookaride',
  templateUrl: './bookaride.component.html',
  styleUrls: ['./bookaride.component.scss'],
})
export class BookarideComponent implements OnInit {
  public tripRequest: FormGroup;
  public personalInfo: FormGroup;

  constructor(public fb: FormBuilder, private dbService : DatabaseOperationsService, public toastr: ToastrService) {}

  ngOnInit(): void {
    this.createTripRequestForm();
    this.createPersonalInfoForm();
  }

  createTripRequestForm() {
    this.tripRequest = this.fb.group({
      pickupStreet: [''],
      pickupCity: ['', [Validators.required, Validators.minLength(2)]],
      pickupState: [''],
      dropoffStreet: [''],
      dropoffCity: [''],
      dropoffState: [''],
    });
  }

  get pickupStreet() {
    return this.tripRequest.get('pickupStreet');
  }

  get pickupCity() {
    return this.tripRequest.get('pickupCity');
  }
  get pickupState() {
    return this.tripRequest.get('pickupState');
  }
  get dropoffStreet() {
    return this.tripRequest.get('dropoffStreet');
  }
  get dropoffCity() {
    return this.tripRequest.get('dropoffCity');
  }
  get dropoffState() {
    return this.tripRequest.get('dropoffState');
  }

  createPersonalInfoForm() {
    this.personalInfo = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      dob: [''],
      homeAddress: [''],
      medicalNumber: [''],
      city: [''],
      state: [''],
      zipcode: [''],
      email: [''],
      phone: [''],
    });
  }

  get firstName() {
    return this.tripRequest.get('firstName');
  }
  get lastName() {
    return this.tripRequest.get('lastName');
  }
  get dob() {
    return this.tripRequest.get('dob');
  }
  get homeAddress() {
    return this.tripRequest.get('homeAddress');
  }
  get medicalNumber() {
    return this.tripRequest.get('medicalNumber');
  }
  get city() {
    return this.tripRequest.get('city');
  }
  get zipcode() {
    return this.tripRequest.get('zipcode');
  }
  get email() {
    return this.tripRequest.get('email');
  }
  get phone() {
    return this.tripRequest.get('phone');
  }


  submitDetails(){
    console.log(this.personalInfo.value , this.tripRequest.value, 'FORM VALUE')
    const bookingDetails = {...this.personalInfo.value, ...this.tripRequest.value}
    console.log(bookingDetails)
    this.dbService.addToBookARideList(bookingDetails);
    this.toastr.success(
      this.personalInfo.value.firstName + ' - Your details have been submitted Successfully!'
    );
  }
}
