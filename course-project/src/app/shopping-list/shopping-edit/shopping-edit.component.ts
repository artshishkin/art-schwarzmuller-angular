import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

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

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    const subscription = this.shoppingListService.startEditing.asObservable()
      .subscribe(ingredientIndex => {
        this.editMode = true;
        this.editedItemIndex = ingredientIndex;
        this.editedItem = this.shoppingListService.getIngredient(ingredientIndex);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
        console.log(ingredientIndex);
      });
    this.subs.push(subscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onSubmit() {

    const newName: string = this.ingredientForm.value['name'];
    const newAmount: number = this.ingredientForm.value.amount;
    const ingredient = new Ingredient(newName, newAmount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.ingredientForm.reset();
  }
}
