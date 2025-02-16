import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { openDB } from 'idb';

@Component({
  selector: 'app-sixth-screen',
  templateUrl: './sixth-screen.component.html',
  styleUrls: ['./sixth-screen.component.css']
})
export class SixthScreenComponent implements OnInit {
  ageGroups = ['18-23', '24-29', '30-35', '36-45', '46-53', '54-60', '60+'];
  selectedAgeGroup = '18-23';
  customerName = 'Customer';
  riskLevel = 'Medium';
  suggestedOption = 'Balanced';
  suggestionText = '';

  displayedColumns: string[] = ['riskTolerance', 'equityFunds', 'debtFunds', 'fdsRds', 'goldFunds'];
  dataSource = [
    {
      riskTolerance: 'Low Risk',
      equityFunds: 35,
      debtFunds: 25,
      fdsRds: 30,
      goldFunds: 10
    }
  ];

  chartData = [
    { name: 'Equity Funds', value: 0 },
    { name: 'Debt Funds', value: 0 },
    { name: 'FDs/RDs', value: 0 },
    { name: 'Gold Funds', value: 0 }
  ];

  predictionDataSource = [
    {
      riskTolerance: 'Low Risk',
      equityFunds: 35,
      debtFunds: 25,
      fdsRds: 30,
      goldFunds: 10
    }
  ];

  predictionChartData = [
    { name: 'Equity Funds', value: 35 },
    { name: 'Debt Funds', value: 25 },
    { name: 'FDs/RDs', value: 30 },
    { name: 'Gold Funds', value: 10 }
  ];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['blue', 'orange', 'gray', 'yellow']
  };

  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        this.customerName = userInfo[0].customerName || userInfo[0].email || this.customerName;

        this.suggestedOption = userInfo[0].suggestedOption || this.suggestedOption;
        this.suggestionText = userInfo[0].suggestionText || this.suggestionText;
        this.chartData = [
          { name: 'Equity Funds', value: userInfo[0].allocation.equityMf },
          { name: 'Debt Funds', value: userInfo[0].allocation.debt },
          { name: 'FDs/RDs', value: userInfo[0].allocation.fdRd },
          { name: 'Gold Funds', value: userInfo[0].allocation.gold }
        ];
        this.chartData = this.chartData || userInfo[0].chartData
        this.selectedAgeGroup = userInfo[0].customerProfile.age || '18-23';
        this.riskLevel = this.calculateRiskLevel(this.chartData, this.selectedAgeGroup) || userInfo[0].riskLevel || this.riskLevel;
        this.dataSource = [
          {
            riskTolerance: this.riskLevel,
            equityFunds: userInfo[0].allocation.equityMf || 0,
            debtFunds: userInfo[0].allocation.debt || 0,
            fdsRds: userInfo[0].allocation.fdRd || 0,
            goldFunds: userInfo[0].allocation.gold || 0
          }
        ];
        this.dataSource = this.dataSource || userInfo[0].dataSource


      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
  }


  onAgeGroupChange(event: any): void {
    console.log('Selected Age Group:', this.selectedAgeGroup);
    this.riskLevel = this.calculateRiskLevel(this.chartData, this.selectedAgeGroup);
    this.dataSource[0].riskTolerance = this.riskLevel;
    // Add your logic here to handle the change in age group
  }

  updateChart() {
    this.chartData = [
      { name: 'Equity Funds', value: this.dataSource[0].equityFunds },
      { name: 'Debt Funds', value: this.dataSource[0].debtFunds },
      { name: 'FDs/RDs', value: this.dataSource[0].fdsRds },
      { name: 'Gold Funds', value: this.dataSource[0].goldFunds }
    ];
    this.riskLevel = this.calculateRiskLevel(this.chartData, this.selectedAgeGroup);
    this.dataSource[0].riskTolerance = this.riskLevel;
  }

  calculateRiskLevel(chartData: any, ageGroup: any) {
    let equityFunds = 0;
    let debtFunds = 0;
    let fdsRds = 0;
    let goldFunds = 0;
    chartData.forEach((data: any) => {
      if (data.name === 'Equity Funds') {
        equityFunds = data.value;
      } else if (data.name === 'Debt Funds') {
        debtFunds = data.value;
      } else if (data.name === 'FDs/RDs') {
        fdsRds = data.value;
      } else if (data.name === 'Gold Funds') {
        goldFunds = data.value;
      }
    });
    if (ageGroup === '18-23') {
      if (equityFunds > 40) {
        return "High"
      } else if (equityFunds > 30) {
        return "Medium"
      } else {
        return "Low"
      }
    } else if (ageGroup === '24-29') {
      if (equityFunds > 45) {
        return "High"
      } else if (equityFunds > 35) {
        return "Medium"
      } else {
        return "Low"
      }
    } else if (ageGroup === '30-35') {
      if (equityFunds > 50) {
        return "High"
      } else if (equityFunds > 40) {
        return "Medium"
      } else {
        return "Low"
      }
    } else if (ageGroup === '36-45') {
      if (equityFunds > 55) {
        return "High"
      } else if (equityFunds > 45) {
        return "Medium"
      } else {
        return "Low"
      }
    } else if (ageGroup === '46-53') {
      if (equityFunds > 60) {
        return "High"
      } else if (equityFunds > 50) {
        return "Medium"
      } else {
        return "Low"
      }
    }
    else if (ageGroup === '54-60') {
      if (equityFunds > 65) {
        return "High"
      } else if (equityFunds > 55) {
        return "Medium"
      } else {
        return "Low"
      }

    }
    else {
      return "High"
    }
  }
  async navigateToNext() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        userInfo[0].customerName = this.customerName;
        userInfo[0].riskLevel = this.riskLevel;
        userInfo[0].suggestedOption = this.suggestedOption;
        userInfo[0].suggestionText = this.suggestionText;
        userInfo[0].dataSource = this.dataSource;
        userInfo[0].chartData = this.chartData;
        await db.put('userInfo', userInfo[0]);
        this.router.navigate(['/seventh-screen']);
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
    this.router.navigate(['/fifth-screen']);
  }
}