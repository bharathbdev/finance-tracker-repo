import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-seventh-screen',
  templateUrl: './seventh-screen.component.html',
  styleUrls: ['./seventh-screen.component.css']
})
export class SeventhScreenComponent implements OnInit {
  productOfferings: any[] = [];
  selectedProducts: any = {};

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        const financialGoals = userInfo[0].customerProfile.financialGoals;
        this.productOfferings = Object.keys(financialGoals)
          .filter(key => financialGoals[key])
          .map(key => ({ name: key, label: this.getLabel(key) }));
      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
  }

  getLabel(key: string): string {
    const labels: { [key: string]: string } = {
      home: 'Build/Buy a home',
      vehicle: 'Travel insurance',
      education: 'Education loan',
      marriage: 'Planning to get Married',
      travel: 'Planning to Travel',
      business: 'Planning to start a Business (Start-up)'
    };
    return labels[key] || key;
  }

  async navigateToNext() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        userInfo[0].selectedProducts = this.selectedProducts;
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