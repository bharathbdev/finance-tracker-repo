import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-seventh-screen',
  templateUrl: './seventh-screen.component.html',
  styleUrls: ['./seventh-screen.component.css']
})
export class SeventhScreenComponent implements OnInit {
  productDisplay: any = {
    homeLoan: false,
    personalLoan: false,
    loanAgainstProperty: false,
    carLoan: false,
    fastTag: false,
    travelCards: false,
    travelInsurance: false,
    educationLoan: false,
    lifeInsurance: false,
    healthInsurance: false,
    dematAccount: false,
    startupCurrentAccount: false
  };

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.productDisplay = userInfo[0].productDisplay || this.productDisplay;
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
        userInfo[0].productDisplay = this.productDisplay;
        await db.put('userInfo', userInfo[0]);
        this.router.navigate(['/eighth-screen']);
      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
  }

  navigateToBack() {
    this.router.navigate(['/sixth-screen']);
  }
}