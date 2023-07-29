import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnchorNavigationService } from '../anchor-navigation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseOperationsService } from '../database-operations.service';
import { MailerService } from '../mailer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  @ViewChild('contactUs') contactUs! : ElementRef;

  public contactUsForm: FormGroup;
  
  constructor(  private anchorNavigationService: AnchorNavigationService ,  
    public fb: FormBuilder, private dbService: DatabaseOperationsService,
    public toastr: ToastrService,
    public mailerService: MailerService){

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
    const contacDetails = this.contactUsForm.value;
    console.log(contacDetails, 'CONTACT US')

    this.dbService.addToContactUsList(contacDetails);
    this.mailerService.sendContactDetails(contacDetails).then((response) => {
      if (response.status === 200){
        this.toastr.success(
          contacDetails.fullName +
            ' - Your details have been submitted Successfully!'
        );
      }else{
        this.toastr.error(
          contacDetails.fullName +
            ' - An error occured, please try later'
        );
      }
    
    });
    this.ResetForm();
  }
}
