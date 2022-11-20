import { catchError, retry, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Beer } from '../models/beer';
import { BehaviorSubject, Observable, Subject, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeersServiceService {

  beersObservable: Observable<Beer[]>;
  favorits: Beer[];
  beers: Beer[];
  beers$: BehaviorSubject<Beer[]> = new BehaviorSubject<Beer[]>(null);
  beersWithFoodObservable: Observable<Beer[]>;

  private foodUrl: string = 'https://api.punkapi.com/v2/beers?food=';
  private mainUrl: string = ' https://api.punkapi.com/v2/beers?per_page=80';

  constructor(private http: HttpClient) { }

  getBeersFromApi() {
    return this.http.get<Beer[]>(this.mainUrl).pipe(
      map((res: Beer[]) => res.map((beer: Beer) => new Beer(beer.name, beer.id, beer.image_url, beer.abv, beer.ph, beer.description, beer.tagline, false, ''))),
      catchError(this.handleError)
    )
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getBeers() { // checks if there is data in session storage, if true sets the beers to the session storage data, else returns the value that beer$ has
    let beersFromSessionStorage = JSON.parse(sessionStorage.getItem('beers'))
    if (beersFromSessionStorage) {
      this.beers$.next(beersFromSessionStorage)
    }
    return this.beers$.value
  }

  setBeers(beers, route?: string) {
    let beersToLocal = beers; //this is the value that will be saved to session storage
    if (route == 'favorites') { // if favorits, will take id's array and will cross them with the current beers array and update favorits beers.
      let beersFromSessionStorage = JSON.parse(sessionStorage.getItem('beers'))
      beersToLocal = this.mapFavorites(beersFromSessionStorage, beers)
    }
    sessionStorage.setItem('beers', JSON.stringify(beersToLocal));
    this.beers$.next(beersToLocal)
  }

  mapFavorites(beers: Beer[], idsArray) { // maps the favorits and ranking by id's array
    beers.forEach((beer: Beer) => {
      if (idsArray.includes(beer.id)) {
        beer.favorite = true;
      } else {
        beer.favorite = false
        beer.rank = '';
      }
    });
    return beers;
  }
  setRank(id, rank: string) { //sets the rank of the beer and saves to the storage
    let beersFromSessionStorage = JSON.parse(sessionStorage.getItem('beers'))
    beersFromSessionStorage.find((beer: Beer) => {
      if (beer.id == id) {
        beer.rank = rank;
      }
    })
    sessionStorage.setItem('beers', JSON.stringify(beersFromSessionStorage));
    return this.getFavoritesBeers(beersFromSessionStorage);
  }

  getFavoritesBeers(beers: Beer[]) {
    return beers.filter(beer => {
      return beer.favorite
    });
  }

  
  RemoveAllFavorites() {// Remove all favorite beers
    let beers = this.getBeers();
    beers.forEach((beer: Beer) => {
      beer.favorite = false;
      beer.rank = '';
    })
    sessionStorage.setItem('beers', JSON.stringify(beers));
    this.beers$.next(beers)
    return this.beers$.value
  }

  //------Food calls------------

  compareWithFavorits(beers: Beer[]) {
    let beersFromSessionStorage = JSON.parse(sessionStorage.getItem('beers'))

    //extract all the favorits that the user already liked to compare with the food search
    beersFromSessionStorage = beersFromSessionStorage.filter((beer: Beer) => beer.favorite)
    beersFromSessionStorage = beersFromSessionStorage.map((beer: Beer) => beer.id)

    let updatedBeers = this.mapFavorites(beers, beersFromSessionStorage); //return the updated beers with favorites and rank
    this.beers$.next(updatedBeers);
    return this.beers$.value
  }

  getFoodCall(foodName: string) {
    return this.beersWithFoodObservable = this.http.get<Beer[]>(this.foodUrl + foodName).pipe(
      catchError(this.handleError)
    )
  }

}
