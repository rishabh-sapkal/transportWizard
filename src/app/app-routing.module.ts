import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { BookarideComponent } from './bookaride/bookaride.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'book-a-ride', component: BookarideComponent},
  { path: '',   redirectTo: 'home', pathMatch: 'full' }, // redirect to `home-componenet`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
