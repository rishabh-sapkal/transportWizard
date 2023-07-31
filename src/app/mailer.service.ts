import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class MailerService {
  constructor() {}

  async sendRideDetails(details: any) {
    emailjs.init('VROD8u7EmOdbSA23i');
    const status = await emailjs.send('service_jmac4tl', 'template_2dzftqa', {
      from_name: 'Rishabh',
      to_name: 'Team Innovative Web Tech',
      reply_to: 'rishabhsapkal007@gmail.com',
      ...details
    });

    return status
  }

  async sendContactDetails(details: any) {
    emailjs.init('VROD8u7EmOdbSA23i');
    const status = await emailjs.send('service_jmac4tl', 'template_x35kin4', {
      from_name: 'Rishabh',
      to_name: 'Team Innovative Web Tech',
      reply_to: 'rishabhsapkal007@gmail.com',
      ...details
    });

    return status
  }
}
