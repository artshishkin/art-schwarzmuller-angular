import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipesComponent} from "./recipes.component";
import {RecipeNotSelectedComponent} from "./recipe-not-selected/recipe-not-selected.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    RecipeNotSelectedComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    RecipeNotSelectedComponent,
    RecipeEditComponent,
  ]
})
export class RecipesModule { }
