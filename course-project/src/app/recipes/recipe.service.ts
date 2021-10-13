import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = [
    new Recipe("The Test Recipe 1", "This is just a test 1", 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
      [
        new Ingredient('Carrot', 12),
        new Ingredient('Potato', 3),
        {name: 'Meat', amount: 2},
      ]),
    new Recipe("The Test Recipe 2", "This is just a test 2", 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkf0Oj33wT9HsUqExwLAyh59ekSNb4BP272Q&usqp=CAU',
      [
        {name: 'Bread', amount: 2},
        {name: 'Butter', amount: 30},
        {name: 'Salt', amount: 123},
      ]
    ),
    new Recipe("The Test Recipe 3", "This is just a test 3", 'fake', [])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.getRecipes());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.getRecipes());
  }
}
