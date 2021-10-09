import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeNotSelectedComponent} from "./recipes/recipe-not-selected/recipe-not-selected.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeResolver} from "./recipes/recipe-resolver.service";

const routes: Routes = [
  {path: 'shopping-list', component: ShoppingListComponent},
  {
    path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipeNotSelectedComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}},
      {path: ':id/edit', component: RecipeEditComponent, resolve: {recipe: RecipeResolver}},
    ]
  },
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: '**', redirectTo: '/recipes'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    // RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
