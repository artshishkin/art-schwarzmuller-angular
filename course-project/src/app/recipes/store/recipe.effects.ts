import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {Recipe} from "../recipe.model";
import * as RecipeActions from './recipe.actions';

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

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }

}
