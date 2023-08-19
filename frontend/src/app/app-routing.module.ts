import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { SignUpComponent} from './components/sign-up/sign-up.component'

const routes: Routes = [
  { path: 'user/home', component: HomeComponent },
  { path: 'user/sign-up', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
