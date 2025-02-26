import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { openDB } from 'idb';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-eighth-screen',
  templateUrl: './eighth-screen.component.html',
  styleUrls: ['./eighth-screen.component.css']
})
export class EighthScreenComponent implements OnInit {
  finalSelection: any[] = [];
  imagePaths: { [key: string]: string } = {
    home: 'assets/images/home.png',
    vehicle: 'assets/images/vehicle.png',
    education: 'assets/images/education.png',
    marriage: 'assets/images/marriage.png',
    travel: 'assets/images/travel.png',
    business: 'assets/images/business.png'
  };

  businessProfiles: { [key: string]: string } = {
    home: `
      <strong>Business Name:</strong> Stellar Infra Developers Pvt. Ltd.<br>
      <strong>Legal Structure:</strong> Private Limited Company<br>
      <strong>Primary Nature of Business:</strong> Real Estate Development & Construction<br>
      <strong>Key Products/Services:</strong><br>
      • Residential Apartments & Villas<br>
      • Commercial Office Spaces<br>
      • Retail Complexes & Malls<br>
      • Luxury Townships<br>
      • Land Development & Plotting<br>
      <strong>Average Annual Turnover:</strong> ₹250 Crores
    `,
    vehicle: `
      <strong>Business Name:</strong> Velocity Motors Pvt. Ltd.<br>
      <strong>Legal Structure:</strong> Private Limited Company<br>
      <strong>Primary Nature of Business:</strong> Automobile dealership, specializing in the sale of new and used cars<br>
      <strong>Key Products & Services:</strong><br>
      • New and pre-owned car sales<br>
      • Vehicle financing assistance<br>
      • Car insurance facilitation<br>
      • Trade-in and exchange programs<br>
      • After-sales services (maintenance & servicing)<br>
      <strong>Average Annual Turnover:</strong> ₹25-30 crore<br>
      <strong>Years in Operation:</strong> 7 years
    `,
    travel: `
      <strong>Business Name:</strong> WanderLux Travels Pvt. Ltd.<br>
      <strong>Legal Structure:</strong> Private Limited Company<br>
      <strong>Primary Nature of Business:</strong> Travel and Tourism Services<br>
      <strong>Key Products/Services:</strong><br>
      • Domestic & International Tour Packages<br>
      • Flight, Hotel & Cruise Bookings<br>
      • Corporate Travel Management<br>
      • Luxury and Customized Travel Experiences<br>
      • Visa and Travel Insurance Services<br>
      • Adventure & Pilgrimage Tours<br>
      <strong>Average Annual Turnover:</strong> ₹10-12 crore<br>
      <strong>Operational Since:</strong> 2017 (7 years)
    `,
    education: `
      <strong>Business Name:</strong> Zenith Institute of Advanced Studies (ZIAS)<br>
      <strong>Legal Structure:</strong> Private Limited Company (Zenith Educational Pvt. Ltd.)<br>
      <strong>Nature of Business:</strong> Higher Education and Skill Development<br>
      <strong>Key Products/Services:</strong><br>
      • Undergraduate and Postgraduate Degree Programs<br>
      • Professional Certification Courses<br>
      • Corporate Training Programs<br>
      • Online Learning Modules<br>
      • Research and Development Initiatives<br>
      <strong>Average Annual Turnover:</strong> ₹50 Crore<br>
      <strong>Operational History:</strong> 12 years (Established in 2012)
    `,
    marriage: `
      <strong>Business Name:</strong> Marriage Planning Services Pvt. Ltd.<br>
      <strong>Legal Structure:</strong> Private Limited Company<br>
      <strong>Primary Nature of Business:</strong> Event Planning and Management<br>
      <strong>Key Products/Services:</strong><br>
      • Wedding Planning<br>
      • Venue Booking<br>
      • Catering Services<br>
      • Decoration Services<br>
      • Photography and Videography<br>
      <strong>Average Annual Turnover:</strong> ₹15 Crore<br>
      <strong>Years in Operation:</strong> 5 years
    `,
    business: `
      <strong>Business Name:</strong> Startup Consultants Pvt. Ltd.<br>
      <strong>Legal Structure:</strong> Private Limited Company<br>
      <strong>Primary Nature of Business:</strong> Business Consulting and Advisory<br>
      <strong>Key Products/Services:</strong><br>
      • Business Plan Development<br>
      • Financial Advisory<br>
      • Market Research<br>
      • Legal and Compliance Services<br>
      • Funding and Investment Assistance<br>
      <strong>Average Annual Turnover:</strong> ₹20 Crore<br>
      <strong>Years in Operation:</strong> 8 years
    `
  };

  constructor(private router: Router, private dialog: MatDialog) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        const selectedGoals = userInfo[0].selectedProducts;
        this.finalSelection = Object.keys(selectedGoals)
          .filter(key => selectedGoals[key])
          .map(key => ({ name: key, label: this.getLabel(key), imagePath: this.imagePaths[key], profile: this.businessProfiles[key] }));
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

  openImageDialog(imagePath: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imagePath },
      panelClass: 'custom-dialog-container'
    });
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