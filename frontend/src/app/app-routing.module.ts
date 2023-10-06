import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from './components/user/auth/log-in/log-in.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/log-in',
    pathMatch: 'full',
  },
  {
    path: "user/log-in",
    component: LogInComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user/auth/log-in/log-in.routes').then(routes => routes.authRoutes)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
