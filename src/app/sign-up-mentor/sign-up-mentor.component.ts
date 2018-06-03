import { Component, OnInit } from '@angular/core';
import {LocalStorage, SessionStorage} from "angular-localstorage";
import { LoginService } from 'app/services/login.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { Directive, forwardRef, 
  Attribute,OnChanges, SimpleChanges,Input } from '@angular/core';
import { NG_VALIDATORS,Validator,
  Validators,AbstractControl,ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-up-mentor.component.html',
  styleUrls: ['./sign-up-mentor.component.scss']
})

export class SignUpMentorComponent implements OnInit {

  public Username;
  public Password;
  public Email;
  isFormValid = true;
  icon = "fa fa-user-plus";
  usernameError: Message[] = [];

  ccRegex: RegExp = /^\w.+@\w+\..{2,3}(.{2,3})?$/; 
  
  constructor(private loginService:LoginService, private router: Router) { }

  ngOnInit() {
  }

 
  login(){
    this.usernameError = [];
    this.icon = "fa fa-cog fa-spin";
    if(!this.ccRegex.test(this.Email)){
      this.icon = "fa fa-user-plus";
      this.usernameError.push({severity:'error', summary:'Error Message', detail:"Invalid Email Address"});
      this.isFormValid = false;
    }
    else if(this.Password == "" || this.Password == null){
      console.log("password is empty");
      this.icon = "fa fa-user-plus";
      this.usernameError.push({severity:'error', summary:'Error Message', detail:"Ensure the fields are filled"});
      this.isFormValid = false;
    }
    else{
      let login = {
        "Username":this.Username,
        "Email":this.Email,
        "Password":this.Password,
        "AccountType":"mentor",
  
      }
      this.loginService.validateEmail(login).subscribe(
        (res:any ) => {
          console.log(res._body);
          if(res._body === null){
            this.isFormValid = true;
          }
          else{
            this.usernameError.push({severity:'error', summary:'Error Message', detail:"E-mail already exists"});
            this.isFormValid = false;
          }
        
        }, 
      err=>{
        this.usernameError = [];
        this.usernameError.push({severity:'error', summary:'Error Message', detail:"Ensure the fields are filled"});
      },
      () =>{
        this.loginService.validateUsername(login).subscribe(
          (res:any ) => {
            console.log(res._body);
            if(res._body === null){
              this.isFormValid = true;
            }
            else{
              this.usernameError.push({severity:'error', summary:'Error Message', detail:"Username is already taken"});
              this.isFormValid = false;
            }
          },
          err=>{
            this.usernameError = [];
            this.usernameError.push({severity:'error', summary:'Error Message', detail:"Ensure the fields are filled"});
          },
          ()=>{
            if(this.isFormValid){
              this.loginService.createLogin(login).subscribe(
                (res:any) =>{
        
                },
                (err) =>{
                  this.icon = "fa fa-user-plus";
                },
                ()=>{
                  this.icon = "fa fa-user-plus";
                  this.actuallyLogin();
                  
                }
              )
            }
            else{
              this.icon = "fa fa-user-plus";
            }
          }
        )
      }
      )
    }
  }

    
  actuallyLogin(){
    let loginObject = {
      "Email": this.Email,
      "Password": this.Password
    }
    console.log(loginObject);
    this.loginService.login(loginObject).subscribe(
      (res: any) =>{
        if(res._body !== null){
          localStorage.setItem("currentUserToken",res.token);
          localStorage.setItem("currentUser",res.username);
          localStorage.setItem("type",res.type);
          
        }
        else{

        }
      },
      err => { 
        
        this.usernameError = [];
        this.usernameError.push({severity:'error', summary:'Error Message', detail:"E-mail already exists"});},
        () =>{
          this.router.navigateByUrl('/user-profile');
        }
    )
  }

}
