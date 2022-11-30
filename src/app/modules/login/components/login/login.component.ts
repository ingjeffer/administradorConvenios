import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PASSWORD_MAX_LENGTH } from '@const/index';
import { LoginService } from '@modules/login/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  formFields: string[] = ['Email', 'Password'];

  formGroup: FormGroup;

  constructor(private _router: Router, private _loginService: LoginService) { 
    this._createForm();
  }

  ngOnInit(): void {
  }

  goToContinue(): void {
    const values = this.formGroup.value;
    console.log(values);
    this._loginService.session(values).subscribe((data) => {
      this._router.navigate(['']);
    });
  }

  private _createForm() {
    this.formGroup = new FormGroup({
      [this.formFields[0]]: new FormControl('', [Validators.required, Validators.email]),
      [this.formFields[1]]: new FormControl('', [Validators.required, Validators.maxLength(PASSWORD_MAX_LENGTH), Validators.minLength(PASSWORD_MAX_LENGTH)]),
    });
  }
}
