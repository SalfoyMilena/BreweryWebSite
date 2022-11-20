import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-validation-pop-up',
  templateUrl: './validation-pop-up.component.html',
  styleUrls: ['./validation-pop-up.component.scss']
})
export class ValidationPopUpComponent implements OnInit {

  @Output() sureToRemove = new EventEmitter<boolean>()
  @Input() ageValidation: boolean = false;
  @Input() message: string;

  favoritesValidationBtns: string[] = ["Yes, I'm sorry", "Your'e still my favorite"]
  ageValidationBtns: string[] = ["I am over 18", "I am under 18"]

  constructor() { }

  ngOnInit(): void {
    if (!this.ageValidation) {

    }
  }
  sendResponse(value: boolean) {
    this.sureToRemove.emit(value);
  }

}
