import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-ten-screen',
  templateUrl: './ten-screen.component.html',
  styleUrls: ['./ten-screen.component.css']
})
export class TenScreenComponent implements OnInit {
  rating: number = 0;
  feedback: string = '';
  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.rating = userInfo[0].rating || 0;
        this.feedback = userInfo[0].feedback || '';
      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
  }

  async navigateToNext() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        userInfo[0].rating = this.rating;
        userInfo[0].feedback = this.feedback;
        await db.put('userInfo', userInfo[0]);
       // alert('Thank you for your rating!');
        this.router.navigate(['/finish']);
      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
  }

  async navigateToBack() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        if (userInfo[0].selectedIndividual) {
          this.router.navigate(['/ninth-screen']);
        } else if (userInfo[0].selectedBusiness) {
          this.router.navigate(['/third-screen-b']);
        } else {
          alert('Please select either an individual or a business.');
        }
      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
  }
}