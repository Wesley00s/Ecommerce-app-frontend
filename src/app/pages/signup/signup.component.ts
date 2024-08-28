import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../../validators/password-match.validator';

interface SignupForm {
  name: FormControl,
  street: FormControl,
  city: FormControl,
  state: FormControl,
  zipCode: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl,
  userType: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      street: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2)]),
      state: new FormControl('', [Validators.required, Validators.minLength(2)]),
      zipCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
      userType: new FormControl('CUSTOMER', [Validators.required])
    }, { validators: passwordMatchValidator() });
  }

  submit(){
    const { userType, name, street, city, state, zipCode, email, password } = this.signupForm.value;

    this.loginService.signup(
      userType, // ADMIN ou CUSTOMER
      name,
      street,
      city,
      state,
      zipCode,
      email,
      password
    ).subscribe({
      next: () => {
        this.toastService.success("Cadastro feito com sucesso!")
        if (userType === 'ADMIN') {
          this.router.navigate(["admin"])
        } else {
          this.router.navigate(["user"])
        }
      },
      error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    })
  }

  navigate(){
    this.router.navigate(["/"])
  }
}
