import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BookARide,
  DatabaseOperationsService,
} from '../database-operations.service';
import { ToastrService } from 'ngx-toastr';
import { AnchorNavigationService } from '../anchor-navigation.service';
import { MailerService } from '../mailer.service';

@Component({
  selector: 'app-bookaride',
  templateUrl: './bookaride.component.html',
  styleUrls: ['./bookaride.component.scss'],
})
export class BookarideComponent implements OnInit {
  @ViewChild('faq') faq!: ElementRef;

  public tripRequest: FormGroup;
  public personalInfo: FormGroup;
  firstStepCompleted = false;

  constructor(
    public fb: FormBuilder,
    private dbService: DatabaseOperationsService,
    public toastr: ToastrService,
    public anchorNavigationService: AnchorNavigationService,
    public mailerService: MailerService
  ) {}

  ngOnInit(): void {
    this.createTripRequestForm();
    this.createPersonalInfoForm();
    this.handleFaqclick();
  }

  handleFaqclick() {
    this.anchorNavigationService.navigation$.subscribe((navigateTo: string) => {
      if (navigateTo === 'faq') {
        this.faq.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'start',
        });
      }
    });
  }

  createTripRequestForm() {
    this.tripRequest = this.fb.group({
      pickupStreet: ['',[Validators.required]],
      pickupCity: ['', [Validators.required]],
      pickupState: ['',[Validators.required]],
      dropoffStreet: ['',[Validators.required]],
      dropoffCity: ['',[Validators.required]],
      dropoffState: ['',[Validators.required]],
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
      lastName: ['',[Validators.required]],
      dob: ['',[Validators.required]],
      homeAddress: ['',[Validators.required]],
      medicalNumber: ['',[Validators.pattern("^((\\+1-?)|0)?[0-9]{10}$")]],
      city: ['',[Validators.required]],
      state: ['',[Validators.required]],
      zipcode: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      phone: ['',[Validators.required, Validators.pattern("^((\\+1-?)|0)?[0-9]{10}$")]],
    });
  }

  get firstName() {
    return this.personalInfo.get('firstName');
  }
  get lastName() {
    return this.personalInfo.get('lastName');
  }
  get dob() {
    return this.personalInfo.get('dob');
  }
  get homeAddress() {
    return this.personalInfo.get('homeAddress');
  }
  get medicalNumber() {
    return this.personalInfo.get('medicalNumber');
  }
  get city() {
    return this.personalInfo.get('city');
  }
  get state() {
    return this.personalInfo.get('state');
  }
  get zipcode() {
    return this.personalInfo.get('zipcode');
  }
  get email() {
    return this.personalInfo.get('email');
  }
  get phone() {
    return this.personalInfo.get('phone');
  }

  submitDetails() {
    if(this.personalInfo.valid && this.tripRequest.valid){
      const bookingDetails = {
        ...this.personalInfo.value,
        ...this.tripRequest.value,
      };
      this.dbService.addToBookARideList(bookingDetails);
      this.mailerService.sendRideDetails(bookingDetails).then((response) => {
        if (response.status === 200){
          this.toastr.success(
            this.personalInfo.value.firstName +
              ' - Your details have been submitted Successfully!'
          );
        }else{
          this.toastr.error(
            this.personalInfo.value.firstName +
              ' - An error occured, please try later'
          );
        }
      
      });
    }else{
      this.toastr.error(
          ' Please fill all the Required details'
      );
    }


  }

  toggleStep(){
    this.firstStepCompleted = true;
  }
}
