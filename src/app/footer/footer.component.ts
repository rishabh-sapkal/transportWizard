import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnchorNavigationService } from '../anchor-navigation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseOperationsService } from '../database-operations.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  @ViewChild('contactUs') contactUs! : ElementRef;

  public contactUsForm: FormGroup;
  
  constructor(  private anchorNavigationService: AnchorNavigationService ,  public fb: FormBuilder, private dbService: DatabaseOperationsService){

  }

  get fullName() {
    return this.contactUsForm.get('fullName');
  }
  get phone() {
    return this.contactUsForm.get('phone');
  }
  get email() {
    return this.contactUsForm.get('email');
  }
  get subject() {
    return this.contactUsForm.get('subject');
  }
  get message() {
    return this.contactUsForm.get('message');
  }
  
  ngOnInit(): void {
    this.createContactUsForm();
    this.anchorNavigationService.navigation$.subscribe((navigateTo: string)=>{
      if(navigateTo === 'contactUs'){
        this.contactUs.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
      }
    })
  }

  createContactUsForm() {
    this.contactUsForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      subject: [''],
      message: [''],
    });
  }


  ResetForm() {
    this.contactUsForm.reset();
  }

  submitContactData() {
    console.log(this.contactUsForm.value, 'CONTACT US')
    this.dbService.addToContactUsList(this.contactUsForm.value);
    // this.toastr.success(
    //   this.studentForm.controls['firstName'].value + ' successfully added!'
    // );
    this.ResetForm();
  }
}
