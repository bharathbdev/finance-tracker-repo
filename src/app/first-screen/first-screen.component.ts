import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { openDB } from 'idb';

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.css']
})
export class FirstScreenComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  async navigateToNext() {
    if (this.loginForm.valid) {
      const db = await openDB('FinanceTrackerDB', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('userInfo')) {
            const store = db.createObjectStore('userInfo', { keyPath: 'id', autoIncrement: true });
            store.createIndex('email', 'email', { unique: false });
          }
        },
      });

      const userInfo = await db.getAllFromIndex('userInfo', 'email', this.loginForm.value.email);
      if (userInfo.length > 0) {
        // User already exists, handle accordingly
      } else {
        await db.put('userInfo', { email: this.loginForm.value.email, mobile: this.loginForm.value.mobile });
      }
      localStorage.setItem('email', this.loginForm.value.email);

      this.router.navigate(['/second-screen']);
    }
  }
}