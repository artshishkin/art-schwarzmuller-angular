import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {RecipesResolverService} from "./recipes-resolver.service";
import {AuthGuard} from "../auth/auth.guard";
import {RecipeNotSelectedComponent} from "./recipe-not-selected/recipe-not-selected.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeResolver} from "./recipe-resolver.service";


const routes: Routes = [
  {
    path: '', component: RecipesComponent, resolve: [RecipesResolverService], canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipeNotSelectedComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}},
      {path: ':id/edit', component: RecipeEditComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }
