import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
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
        ingredients: state.ingredients.filter((ingr, index) => index !== state.editedIngredientIndex)
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    default:
      return state;
  }
}

function updateIngredient(state: State, action: ShoppingListActions.UpdateIngredient) {
  const ingredient = state.ingredients[state.editedIngredientIndex];
  const updatedIngredient = {
    ...ingredient,
    ...action.payload
  };
  const updatedIngredients = [...state.ingredients];
  updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
  return {
    ...state,
    ingredients: updatedIngredients
  };
}





