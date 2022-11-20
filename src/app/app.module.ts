import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { BeersComponent } from './components/beers/beers.component';
import { BeerItemComponent } from './components/beer-item/beer-item.component';
import { HttpClientModule } from '@angular/common/http';
import { BeerDetailsPopUpComponent } from './components/beer-details-pop-up/beer-details-pop-up.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ValidationPopUpComponent } from './components/validation-pop-up/validation-pop-up.component';


@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    BeersComponent,
    BeerItemComponent,
    BeerDetailsPopUpComponent,
    ValidationPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
