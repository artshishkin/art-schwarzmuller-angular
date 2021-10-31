import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, switchMap, tap} from "rxjs/operators";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";

import {environment} from "../../../environments/environment";
import {Recipe} from "../recipe.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class RecipeEffects {

  private recipesUrl = `${environment.firebaseUrl}/recipes.json`;

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => this.http.get<Recipe[]>(this.recipesUrl)),
    map(recipes => recipes
      .map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        }
      )
    ),
    map(recipes => new RecipeActions.SetRecipes(recipes))
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    switchMap(() => this.store.select('recipes')),
    map(state => state.recipes),
    switchMap(recipes => this.http.put<Recipe[]>(this.recipesUrl, recipes)),
    tap(result => console.log(result))
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }

}
