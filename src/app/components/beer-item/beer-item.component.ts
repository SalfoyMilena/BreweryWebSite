import { Router } from '@angular/router';
import { Beer } from './../../models/beer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-beer-item',
  templateUrl: './beer-item.component.html',
  styleUrls: ['./beer-item.component.scss']
})
export class BeerItemComponent implements OnInit {

  @Input() beer: Beer;
  @Output() ToggleFavoirteBtn = new EventEmitter<string>();
  @Output() Ranking = new EventEmitter<string>();

  currentRoute: string;
  favorite: boolean;
  openInfoPopUp: boolean = false;
  openValidationPopUp: boolean = false;
  sureToRemove: boolean;
  message: string = "Are You Sure i'm not your favorite beer anymore?"


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.favorite = this.beer.favorite
    this.currentRoute = this.router.url
  }
  ToggleFavoriteChild() {
    if (this.favorite) { // if the user tries to un-favotire a beer a pop up will pop
      this.openValidationPopUp = true;
    } else { 
      this.favorite = !this.favorite;
      this.ToggleFavoirteBtn.emit(this.beer.id);
    }
  }

  removeFromFavorits(response: boolean) {
    this.sureToRemove = response
    //if the user responded with true to remove from favorits, the beer will be removed from favorites, else - nothing happends
    if (this.sureToRemove) {
      this.favorite = !this.favorite;
      this.ToggleFavoirteBtn.emit(this.beer.id);
    }
    this.openValidationPopUp = false;
  }
  openInfo() {
    this.openInfoPopUp = !this.openInfoPopUp
  }
  onRanking(rank: string) {
    this.Ranking.emit(rank)
  }
}
