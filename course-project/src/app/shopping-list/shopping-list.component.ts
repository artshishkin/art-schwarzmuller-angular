import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Observable} from "rxjs";
import {LoggingService} from "../logging.service";
import {Store} from "@ngrx/store";
import * as fromShoppingList from "./store/shopping-list.reducer";
import * as ShoppingListActions from "./store/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private loggingService: LoggingService,
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(i: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(i));
  }
}
