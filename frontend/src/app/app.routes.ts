import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard';
import { StudentListComponent } from './components/student-list/student-list';
import { StudentFormComponent } from './components/student-form/student-form';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'students',
    component: StudentListComponent
  },

  {
    path: 'students/add',
    component: StudentFormComponent
  },

  {
    path: 'students/edit/:id',
    component: StudentFormComponent
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];