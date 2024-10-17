import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'budget-blanner', loadChildren:()=>import('./budget-blanner/budget-blanner.module').then(m=> m.BudgetBlannerModule)}
];
