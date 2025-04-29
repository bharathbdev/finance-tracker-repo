import { Component } from '@angular/core';

@Component({
  selector: 'app-new-screen',
  templateUrl: './new-screen.component.html',
  styleUrl: './new-screen.component.scss'
})
export class NewScreenComponent {
  navigateToFirstScreen() {
    // Your existing navigation logic
  }

  openWhatsApp() {
    const phoneNumber = '919538802191'; // Your WhatsApp number with country code
    const message = encodeURIComponent('Hello, I would like to connect with you!');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
  makePhoneCall() {
    const phoneNumber = '9538802191'; // Your phone number
    window.open(`tel:${phoneNumber}`, '_self');
  }
}
