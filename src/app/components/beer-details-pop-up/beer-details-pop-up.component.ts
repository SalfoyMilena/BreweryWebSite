import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Beer } from 'src/app/models/beer';

@Component({
  selector: 'app-beer-details-pop-up',
  templateUrl: './beer-details-pop-up.component.html',
  styleUrls: ['./beer-details-pop-up.component.scss']
})
export class BeerDetailsPopUpComponent implements OnInit {
  @Input() beer: Beer
  @Output() closePopUp = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }
  close() {
    this.closePopUp.emit(false);
  }

}
