import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-third-screen-b',
  templateUrl: './third-screen-b.component.html',
  styleUrls: ['./third-screen-b.component.css']
})
export class ThirdScreenBComponent implements OnInit {
  businessProfile: any = {
    businessName: '',
    legalStructure: '',
    businessNature: '',
    keyProducts: '',
    annualTurnover: '',
    operationalYears: '',
    primaryCustomers: '',
    revenueSources: '',
    creditFacilities: '',
    bankingServices: ''
  };

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.businessProfile = userInfo[0].businessProfile || this.businessProfile;
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
        userInfo[0].businessProfile = this.businessProfile;
        await db.put('userInfo', userInfo[0]);
        this.router.navigate(['/fourth-screen']);
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
    this.router.navigate(['/second-screen']);
  }
}