import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { SnackbarService } from "../../services/snackbar.service";
import { CacheService } from "../../services/cache.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public userService: UserService,
    private _builder: FormBuilder,
    private _snack: SnackbarService,
    private _cache: CacheService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this._builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(values) {
    this.userService.loginUser(
      values.username,
      values.password,
    ).subscribe(
      data => {
        this.loginForm.reset();
        this._snack.openSnackBar("Sesión iniciada con éxito", "OK");
        this._cache.setItem("jwt", data).subscribe(
          () =>  {},
          () => {},
        );
        this._cache.setItem("username", values.username).subscribe(
          () =>  {},
          () => {},
        );
        this.router.navigateByUrl('/records');
      },
      () => this._snack.openSnackBar("Error iniciando sesión", "OK"),
    );
  }


}
