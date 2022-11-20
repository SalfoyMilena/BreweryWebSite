import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  @Output() searchFood = new EventEmitter<string>();
  title: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url == '/') {
      this.title = 'Our Brewery'
    } else if (this.router.url == 'favorites') {
      this.title = 'Favorites'
    }
  }
  SearchFoodsMatchWithBeers(food: string) {
    this.searchFood.emit(food);

  }

}
