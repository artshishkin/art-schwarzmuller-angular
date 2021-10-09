import {Injectable} from '@angular/core';
import {RecipeService} from "./recipe.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    const id: number = +route.paramMap.get('id');
    return this.recipeService.getRecipe(id);
  }

}
