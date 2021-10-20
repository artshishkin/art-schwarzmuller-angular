import {Ingredient} from "../shared/ingredient.model";

const initialState = {
  ingredients: [
    new Ingredient('Meat', 4),
    new Ingredient('Potato', 2),
    new Ingredient('Tomato', 5)
  ]
};

export function shoppingListReducer(state = initialState, action) {

}
