import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-ninth-screen',
  templateUrl: './ninth-screen.component.html',
  styleUrls: ['./ninth-screen.component.css']
})
export class NinthScreenComponent implements OnInit {
  taxPlan: any = {
    taxPlanning: '',
    taxRegime: ''
  };
  baseUrl: string = window.location.origin;
  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    console.log("##")
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.taxPlan.taxPlanning = userInfo[0].taxPlan?.taxPlanning || '';
        this.taxPlan.taxRegime = userInfo[0].taxPlan?.taxRegime || '';
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
        userInfo[0].taxPlan = this.taxPlan;
        await db.put('userInfo', userInfo[0]);
        this.router.navigate(['/tenth-screen']);
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
    this.router.navigate(['/eighth-screen']);
  }

  onTaxPlanningChange(event: any) {
    if (event.value === 'no') {
      this.navigateToNext();
    }
  }

  onTaxRegimeChange(event: any) {
    // Additional logic can be added here if needed
  }
}