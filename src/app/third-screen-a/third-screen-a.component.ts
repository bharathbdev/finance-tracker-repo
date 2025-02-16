import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-third-screen-a',
  templateUrl: './third-screen-a.component.html',
  styleUrls: ['./third-screen-a.component.css']
})
export class ThirdScreenAComponent implements OnInit {
  profile: any = {
    name: '',
    age: '',
    gender: '',
    location: '',
    pincode: '',
    languages: {
      hindi: false,
      english: false,
      marathi: false
    },
    occupation: '',
    income: '',
    maritalStatus: '',
    dependents: '',
    savings: '',
    financialGoal: '',
    insurance: ''
  };

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.profile = userInfo[0].customerProfile || this.profile;
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
        userInfo[0].customerProfile = this.profile;
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