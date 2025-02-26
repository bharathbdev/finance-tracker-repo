import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-fifth-screen',
  templateUrl: './fifth-screen.component.html',
  styleUrls: ['./fifth-screen.component.css']
})
export class FifthScreenComponent {
  allocation: any = {
    equityMf: '',
    debt: '',
    fdRd: '',
    gold: ''
  };
  savings: any = 0;

  languages: string[] = ['English', 'Marathi', 'Odia', 'Telugu', 'Bengali', 'Malayalam', 'Hindi', 'Tamil', 'Kannada'];
  selectedLanguage: string = 'English';

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.allocation = userInfo[0].allocation || this.allocation;
        this.savings = userInfo[0].customerProfile.savings || this.savings;
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
        userInfo[0].allocation = this.allocation;
        await db.put('userInfo', userInfo[0]);
        this.router.navigate(['/sixth-screen']);
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
    this.router.navigate(['/fourth-screen']);
  }

  onLanguageChange(event: any): void {
    this.selectedLanguage = event.value;
  }

  updateAllocation(changedField: string) {
    const { equityMf, debt, fdRd, gold } = this.allocation;
    const fields = ['equityMf', 'debt', 'fdRd', 'gold'];
    const total = fields.reduce((sum, field) => sum + (parseFloat(this.allocation[field]) || 0), 0);
    const remaining = 100 - total;

    if (remaining >= 0) {
      this.allocation[changedField] = parseFloat(this.allocation[changedField]) || 0;
      const otherFields = fields.filter(field => field !== changedField);
      const emptyFields = otherFields.filter(field => this.allocation[field] === '');

      if (emptyFields.length === 1 && remaining >= 0 && this.allocation[changedField].toString().length >= 2) {
        this.allocation[emptyFields[0]] = remaining.toFixed(2);
      }
    } else {
      alert('The total allocation must not exceed 100%. Please adjust your inputs.');
      this.allocation[changedField] = '';
    }
  }

  validateAndNavigate() {
    const { equityMf, debt, fdRd, gold } = this.allocation;
    if (equityMf !== '' && debt !== '' && fdRd !== '' && gold !== '') {
      const total = parseFloat(equityMf) + parseFloat(debt) + parseFloat(fdRd) + parseFloat(gold);
      if (total === 100) {
        this.navigateToNext();
      } else {
        alert('The total allocation must be 100%. Please adjust your inputs.');
      }
    } else {
      alert('Please fill in all the fields.');
    }
  }
}