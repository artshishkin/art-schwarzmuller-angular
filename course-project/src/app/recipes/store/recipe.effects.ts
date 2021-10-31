import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {combineLatest, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";

import {environment} from "../../../environments/environment";
import {Recipe} from "../recipe.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    withLatestFrom(this.store.select('auth')),
    map(([never, state]) => state.user.id),
    switchMap((userId) => this.http.get<Recipe[]>(`${environment.firebaseUrl}/${userId}/recipes.json`)),
    map(recipes => recipes ? recipes : []),
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
    combineLatest(
      this.store.select('recipes'),
      this.store.select('auth')
    ),
    tap(states => console.log(states)),
    switchMap(([never, recipeState, authState]) => this.http.put<Recipe[]>(`${environment.firebaseUrl}/${authState.user.id}/recipes.json`, recipeState.recipes)),
    tap(result => console.log(result))
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }

}
