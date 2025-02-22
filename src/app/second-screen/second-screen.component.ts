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
  selectedExistingIndividual: any = null;
  selectedExistingBusiness: any = null;
  disableBusiness: boolean = false;
  disableIndividuals: boolean = false;

  existingIndividuals = [
    { name: 'SKV Prasad', age: "36-45", gender: 'male', location: 'urban', pincode: 670103, cifId: 223454587 },
    { name: 'Chandrakant', age: "36-45", gender: 'male', location: 'rural', pincode: 673456, cifId: 223454588 },
    { name: 'Radhika', age: "36-45", gender: 'female', location: 'semi-urban', pincode: 634289, cifId: 223454589 },
    { name: 'Mohana Priya', age: "36-45", gender: 'female', location: 'urban', pincode: 456897, cifId: 223454590 },
    { name: 'Pattabhi', age: "36-45", gender: 'male', location: 'rural', pincode: 6784563, cifId: 223454591 }
  ];

  existingBusinesses = [
    { name: 'Stellar Infra Developers Pvt Ltd', natureOfBusiness: 'Real Estate', yearsOfExperience: 8, location: 'Urban', pincode: 670103, cifId: 333678546 },
    { name: 'Velocity Motors Pvt Ltd', natureOfBusiness: 'Car Dealer', yearsOfExperience: 7, location: 'Rural', pincode: 673456, cifId: 333876456 },
    { name: 'Wanderlux Travels Pvt Ltd', natureOfBusiness: 'Travel Agency', yearsOfExperience: 6, location: 'Semi Urban', pincode: 634289, cifId: 333987123 },
    { name: 'Zenith Institute of Advance Studies (ZIAS)', natureOfBusiness: 'Higher Education and Skill Development', yearsOfExperience: 12, location: 'Urban', pincode: 456897, cifId: 333768345 }
    // Add more existing businesses here
  ];

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.selectedIndividual = userInfo[0].selectedIndividual || '';
        this.selectedBusiness = userInfo[0].selectedBusiness || '';
        this.selectedExistingIndividual = userInfo[0].selectedExistingIndividual ? userInfo[0].selectedExistingIndividual : null;
        this.selectedExistingBusiness = userInfo[0].selectedExistingBusiness ? userInfo[0].selectedExistingBusiness : null;
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
      this.selectedExistingIndividual = this.existingIndividuals[0];
      this.selectedBusiness = ''; // Clear business selection if user selects individual
      this.selectedExistingBusiness = null;
    }
    this.updateDropdownState();
  }

  onBusinessChange() {
    if (this.selectedBusiness) {
      this.selectedExistingBusiness = this.existingBusinesses[0];
      this.selectedIndividual = ''; // Clear individual selection if user selects business
      this.selectedExistingIndividual = null;
    }
    this.updateDropdownState();
  }

  onIndividualSelectedChange(selectedUser: any) {
    this.selectedExistingIndividual = selectedUser;
  }

  onBusinessSelectedChange(selectedBusiness: any) {
    this.selectedExistingBusiness = selectedBusiness;
  }

  async navigateToNext() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        userInfo[0].selectedIndividual = this.selectedIndividual;
        userInfo[0].selectedBusiness = this.selectedBusiness;
        userInfo[0].selectedExistingIndividual = this.selectedExistingIndividual ? this.selectedExistingIndividual : null;
        userInfo[0].selectedExistingBusiness = this.selectedExistingBusiness ? this.selectedExistingBusiness : null;
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