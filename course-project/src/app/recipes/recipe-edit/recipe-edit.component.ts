import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  id: number | null = null;
  recipe: Recipe;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.editMode = paramMap.has('id');
      this.id = this.editMode ? +paramMap.get('id') : null;
    });

    this.route.data.subscribe(data => this.recipe = data['recipe']);
  }

}
