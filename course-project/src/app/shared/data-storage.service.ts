import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, mergeMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

import {environment} from "../../environments/environment";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import * as fromApp from "../store/app.reducer";
import * as RecipeActions from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private recipesUrl = `${environment.firebaseUrl}/recipes.json`;

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {
  }

  storeRecipes() {
    this.store.select('recipes')
      .pipe(
        map(state => state.recipes),
        mergeMap(recipes => this.http.put(this.recipesUrl, recipes))
      )
      .subscribe(resp => console.log(resp));
  }

  fetchRecipes() {
    this.fetchRecipesObservable()
      .subscribe();
  }

  fetchRecipesObservable(): Observable<Recipe[]> {

    console.log("Fetching Recipes from server");

    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      map(recipes => recipes
        .map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          }
        )),

      tap(recipes => this.store.dispatch(new RecipeActions.SetRecipes(recipes)))
    );
  }

}
