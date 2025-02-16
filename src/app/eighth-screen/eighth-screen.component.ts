import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eighth-screen',
  templateUrl: './eighth-screen.component.html',
  styleUrls: ['./eighth-screen.component.css']
})
export class EighthScreenComponent {
  constructor(private router: Router) { }

  navigateToNext() {
    this.router.navigate(['/ninth-screen']);
  }

  navigateToBack() {
    this.router.navigate(['/seventh-screen']);
  }
}