import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RecipeService} from "./recipes/recipe.service";
import {AuthInterceptor} from "./auth/auth.interceptor";

@NgModule({
  providers: [
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    // LoggingService
  ]
})
export class CoreModule {
}
