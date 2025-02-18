import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { openDB } from 'idb';

export type RiskTolerance = 'Low Risk' | 'Medium Risk' | 'High Risk';

export interface InvestmentAllocation {
  equityFunds: number;
  debtFunds: number;
  fdsRds: number;
  goldFunds: number;
}

export interface InvestmentData {
  [ageGroup: string]: {
    [risk in RiskTolerance]: InvestmentAllocation;
  };
}
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
      equityFunds: 0,
      debtFunds: 0,
      fdsRds: 0,
      goldFunds: 0
    }
  ];

  predictionChartData = [
    { name: 'Equity Funds', value: 0 },
    { name: 'Debt Funds', value: 0 },
    { name: 'FDs/RDs', value: 0 },
    { name: 'Gold Funds', value: 0 }
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


        let riskByApp = this.getRiskLevel(userInfo[0].customerProfile.age, userInfo[0].customerProfile.dependents, userInfo[0].customerProfile.maritalStatus, userInfo[0].customerProfile.insurance) as RiskTolerance;
        this.dataSource[0].riskTolerance = riskByApp;
        let graph = this.getInvestmentAllocation(userInfo[0].customerProfile.age, riskByApp);

        this.predictionDataSource = [
          {
            riskTolerance: riskByApp,
            equityFunds: 'equityFunds' in graph ? graph.equityFunds : 0,
            debtFunds: 'debtFunds' in graph ? graph.debtFunds : 0,
            fdsRds: 'fdsRds' in graph ? graph.fdsRds : 0,
            goldFunds: 'goldFunds' in graph ? graph.goldFunds : 0
          }
        ];

        this.predictionChartData = [
          { name: 'Equity Funds', value: 'equityFunds' in graph ? graph.equityFunds : 0 },
          { name: 'Debt Funds', value: 'debtFunds' in graph ? graph.debtFunds : 0 },
          { name: 'FDs/RDs', value: 'fdsRds' in graph ? graph.fdsRds : 0 },
          { name: 'FDs/RDs', value: 'goldFunds' in graph ? graph.goldFunds : 0 },
          { name: 'Gold Funds', value: 'goldFunds' in graph ? graph.goldFunds : 0 }
        ];

      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
  }


  getInvestmentAllocation(ageGroup: string, riskTolerance: RiskTolerance): InvestmentAllocation | { error: string } {
    const investmentData: InvestmentData = {
      "18-23": {
        "Low Risk": { equityFunds: 35, debtFunds: 25, fdsRds: 30, goldFunds: 10 },
        "Medium Risk": { equityFunds: 55, debtFunds: 15, fdsRds: 20, goldFunds: 10 },
        "High Risk": { equityFunds: 75, debtFunds: 5, fdsRds: 10, goldFunds: 10 }
      },
      "24-29": {
        "Low Risk": { equityFunds: 30, debtFunds: 30, fdsRds: 30, goldFunds: 10 },
        "Medium Risk": { equityFunds: 50, debtFunds: 20, fdsRds: 20, goldFunds: 10 },
        "High Risk": { equityFunds: 70, debtFunds: 10, fdsRds: 10, goldFunds: 10 }
      },
      "30-35": {
        "Low Risk": { equityFunds: 25, debtFunds: 35, fdsRds: 30, goldFunds: 10 },
        "Medium Risk": { equityFunds: 45, debtFunds: 25, fdsRds: 20, goldFunds: 10 },
        "High Risk": { equityFunds: 65, debtFunds: 15, fdsRds: 10, goldFunds: 10 }
      },
      "36-45": {
        "Low Risk": { equityFunds: 20, debtFunds: 40, fdsRds: 30, goldFunds: 10 },
        "Medium Risk": { equityFunds: 40, debtFunds: 30, fdsRds: 20, goldFunds: 10 },
        "High Risk": { equityFunds: 60, debtFunds: 20, fdsRds: 10, goldFunds: 10 }
      },
      "46-53": {
        "Low Risk": { equityFunds: 15, debtFunds: 45, fdsRds: 30, goldFunds: 10 },
        "Medium Risk": { equityFunds: 35, debtFunds: 35, fdsRds: 20, goldFunds: 10 },
        "High Risk": { equityFunds: 55, debtFunds: 25, fdsRds: 10, goldFunds: 10 }
      },
      "54-60": {
        "Low Risk": { equityFunds: 10, debtFunds: 50, fdsRds: 30, goldFunds: 10 },
        "Medium Risk": { equityFunds: 30, debtFunds: 40, fdsRds: 20, goldFunds: 10 },
        "High Risk": { equityFunds: 50, debtFunds: 30, fdsRds: 10, goldFunds: 10 }
      },
      "60+": {
        "Low Risk": { equityFunds: 5, debtFunds: 55, fdsRds: 30, goldFunds: 10 },
        "Medium Risk": { equityFunds: 25, debtFunds: 45, fdsRds: 20, goldFunds: 10 },
        "High Risk": { equityFunds: 45, debtFunds: 35, fdsRds: 10, goldFunds: 10 }
      }
    };

    if (investmentData[ageGroup] && investmentData[ageGroup][riskTolerance]) {
      return investmentData[ageGroup][riskTolerance];
    } else {
      return { error: "Data not available for the given age group and risk tolerance" };
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

  getRiskLevel(
    ageGroup: string,
    dependents: string,
    maritalStatus: string,
    insurance: string
  ): string {
    // Age slab mapping
    const ageScores: Record<string, number> = {
      "18-29": 3,
      "30-45": 2.5,
      "46-60": 2,
      "60+": 1
    };

    // Dependent slab mapping
    const dependentScores: Record<string, number> = {
      "0": 3,
      "1-2": 2,
      "3-4": 1,
      "4+": 0
    };

    // Marital status score
    const maritalScore: number = maritalStatus === "married" ? 1 : 0;

    // Insurance score mapping
    const insuranceScores: Record<string, number> = {
      "life": 1,
      "health": 1,
      "both": 2,
      "none": 0
    };

    // Adjust input age group to match ageScores keys
    let mappedAgeGroup: string | undefined;
    const inputAge = parseInt(ageGroup.split('-')[0], 10);
    if (inputAge >= 18 && inputAge <= 29) mappedAgeGroup = "18-29";
    else if (inputAge >= 30 && inputAge <= 45) mappedAgeGroup = "30-45";
    else if (inputAge >= 46 && inputAge <= 60) mappedAgeGroup = "46-60";
    else if (inputAge >= 60) mappedAgeGroup = "60+";

    if (!mappedAgeGroup || !(mappedAgeGroup in ageScores)) return "Invalid age group";
    if (!(dependents in dependentScores)) return "Invalid dependent count";
    if (!(insurance in insuranceScores)) return "Invalid insurance type";

    // Fetch scores
    const ageScore: number = ageScores[mappedAgeGroup];
    const dependentScore: number = dependentScores[dependents];
    const insuranceScore: number = insuranceScores[insurance];

    // Extract age baseline
    const ageBaseline: number = parseInt(mappedAgeGroup.split('-')[0], 10);

    // Calculate risk score
    const riskScore: number = (ageBaseline * ageScore) + (dependentScore * 15) + (maritalScore * 10) + (insuranceScore * 40);

    // Determine risk level based on risk score
    if (riskScore <= 80) {
      return "Low Risk";
    } else if (riskScore <= 170) {
      return "Medium Risk";
    } else {
      return "High Risk";
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