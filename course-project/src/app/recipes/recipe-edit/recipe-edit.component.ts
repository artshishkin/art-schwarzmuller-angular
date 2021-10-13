import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../recipe.model";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";

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
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.editMode = paramMap.has('id');
      this.id = this.editMode ? +paramMap.get('id') : null;
      this.recipe = this.editMode ?
        this.recipeService.getRecipe(this.id) :
        new Recipe('', '', '', []);
      this.initForm();
    });

    this.route.data.subscribe(data => this.recipe = data['recipe']);
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
    console.log(this.recipeForm);
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
}
