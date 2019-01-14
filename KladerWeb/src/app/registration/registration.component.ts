import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../interfaces/User';
import { CustomValidators, ConfirmValidParentMatcher, regExps, errorMessages } from '../custom-validation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private formBuilder: FormBuilder) { 
    this.createForm();
  }

  createForm = () => {
    this.registrationForm = this.formBuilder.group({
      userName : ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ]],
      emailGroup : this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        confirmEmail : ['', Validators.required]
      }, {validator : CustomValidators.childrenEqual}),
      passwordGroup : this.formBuilder.group({
        password : ['',[
          Validators.required,
          Validators.pattern(regExps.password)
        ]],
        confirmPassword: ['', Validators.required]
      }, {validators: CustomValidators.childrenEqual})
    })
  }



  ngOnInit() {
    // setInterval(() => {
    //   console.log(this.registrationForm.get('passwordGroup').get('confirmPassword').value)
    // },3000);
  }
  

}
