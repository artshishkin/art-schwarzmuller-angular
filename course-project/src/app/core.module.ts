import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {RecipeService} from "./recipes/recipe.service";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {LoggingService} from "./logging.service";

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    LoggingService
  ]
})
export class CoreModule {
}