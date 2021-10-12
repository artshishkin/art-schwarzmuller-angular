import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') ingredientForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {

    const newName: string = this.ingredientForm.value['name'];
    const newAmount: number = this.ingredientForm.value.amount;
    const ingredient = new Ingredient(newName, newAmount);

    this.shoppingListService.addIngredient(ingredient);
  }
}
