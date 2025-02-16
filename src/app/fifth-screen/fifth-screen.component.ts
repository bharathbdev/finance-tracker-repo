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

  constructor(private router: Router) { }
  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.allocation = userInfo[0].allocation || this.allocation;
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
}