import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

export interface ContactUs {
  fullName:string;
  email:string;
  phone:string;
  subject:string;
  message:string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseOperationsService {
  
 
  constructor(private db: AngularFireDatabase) { }

  addToContactUsList(client: ContactUs) {
    this.db.list('contact-us').push({
      fullName: client.fullName,
      email: client.email,
      phone: client.phone,
      subject: client.subject,
      message: client.message
    });
  }


}
 