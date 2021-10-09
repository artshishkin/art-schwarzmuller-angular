import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  id: number | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.editMode = paramMap.has('id');
      this.id = this.editMode ? +paramMap.get('id') : null;
      console.log(`Edit mode: ${this.editMode}. ID: ${this.id}`);
    });
    this.editMode = this.route.snapshot.paramMap.has('id');
  }

}
