import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable, of} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import {map, mergeMap, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.store.select('recipes')
      .pipe(
        take(1),
        map(state => state.recipes),
        mergeMap(recipes =>
          recipes.length === 0 ?
            this.dataStorageService.fetchRecipesObservable() :
            of(recipes)
        ),
        tap(recipes => console.log(recipes))
      );
  }
}
