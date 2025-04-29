import { Component, OnInit } from '@angular/core';
import emailjs from 'emailjs-com';
import axios from 'axios'; // Install axios using `npm install axios`
//https://jsonbin.io/app/bins
//https://dashboard.emailjs.com/admin


@Component({
  selector: 'app-new-screen',
  templateUrl: './new-screen.component.html',
  styleUrls: ['./new-screen.component.scss']
})
export class NewScreenComponent {
  private API_URL = 'https://api.jsonbin.io/v3/b/68107fcc8960c979a58f7624'; // Replace with your Bin URL
  private API_KEY = '$2a$10$itDJF.xMsHyvZX2RC27GQeUzOE7HXO81qdTRBLyaw8Qfmy2AJs68e'; // Replace with your Master Key

  constructor() { }

  async updateOnlineJson(userId: string, userName: string) {
    try {
      // Fetch the current data from JSONBin
      const response = await axios.get(this.API_URL, {
        headers: {
          'X-Master-Key': this.API_KEY
        }
      });

      // Get the current users array
      const currentData = response.data.record;
      const users = currentData.users || [];

      // Check if the user already exists
      const existingUserIndex = users.findIndex((user: { name: string; }) => user.name === userName);

      if (existingUserIndex !== -1) {
        // Update the existing user's data
        users[existingUserIndex] = {
          id: userId,
          name: userName,
          loginTime: new Date().toISOString()
        };
        console.log(`User ${userName} updated.`);
      } else {
        // Add the new user login data
        users.push({
          id: userId,
          name: userName,
          loginTime: new Date().toISOString()
        });
        console.log(`User ${userName} added.`);
      }

      // Update the JSONBin with the new data
      await axios.put(this.API_URL, { users }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': this.API_KEY
        }
      });

      console.log('User login data saved successfully!');
      alert('User login data updated successfully!');

      // Optionally fetch and log the updated data
      await this.getOnlineJsonData();
    } catch (error) {
      console.error('Error updating JSONBin:', error);
      alert('Failed to update JSONBin. Please try again.');
    }
  }

  async getOnlineJsonData() {
    try {
      // Fetch the current data from JSONBin
      const response = await axios.get(this.API_URL, {
        headers: {
          'X-Master-Key': this.API_KEY
        }
      });

      // Log the fetched data
      const data = response.data.record;
      console.log('Fetched data from JSONBin:', data);

      // You can process or display the data as needed
      alert('Fetched data: ' + JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data from JSONBin:', error);
      alert('Failed to fetch data from JSONBin. Please try again.');
    }
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

  sendEmail() {
    const serviceID = 'default_service'; // Your EmailJS Service ID
    const templateID = 'template_rk558uc'; // Your EmailJS Template ID
    const publicKey = 'ZJB-pnZ-ExYa2WyYd'; // Your EmailJS Public Key

    const templateParams = {
      to_email: 'bharathbit2015@gmail.com', // Recipient email address
      message: 'A user has logged in to the application.' // Custom message
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again.');
      });
  }
}