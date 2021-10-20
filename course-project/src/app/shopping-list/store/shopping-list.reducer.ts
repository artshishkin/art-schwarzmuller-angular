import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Meat', 4),
    new Ingredient('Potato', 2),
    new Ingredient('Tomato', 5)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_MULTIPLE_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      return updateIngredient(state, action);

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingr, index) => index !== action.payload)
      };

    default:
      return state;
  }
}

function updateIngredient(state: { ingredients: Ingredient[] }, action: ShoppingListActions.UpdateIngredient) {
  const ingredient = state.ingredients[action.payload.index];
  const updatedIngredient = {
    ...ingredient,
    ...action.payload.ingredient
  };
  const updatedIngredients = [...state.ingredients];
  updatedIngredients[action.payload.index] = updatedIngredient;
  return {
    ...state,
    ingredients: updatedIngredients
  };
}





