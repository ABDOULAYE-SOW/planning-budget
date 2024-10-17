import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  //Revenues
  lastMonthsIncome = ['Janvier: 1000$', 'Février: 1500$', 'Mars: 1200$'];
  currentMonthIcome = '2000$';

  //Les dépenses
  lastMonthsExpense = ['Janvier: 700$', 'Février: 1100$', 'Mars: 1200$'];
  currentMonthExpense = '1500$';

  //Faire la transaction
  todoTransactions = [
    { description: "Payer la facture de l'électricité"},
    { description: "Soumettre le rapport mensuel"},
    { description: "Courses"},
    { description: "Appel d'urgence"}
  ];
  totalCurrentMonthIncome = 2000;
  totalCurrentMonthExpense = 1500;
  constructor(public router:Router){}

  onIncome() {
    this.router.navigate(['/budget-blanner/income'])
  }
  onExpense() {
    this.router.navigate(['/budget-blanner/expense'])
  }
  onTodo() {
    this.router.navigate(['/budget-blanner/todo'])
  }
  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }
}
