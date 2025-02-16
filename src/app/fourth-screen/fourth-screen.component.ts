import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-fourth-screen',
  templateUrl: './fourth-screen.component.html',
  styleUrls: ['./fourth-screen.component.css']
})
export class FourthScreenComponent implements OnInit {
  riskAnalysis: any = {
    investmentExperience: '',
    investmentApproach: '',
    investmentHorizon: '',
    marketReactions: '',
    liquidityNeeds: '',
    retirementPlans: '',
    taxSavingInterest: ''
  };

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.riskAnalysis = userInfo[0].riskAnalysis || this.riskAnalysis;
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
        userInfo[0].riskAnalysis = this.riskAnalysis;
        await db.put('userInfo', userInfo[0]);
        this.router.navigate(['/fifth-screen']);
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

        if (userInfo[0].selectedIndividual){
          this.router.navigate(['/third-screen-a']);
        }
        else if (userInfo[0].selectedBusiness){
          this.router.navigate(['/third-screen-b']);
        }
        else{
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