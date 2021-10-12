import {FormControl, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs";


export class CustomValidators {

  static invalidProjectName(control: FormControl): { [s: string]: boolean } | null {
    return (control.value === 'Test') ?
      {'name-not-test': true} :
      null;
  }

  static asyncInvalidProjectName(control: FormControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    return new Promise<ValidationErrors>((resolve => {
      setTimeout(() => {
        const isNameInvalid: boolean = control.value.trim().toLowerCase().startsWith('test');
        resolve(
          (isNameInvalid) ? {'name-not-test': true} : null
        );
      }, 2200);
    }));
  }
}
