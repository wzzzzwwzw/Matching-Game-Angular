import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  usernameExists: boolean = false;

  constructor(
    public userService: UserService,
    private _builder: FormBuilder,
    private _snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this._builder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([ Validators.email, Validators.required ])],
      password: ['', Validators.required],
    });
  }

  checkUsername() {
    let username = this.signUpForm.controls['username'].value;
    if (username.length > 0)  {
      this.userService.getByUsername(username).subscribe(
        () => {
          this.signUpForm.controls['username'].setValue('');
          this.usernameExists = true;
        },
        () => {}
      )
    }
  }

  onSubmit(values) {
    console.log(values);
    this.userService.createUser(values).subscribe(
      data => console.log(data),
      error => console.log({ error }),
    )
  }

}
