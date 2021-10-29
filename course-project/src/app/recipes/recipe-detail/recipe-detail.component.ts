import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import * as RecipeActions from "../store/recipe.actions";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {

  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private router: Router) {
  }

  ngOnInit(): void {

    this.route.data.subscribe(data => this.recipe = data['recipe']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete() {
    if (confirm('Are you sure to delete Recipe?')) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.store.dispatch(new RecipeActions.DeleteRecipe(id));
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }
}
