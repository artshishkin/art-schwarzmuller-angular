import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // {path: '**', redirectTo: '/recipes'},
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
