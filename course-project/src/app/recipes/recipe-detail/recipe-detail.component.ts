import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {

  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      const recipeId:number = +params['id'];
      this.recipe = this.recipeService.getRecipes()[recipeId];
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
