import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastComponent } from './past/past.component';
import { PresentComponent } from './present/present.component';
import { FutureComponent } from './future/future.component';

const appRoutes: Routes = [
  { path: 'past', component: PastComponent },
  { path: 'present', component: PresentComponent},
  { path: 'future', component: FutureComponent },
  { path: '', component: PresentComponent, pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);