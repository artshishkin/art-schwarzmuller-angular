import {Ingredient} from "../shared/ingredient.model";
import {Action} from "@ngrx/store";

const initialState = {
  ingredients: [
    new Ingredient('Meat', 4),
    new Ingredient('Potato', 2),
    new Ingredient('Tomato', 5)
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  }
}
