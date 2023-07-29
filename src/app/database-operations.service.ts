import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

export interface ContactUs {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface BookARide {
  pickupStreet: string;
  pickupCity: string;
  dropoffStreet: string;
  dropoffCity: string;
  dropoffState: string;
  firstName: string;
  lastName: string;
  dob: string;
  homeAddress: string;
  medicalNumber: string;
  city: string;
  zipcode: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseOperationsService {
  constructor(private db: AngularFireDatabase) {}

  addToContactUsList(client: ContactUs) {
    this.db.list('contact-us').push({
      fullName: client.fullName,
      email: client.email,
      phone: client.phone,
      subject: client.subject,
      message: client.message,
    });
  }

  addToBookARideList(bookingDetails: BookARide) {
    this.db.list('bookings').push({
      pickupStreet: bookingDetails.pickupStreet,
      pickupCity: bookingDetails. pickupCity,
      dropoffStreet: bookingDetails.dropoffStreet,
      dropoffCity: bookingDetails.dropoffCity,
      dropoffState: bookingDetails.dropoffState,
      firstName: bookingDetails.firstName,
      lastName: bookingDetails.lastName,
      dob: bookingDetails.dob,
      homeAddress: bookingDetails.homeAddress,
      medicalNumber: bookingDetails.medicalNumber,
      city: bookingDetails.city,
      zipcode: bookingDetails.zipcode,
      email: bookingDetails.email,
      phone: bookingDetails.phone
    });
  }
}
