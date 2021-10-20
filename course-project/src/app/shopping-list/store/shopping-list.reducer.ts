import {Ingredient} from "../../shared/ingredient.model";
import {Action} from "@ngrx/store";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Meat', 4),
    new Ingredient('Potato', 2),
    new Ingredient('Tomato', 5)
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, (action as ShoppingListActions.AddIngredient).payload]
      };
  }
}
