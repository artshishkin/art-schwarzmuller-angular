import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../recipe.model";
import {FormBuilder, FormGroup} from "@angular/forms";
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
      name: this.formBuilder.control(this.recipe.name),
      imagePath: this.formBuilder.control(this.recipe.imagePath),
      description: this.formBuilder.control(this.recipe.description)
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
