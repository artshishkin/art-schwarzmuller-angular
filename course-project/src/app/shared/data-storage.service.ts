import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private recipesUrl = `${environment.firebaseUrl}/recipes.json`;

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.recipesUrl, recipes)
      .subscribe(resp => console.log(resp));
  }

  fetchRecipes() {
    this.fetchRecipesObservable()
      .subscribe();
  }

  fetchRecipesObservable(): Observable<Recipe[]> {

    return this.authService.user.pipe(
      take(1),

      exhaustMap(
        user => {
          const token = user?.token;
          return this.http.get<Recipe[]>(this.recipesUrl, {
            params: {auth: `${token}`}
          });
        }
      ),

      map(recipes => recipes
        .map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          }
        )),

      tap(recipes => this.recipeService.setRecipes(recipes))
    );
  }

}
