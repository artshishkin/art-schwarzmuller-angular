import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private recipesUrl = `${environment.firebaseUrl}/recipes.json`;

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.recipesUrl, recipes)
      .subscribe(resp => console.log(resp));
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(this.recipesUrl)
      .pipe(
        map(recipes => recipes
          .map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            }
          ))
      )
      .subscribe(recipes => this.recipeService.setRecipes(recipes));
  }
}
