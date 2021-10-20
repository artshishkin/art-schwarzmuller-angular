import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Meat', 4),
    new Ingredient('Potato', 2),
    new Ingredient('Tomato', 5)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
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

function updateIngredient(state: State, action: ShoppingListActions.UpdateIngredient) {
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





