import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-eighth-screen',
  templateUrl: './eighth-screen.component.html',
  styleUrls: ['./eighth-screen.component.css']
})
export class EighthScreenComponent implements OnInit {
  finalSelection: any[] = [];

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        const selectedGoals = userInfo[0].selectedProducts;
        this.finalSelection = Object.keys(selectedGoals)
          .filter(key => selectedGoals[key])
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
      home: 'Build/Buy a home - Home loan customer connected to builders, furniture shops, hardware etc.',
      vehicle: 'Travel insurance - Travel insurance customer connected to insurance agents, travel agencies etc.',
      education: 'Education loan - Education loan customer connected to educational institutions, scholarship providers etc.',
      marriage: 'Planning to get Married - Marriage planning customer connected to event planners, wedding venues etc.',
      travel: 'Planning to Travel - Travel planning customer connected to travel agencies, airlines etc.',
      business: 'Planning to start a Business (Start-up) - Business startup customer connected to business consultants, financial advisors etc.'
    };
    return labels[key] || key;
  }

  async navigateToNext() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        userInfo[0].finalSelection = this.finalSelection;
        await db.put('userInfo', userInfo[0]);
        this.router.navigate(['/ninth-screen']);
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
    this.router.navigate(['/seventh-screen']);
  }
}