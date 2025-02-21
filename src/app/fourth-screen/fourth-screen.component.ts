import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-fourth-screen',
  templateUrl: './fourth-screen.component.html',
  styleUrls: ['./fourth-screen.component.scss']
})
export class FourthScreenComponent implements OnInit {
  questions = [
    {
      text: 'What is your age group?',
      name: 'ageGroup',
      options: [
        { text: 'Below 25', value: 'below-25', score: 3 },
        { text: '25-40', value: '25-40', score: 2 },
        { text: '41-60', value: '41-60', score: 1 },
        { text: '60+', value: '60+', score: 1 }
      ],
      selectedOption: null
    },
    {
      text: 'What is your annual income range?',
      name: 'annualIncome',
      options: [
        { text: 'Below ₹5 lakh', value: 'below-5-lakh', score: 1 },
        { text: '₹5-10 lakh', value: '5-10-lakh', score: 2 },
        { text: '₹10-25 lakh', value: '10-25-lakh', score: 3 },
        { text: '₹25 lakh+', value: '25-lakh+', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'What is your monthly savings as a % of income?',
      name: 'monthlySavings',
      options: [
        { text: 'Less than 10%', value: 'less-than-10', score: 1 },
        { text: '10-25%', value: '10-25', score: 2 },
        { text: 'More than 25%', value: 'more-than-25', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'Do you have existing loans or liabilities?',
      name: 'existingLoans',
      options: [
        { text: 'No loans', value: 'no-loans', score: 3 },
        { text: 'Minimal loans', value: 'minimal-loans', score: 2 },
        { text: 'High loan burden', value: 'high-loan-burden', score: 1 }
      ],
      selectedOption: null
    },
    {
      text: 'What is your investment experience?',
      name: 'investmentExperience',
      options: [
        { text: 'Beginner', value: 'beginner', score: 1 },
        { text: 'Moderate', value: 'moderate', score: 2 },
        { text: 'Expert', value: 'expert', score: 3 }
      ],
      selectedOption: null
    },
    // Add other questions similarly
    {
      text: 'What is your preferred investment approach?',
      name: 'investmentApproach',
      options: [
        { text: 'Safe & Stable', value: 'safe-stable', score: 1 },
        { text: 'Balanced', value: 'balanced', score: 2 },
        { text: 'High Growth', value: 'high-growth', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'What is your investment time horizon?',
      name: 'investmentHorizon',
      options: [
        { text: 'Less than 3 years', value: 'less-than-3-years', score: 1 },
        { text: '3-7 years', value: '3-7-years', score: 2 },
        { text: 'More than 7 years', value: 'more-than-7-years', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'How do you react to market downturns?',
      name: 'marketDownturns',
      options: [
        { text: 'Withdraw immediately', value: 'withdraw-immediately', score: 1 },
        { text: 'Hold & Monitor', value: 'hold-monitor', score: 2 },
        { text: 'Invest More', value: 'invest-more', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'What is your preferred asset class?',
      name: 'assetClass',
      options: [
        { text: 'Fixed Income (FD, Bonds)', value: 'fixed-income', score: 1 },
        { text: 'Real Estate, Gold, Debt Funds', value: 'real-estate', score: 2 },
        { text: 'Stocks, Crypto, Mutual Funds', value: 'stocks-crypto', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'What % of income do you want to invest?',
      name: 'incomeInvest',
      options: [
        { text: 'Less than 10%', value: 'less-than-10', score: 1 },
        { text: '10-25%', value: '10-25', score: 2 },
        { text: 'More than 25%', value: 'more-than-25', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'Do you have dependents (spouse, children, parents)?',
      name: 'dependents',
      options: [
        { text: 'No dependents', value: 'no-dependents', score: 1 },
        { text: 'Few dependents', value: 'few-dependents', score: 2 },
        { text: 'Many dependents', value: 'many-dependents', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'What type of insurance do you already have?',
      name: 'insuranceType',
      options: [
        { text: 'No insurance', value: 'no-insurance', score: 1 },
        { text: 'Life/Health Insurance', value: 'life-health-insurance', score: 2 },
        { text: 'Comprehensive Coverage', value: 'comprehensive-coverage', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'How do you prefer to manage health expenses?',
      name: 'healthExpenses',
      options: [
        { text: 'Out-of-pocket', value: 'out-of-pocket', score: 1 },
        { text: 'Basic health cover', value: 'basic-health-cover', score: 2 },
        { text: 'High medical insurance', value: 'high-medical-insurance', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'How much premium can you afford yearly?',
      name: 'premiumAfford',
      options: [
        { text: 'Less than ₹10,000', value: 'less-than-10000', score: 1 },
        { text: '₹10,000-25,000', value: '10000-25000', score: 2 },
        { text: 'More than ₹25,000', value: 'more-than-25000', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'What is your primary financial goal?',
      name: 'financialGoal',
      options: [
        { text: 'Capital Safety', value: 'capital-safety', score: 1 },
        { text: 'Wealth Accumulation', value: 'wealth-accumulation', score: 2 },
        { text: 'High Returns', value: 'high-returns', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'How often do you need liquidity?',
      name: 'liquidityNeed',
      options: [
        { text: 'Frequently', value: 'frequently', score: 1 },
        { text: 'Occasionally', value: 'occasionally', score: 2 },
        { text: 'Rarely', value: 'rarely', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'Do you plan for retirement?',
      name: 'retirementPlan',
      options: [
        { text: 'No plans yet', value: 'no-plans-yet', score: 1 },
        { text: 'Some savings', value: 'some-savings', score: 2 },
        { text: 'Actively planning', value: 'actively-planning', score: 3 }
      ],
      selectedOption: null
    },
    {
      text: 'Are you interested in tax-saving investments?',
      name: 'taxSavingInvestments',
      options: [
        { text: 'Not a priority', value: 'not-a-priority', score: 1 },
        { text: 'Some interest', value: 'some-interest', score: 2 },
        { text: 'Strong interest', value: 'strong-interest', score: 3 }
      ],
      selectedOption: null
    }
  ];
  riskProfileUI: string = '';
  totalScoreUI: number = 0;
  constructor(private router: Router) { }

  async ngOnInit() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        // Load previous answers if available
        const allData = userInfo[0].allData || [];
        this.questions.forEach(question => {
          const savedAnswer = allData.find((answer: { name: string; }) => answer.name === question.name);
          if (savedAnswer) {
            question.selectedOption = savedAnswer.selectedOption;
          }
        });
      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
  }

  async calculateScore() {
    let totalScore = 0;
    const answers = this.questions.map(question => {
      const selectedOption = question.options.find(option => option.value === question.selectedOption);
      if (selectedOption) {
        totalScore += selectedOption.score;
      }
      return { name: question.name, selectedOption: question.selectedOption };
    });

    // Determine risk profile based on total score
    let riskProfile = '';
    if (totalScore >= 18 && totalScore <= 27) {
      riskProfile = 'Low Risk (Conservative)';
    } else if (totalScore >= 28 && totalScore <= 39) {
      riskProfile = 'Moderate Risk (Balanced)';
    } else if (totalScore >= 40 && totalScore <= 54) {
      riskProfile = 'High Risk (Aggressive)';
    }
    this.riskProfileUI = riskProfile;
    this.totalScoreUI = totalScore;
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        userInfo[0].allData = this.questions;
        await db.put('userInfo', userInfo[0]);
      } else {
        alert('User not found.');
        this.router.navigate(['/first-screen']);
      }
    } else {
      alert('User email not found.');
      this.router.navigate(['/first-screen']);
    }
    //alert(`Total Score: ${totalScore}\nRisk Profile: ${riskProfile}`);
  }

  async navigateToNext() {
    this.router.navigate(['/fifth-screen']);
  }

  async navigateToBack() {
    const db = await openDB('FinanceTrackerDB', 1);
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const userInfo = await db.getAllFromIndex('userInfo', 'email', userEmail);
      if (userInfo.length > 0) {
        if (userInfo[0].selectedIndividual) {
          this.router.navigate(['/third-screen-a']);
        } else if (userInfo[0].selectedBusiness) {
          this.router.navigate(['/third-screen-b']);
        } else {
          alert('Please select either an individual or a business.');
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
}