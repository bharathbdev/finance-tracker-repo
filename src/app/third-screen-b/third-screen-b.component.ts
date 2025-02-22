import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-third-screen-b',
  templateUrl: './third-screen-b.component.html',
  styleUrls: ['./third-screen-b.component.css']
})
export class ThirdScreenBComponent implements OnInit {
  businessProfile: any = null;
  continueWithUs: boolean = false;
  businessProfiles = [
    {
      cifId: 333678546,
      businessName: 'Stellar Infra Developers Pvt. Ltd.',
      legalStructure: 'Private Limited Company',
      businessNature: 'Real Estate Development & Construction',
      keyProducts: [
        'Residential Apartments & Villas',
        'Commercial Office Spaces',
        'Retail Complexes & Malls',
        'Luxury Townships',
        'Land Development & Plotting'
      ],
      annualTurnover: '₹250 Crores',
      yearsInOperation: 8,
      location: 'Urban',
      pincode: 670103
    },
    {
      cifId: 333876456,
      businessName: 'Velocity Motors Pvt. Ltd.',
      legalStructure: 'Private Limited Company',
      businessNature: 'Automobile dealership, specializing in the sale of new and used cars',
      keyProducts: [
        'New and pre-owned car sales',
        'Vehicle financing assistance',
        'Car insurance facilitation',
        'Trade-in and exchange programs',
        'After-sales services (maintenance & servicing)'
      ],
      annualTurnover: '₹25-30 crore',
      yearsInOperation: 7,
      location: 'Rural',
      pincode: 673456
    },
    {
      cifId: 333987123,
      businessName: 'WanderLux Travels Pvt. Ltd.',
      legalStructure: 'Private Limited Company',
      businessNature: 'Travel and Tourism Services',
      keyProducts: [
        'Domestic & International Tour Packages',
        'Flight, Hotel & Cruise Bookings',
        'Corporate Travel Management',
        'Luxury and Customized Travel Experiences',
        'Visa and Travel Insurance Services',
        'Adventure & Pilgrimage Tours'
      ],
      annualTurnover: '₹10-12 crore',
      yearsInOperation: 6,
      location: 'Semi Urban',
      pincode: 634289
    },
    {
      cifId: 333768345,
      businessName: 'Zenith Institute of Advanced Studies (ZIAS)',
      legalStructure: 'Private Limited Company (Zenith Educational Pvt. Ltd.)',
      businessNature: 'Higher Education and Skill Development',
      keyProducts: [
        'Undergraduate and Postgraduate Degree Programs',
        'Professional Certification Courses',
        'Corporate Training Programs',
        'Online Learning Modules',
        'Research and Development Initiatives'
      ],
      annualTurnover: '₹50 Crore',
      yearsInOperation: 12,
      location: 'Urban',
      pincode: 456897
    }
  ];

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        const selectedBusiness = userInfo[0].selectedBusiness ? userInfo[0].selectedExistingBusiness : null;
        if (selectedBusiness) {
          this.businessProfile = this.businessProfiles.find(profile => profile.cifId === selectedBusiness.cifId);
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
        userInfo[0].businessProfile = this.businessProfile;
        await db.put('userInfo', userInfo[0]);
        this.router.navigate(['/tenth-screen']);
      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
  }


  async onSubmit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        userInfo[0].businessProfile = this.businessProfile;
        userInfo[0].continueWithUs = this.continueWithUs;
        await db.put('userInfo', userInfo[0]);
        if (this.continueWithUs) {
          alert('Congratulations for choosing us!');
        } else {
          alert('We will connect with you shortly to provide more information, thank you.');
        }
        this.router.navigate(['/']);
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
}