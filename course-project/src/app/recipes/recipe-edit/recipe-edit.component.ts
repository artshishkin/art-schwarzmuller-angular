import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../recipe.model";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {map, mergeMap, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {of} from "rxjs";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  id: number | null = null;
  recipe: Recipe;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(paramMap => {
          this.editMode = paramMap.has('id');
          return this.editMode ? +paramMap.get('id') : null;
        }),
        tap(id => this.id = id),
        mergeMap(id =>
          id ?
            this.store.select('recipes').pipe(map(state => state.recipes[id])) :
            of(new Recipe('', '', '', []))
        )
      )
      .subscribe(recipe => {
        this.recipe = recipe;
        this.initForm();
      });
  }

  private initForm() {
    this.recipeForm = this.formBuilder.group({
      name: this.formBuilder.control(this.recipe.name, Validators.required),
      imagePath: this.formBuilder.control(this.recipe.imagePath, Validators.required),
      description: this.formBuilder.control(this.recipe.description, Validators.required),
      ingredients: this.initIngredientsArray()
    });
  }

  private initIngredientsArray(): FormArray {
    let ingredientsArray = this.formBuilder.array([]);
    for (const ingredient of this.recipe.ingredients) {
      const ingredientGroup = this.formBuilder.group({
        name: this.formBuilder.control(ingredient.name, Validators.required),
        amount: this.formBuilder.control(ingredient.amount, [
          Validators.required,
          Validators.min(1)
        ])
      });
      ingredientsArray.push(ingredientGroup);
    }
    return ingredientsArray;
  }

  get recipeFormIngredients(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.finishEditing();
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray)
      .push(this.formBuilder.group({
        name: this.formBuilder.control(null, Validators.required),
        amount: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      }));
  }

  onCancel() {
    this.finishEditing();
  }

  private finishEditing() {
    this.router.navigate(["../"], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
