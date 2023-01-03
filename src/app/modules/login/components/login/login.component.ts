import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NavigatePath, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@const/index';
import { LoginService } from '@modules/login/services';
import { pathUtils, setToken } from '@helpers/index';
import { ILoginResponse } from '@modules/login/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  formFields: string[] = ['email', 'password'];

  formGroup: FormGroup;

  constructor(private _router: Router, private _loginService: LoginService) { 
    this._createForm();
  }

  ngOnInit(): void {}

  goToContinue(): void {
    const values = this.formGroup.value;
    this._loginService.session(values).subscribe((data: ILoginResponse) => {
      setToken(data.token);
      this._router.navigate([pathUtils(NavigatePath.Dashboard)]);
    });
  }

  private _createForm() {
    this.formGroup = new FormGroup({
      [this.formFields[0]]: new FormControl('', [Validators.required, Validators.email]),
      [this.formFields[1]]: new FormControl('', [Validators.required, Validators.maxLength(PASSWORD_MAX_LENGTH), Validators.minLength(PASSWORD_MIN_LENGTH)]),
    });
  }
}
