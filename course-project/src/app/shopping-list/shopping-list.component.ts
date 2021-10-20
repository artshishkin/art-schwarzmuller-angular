import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subs: Subscription[] = [];

  constructor(private shoppingListService: ShoppingListService,
              private loggingService: LoggingService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    const subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (list: Ingredient[]) => {
        this.ingredients = list;
      });
    this.subs.push(subscription);
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onEditItem(i: number) {
    this.shoppingListService.startEditingItem(i);
  }
}
