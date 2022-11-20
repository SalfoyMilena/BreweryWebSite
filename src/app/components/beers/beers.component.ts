import { BeersServiceService } from './../../services/beers-service.service';
import { Beer } from './../../models/beer';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {

  beers: Beer[];
  title: string;
  foodMatchSubscribe: Subscription;
  openValidationPopUp: boolean = false;
  currentRoute: string;
  p: number = 1;
  message: string = "Are You Sure wer'e not your favorite beers anymore?"

  constructor(private BeersService: BeersServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url
    this.subscribeByRoute();
  }

  subscribeByRoute() {
    this.BeersService.getBeersFromApi().subscribe(res => {
      this.beers = res // unitiates the beer to the api respone
      let responseFromSessionStorage = this.BeersService.getBeers();
      if (responseFromSessionStorage) { // if there is items is session storage, updates the beer to the value that saved
        this.beers = responseFromSessionStorage
      }
      if (this.currentRoute == '/favorites') { // initiates the beer after filtering the favorites 
        this.beers = this.BeersService.getFavoritesBeers(this.beers)
      }
    })
  }

  ToggleFavorite(id) {
    this.beers.forEach(beer => {
      if (beer.id == id) {
        beer.favorite = !beer.favorite
      }
    });
    if (this.currentRoute == '/favorites') {
      this.beers = this.beers.filter(beer => beer.favorite)
      let arrayIds = this.beers.map(beer => beer.id)
      this.BeersService.setBeers(arrayIds, 'favorites') // sends the favorites id's after changing so the service will remove them from favorite
    } else {
      this.BeersService.setBeers(this.beers) // sends the beers array to the service with the new favorits / unfavorits
    }
  }

  rank(id: string, rank: string) {
    this.beers = this.BeersService.setRank(id, rank);
  }

  onFoodMatchSearch(foodName: string) {
    if (foodName) {
      this.foodMatchSubscribe = this.BeersService.getFoodCall(foodName).subscribe(res => {
        let foodBeers = res;
        this.beers = this.BeersService.compareWithFavorits(foodBeers)
      })
    }
    else {
      this.beers = this.BeersService.getBeers();
    }
  }

  deleteAll(remove) {
    if (remove) { // if the user choose to remove all beer, removing all and redirect to the home page
      this.beers = this.BeersService.RemoveAllFavorites()
      this.router.navigate(['/'])
    }
    this.openValidationPopUp = false;
  }
}
