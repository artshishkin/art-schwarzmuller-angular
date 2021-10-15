import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";

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
}
