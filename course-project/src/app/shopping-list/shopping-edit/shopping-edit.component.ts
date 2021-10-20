import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromShoppingList from "../store/shopping-list.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') ingredientForm: NgForm;
  private subs: Subscription[] = [];
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit(): void {

    const subscription = this.store.select('shoppingList')
      .subscribe(stateData => {
        this.editMode = stateData.editedIngredientIndex >= 0;
        this.editedItemIndex = stateData.editedIngredientIndex;
        this.editedItem = stateData.editedIngredient;
        if (this.editMode) {
          this.ingredientForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      });
    this.subs.push(subscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit() {

    const newName: string = this.ingredientForm.value['name'];
    const newAmount: number = this.ingredientForm.value.amount;
    const ingredient = new Ingredient(newName, newAmount);

    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({
        index: this.editedItemIndex,
        ingredient: ingredient
      }));
    } else {
      const addIngredient = new ShoppingListActions.AddIngredient(ingredient);
      this.store.dispatch(addIngredient);
    }
    this.clearForm();
  }

  onClear() {
    this.clearForm();
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.clearForm();
  }

  private clearForm() {
    this.editMode = false;
    this.ingredientForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
