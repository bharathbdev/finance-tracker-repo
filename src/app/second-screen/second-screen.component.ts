import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-second-screen',
  templateUrl: './second-screen.component.html',
  styleUrls: ['./second-screen.component.css']
})
export class SecondScreenComponent implements OnInit {
  individualsOptions: string[] = ['Existing User', 'New User'];
  businessOptions: string[] = ['Existing User'];
  selectedIndividual: string = '';
  selectedBusiness: string = '';
  disableBusiness: boolean = false;
  disableIndividuals: boolean = false;

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.selectedIndividual = userInfo[0].selectedIndividual || '';
        this.selectedBusiness = userInfo[0].selectedBusiness || '';
        this.updateDropdownState();
      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
  }

  updateDropdownState() {
    this.disableBusiness = !!this.selectedIndividual;
    this.disableIndividuals = !!this.selectedBusiness;
  }

  onIndividualChange() {
    if (this.selectedIndividual) {
      this.selectedBusiness = ''; // Clear business selection if user selects individual
    }
    this.updateDropdownState();
  }

  onBusinessChange() {
    if (this.selectedBusiness) {
      this.selectedIndividual = ''; // Clear individual selection if user selects business
    }
    this.updateDropdownState();
  }

  async navigateToNext() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        userInfo[0].selectedIndividual = this.selectedIndividual;
        userInfo[0].selectedBusiness = this.selectedBusiness;
        await db.put('userInfo', userInfo[0]);
        if (this.selectedIndividual) {
          this.router.navigate(['/third-screen-a']);
        } else if (this.selectedBusiness) {
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

  navigateToBack() {
    this.router.navigate(['/first-screen']);
  }
}
