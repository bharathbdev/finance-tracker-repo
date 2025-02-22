import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-third-screen-a',
  templateUrl: './third-screen-a.component.html',
  styleUrls: ['./third-screen-a.component.css']
})
export class ThirdScreenAComponent {
  profile: any = {
    name: '',
    age: '',
    gender: '',
    location: '',
    pincode: '',
    languages: {
      hindi: false,
      english: false,
      marathi: false,
      tamil: false,
      telugu: false,
      kannada: false,
      malayalam: false,
      gujarati: false,
      bengali: false,
      punjabi: false,
      odia: false,
      assamese: false,
      urdu: false
    },
    occupation: '',
    income: '',
    maritalStatus: '',
    dependents: '',
    savings: '',
    financialGoals: {
      home: false,
      vehicle: false,
      education: false,
      marriage: false,
      travel: false,
      business: false
    },
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
        if (userInfo[0].selectedIndividual === "Existing User") {
          this.profile.age = userInfo[0].selectedExistingIndividual.age;
          this.profile.name = userInfo[0].selectedExistingIndividual.name;
          this.profile.gender = userInfo[0].selectedExistingIndividual.gender;
          this.profile.location = userInfo[0].selectedExistingIndividual.location;
          this.profile.pincode = userInfo[0].selectedExistingIndividual.pincode;
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

  validateAndNavigate(form: any) {
    if (form.valid) {
      this.navigateToNext();
    } else {
      form.control.markAllAsTouched();
    }
  }
}