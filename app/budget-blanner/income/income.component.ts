import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent {
  incomeForm: any;
  selectedMonth: any;
  januaryIncomes: any[] = [
    { source: 'Salarier', amount: 5000, investments: '401(k)' },
    { source: 'Freelancer', amount: 1000, investments: 'Stocks' },
  ];
  februaryIncomes: any[] = [
    { source: 'Salarier', amount: 6000, investments: '401(k)' },
    { source: 'Revenus locatifs', amount: 700, investments: 'Immobilier' },
  ];
  marchIncomes: any[] = [
    { source: 'Salarier', amount: 7000, investments: '401(k)' },
    { source: 'Freelancer', amount: 1200, investments: 'Stocks' },
    { source: 'Revenus locatifs', amount: 500, investments: 'Immobilier' },
  ];
  monthSelected: boolean = false
  constructor(public fb: FormBuilder, public router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }
  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required]
    });
  }
  onChange(event: any) {
    this.selectedMonth = event.target.value
    this.monthSelected = true;
    this.getFilteredIncomes();
  }
  calculateTotalIncome(month: string): number {
    let totalIncomes = 0;
    for (const income of this.getIncomesForMonth(month)) {
      totalIncomes += income.amount;
    }
    return totalIncomes;
  }
  getIncomesForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryIncomes;
      case 'February':
        return this.februaryIncomes;
      case 'March':
        return this.marchIncomes;
      default:
        return [];
    }
  }
  getFilteredIncomes() {
    let filteredIncomes: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredIncomes = [...this.januaryIncomes];
        break;
      case 'February':
        filteredIncomes = [...this.februaryIncomes];
        break;
      case 'March':
        filteredIncomes = [...this.marchIncomes];
        break;
      default:
        break;
    }
    return filteredIncomes;
  }
  onSubmit() {
    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryIncomes.push(newIncome);
          break;
        case 'February':
          this.februaryIncomes.push(newIncome);
          break;
        case 'March':
          this.marchIncomes.push(newIncome);
          break;
        default:
          break;
      }
      this.incomeForm.reset();
      this.incomeForm.patchValue({ month: '', source: '', amoun: '', investments: '' });
    }
  }
  saveForm() {
    console.log('Formulaire enregistré')
  }
  onBack() {
    this.router.navigate(['/budget-blanner/dashboard'])
  }
}
