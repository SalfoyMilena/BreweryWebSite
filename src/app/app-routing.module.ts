
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeersComponent } from './components/beers/beers.component';

const routes: Routes = [
  {path:'',component: BeersComponent},
  {path:'favorites',component: BeersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
