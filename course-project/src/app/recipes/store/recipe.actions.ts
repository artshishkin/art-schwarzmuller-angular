import {Action} from "@ngrx/store";

import {Recipe} from "../recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const STORE_RECIPES = '[Recipes] Store Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number, newRecipe: Recipe }) {
  }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {
  }
}

export type RecipeActions =

  | SetRecipes
  | FetchRecipes
  | StoreRecipes

  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe

  ;

// private recipes: Recipe[] = [
//   new Recipe("The Test Recipe 1", "This is just a test 1", 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
//     [
//       new Ingredient('Carrot', 12),
//       new Ingredient('Potato', 3),
//       {name: 'Meat', amount: 2},
//     ]),
//   new Recipe("The Test Recipe 2", "This is just a test 2", 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkf0Oj33wT9HsUqExwLAyh59ekSNb4BP272Q&usqp=CAU',
//     [
//       {name: 'Bread', amount: 2},
//       {name: 'Butter', amount: 30},
//       {name: 'Salt', amount: 123},
//     ]
//   ),
//   new Recipe("The Test Recipe 3", "This is just a test 3", 'fake', [])
// ];
