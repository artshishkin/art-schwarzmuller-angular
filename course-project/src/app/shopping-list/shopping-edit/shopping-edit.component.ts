import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') ingredientForm: NgForm;
  private subs: Subscription[] = [];
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {

    const subscription = this.store.select('shoppingList')
      .subscribe(stateData => {
        this.editMode = stateData.editedIngredientIndex >= 0;
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
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
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
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.clearForm();
  }

  private clearForm() {
    this.editMode = false;
    this.ingredientForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
