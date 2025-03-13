import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agreement-screen',
  templateUrl: './aggrement-screen.component.html',
  styleUrls: ['./aggrement-screen.component.css']
})
export class AgreementScreenComponent {
  isAcknowledged: boolean = false;

  constructor(private router: Router) { }

  navigateToNext() {
    if (this.isAcknowledged) {
      this.router.navigate(['/first-screen']);
    }
  }

  navigateToBack() {
    this.router.navigate(['/']);
  }
}