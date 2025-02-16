import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.css']
})
export class FirstScreenComponent {
  email: string = '';
  mobile: string = '';
  isNextDisabled: boolean = false;

  constructor(private router: Router) { }

  async navigateToNext() {
    if (this.email && this.mobile) {
      const db = await openDB('FinanceTrackerDB', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('userInfo')) {
            const store = db.createObjectStore('userInfo', { keyPath: 'id', autoIncrement: true });
            store.createIndex('email', 'email', { unique: false });
          }
        },
      });

      const userInfo = await db.getAllFromIndex('userInfo', 'email', this.email);

      if (userInfo.length > 0) {
        // alert('User already found.');
        // this.isNextDisabled = true; // Disable the "Next" button
        // return;
      }
    else{
      

      await db.put('userInfo', { email: this.email, mobile: this.mobile });
    }
      localStorage.setItem('email', this.email);
      this.router.navigate(['/second-screen']);
    } else {
      alert('Please enter both email and mobile number.');
    }
  }
}