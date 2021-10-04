import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("The Test Recipe 1", "This is just a test 1", 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg'),
    new Recipe("The Test Recipe 2", "This is just a test 2", 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkf0Oj33wT9HsUqExwLAyh59ekSNb4BP272Q&usqp=CAU'),
    new Recipe("The Test Recipe 3", "This is just a test 3", 'fake')
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelectRecipe(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
