import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;

  projectStatuses: string[] = ['Stable', 'Critical', 'Finished'];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {

    this.projectForm = this.formBuilder.group({
      projectName: this.formBuilder.control(null, Validators.required),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      projectStatus: this.formBuilder.control(this.projectStatuses[0])
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }
}
