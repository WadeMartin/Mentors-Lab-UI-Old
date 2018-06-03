import { Component, OnInit, NgZone, SimpleChanges } from '@angular/core';
import {LocalStorage, SessionStorage} from "angular-localstorage";
import { LoginService } from 'app/services/login.service';
import { Router } from '@angular/router';
import { SubscriptionService } from 'app/services/subscription.service';
import { SubscriberService } from 'app/services/subscriber.service';
import { Input } from '@angular/core';
import { fadeInContent } from '@angular/material';
import { Message } from 'primeng/components/common/api';

@Component({
  moduleId: module.id,
  selector: 'app-sign-in',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})

export class SubscribeComponent implements OnInit {

  doneLoading: boolean = false;
  btnFree:boolean = false;
  btnStarter:boolean = false;
  btnSeed:boolean = false;
  subscribe:any = "string";
  toSubscribe:string;
  acceptDialog: boolean = false;
  btnGrow:boolean = false;
  checkBoxMsg: Message[] = [];
  checkMsg: Message[] = [];
  agreementAccepted:boolean = false;
  couponCode: string = null;


  amountToPay: number;

  constructor(private subs: SubscriberService){
  }

  ngOnInit() {
    let user = {
      "username" : localStorage.getItem("currentUser")
    }
    this.subs.getSubscription(user).subscribe(
      (res:any) =>{
        console.log(res);
        if(res === undefined || res === null){
          this.btnFree = true;
          this.subscribe = "Pending"
        }
        else{
          if(res.planName === "firstplan"){
            this.btnStarter = true;
            this.subscribe = "Starter Plan"
          }
          else if(res.planName === "secondplan"){
            this.btnSeed = true;
            this.subscribe = "Seed Plan"
          }
          else if(res.planName === "thirdplan"){
            this.btnGrow = true;
            this.subscribe = "Growing Plan"
          }
          else{
            this.btnFree = true;
            this.subscribe = "Pending"
          }
        }
        
      },
    err=>{
    },
  () =>{
    this.doneLoading = true;
  });
    
  }

  openDialog(event){
    console.log(event);
    this.acceptDialog = true;
    this.toSubscribe = event;
    if(this.toSubscribe === "firstplan"){
      this.amountToPay = 500
    }
    else if(this.toSubscribe === "secondplan"){
      this.amountToPay = 2000
    }
    else if(this.toSubscribe === "thirdplan"){
      this.amountToPay = 5000
    }
  }
  
  openCheckout() {
    if(this.agreementAccepted){
      localStorage.setItem("plan",this.toSubscribe);
      if(this.subscribe === "Pending"){
        var handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_wXA6wdbEojF2hBPaG92mnkOB',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
             localStorage.setItem("token",JSON.stringify(token));
             
              
          },
          closed:() =>{this.makeNewCust()}
          
        });
        handler.open({
          name: "Mentor's Lab",
          description: 'Subscription to '+this.toSubscribe,
          amount: this.amountToPay
        });
      }
      else{
        this.updateCust();
      }
    }
    else{
      this.showCheckboxError()
    }
   
  }

  updateCust(){
    this.doneLoading = false;
    if(this.agreementAccepted === false){
      console.log("no input");
    }
    else{
      let sendingObject ={
        "username": localStorage.getItem("currentUser"),
        "newPlan": localStorage.getItem("plan"),
        "coupon": this.couponCode
      }
      console.log(sendingObject)
      this.subs.updateSubscription(sendingObject).subscribe(
            (res:any) =>{
              this.acceptDialog = false;
            },
          err=>{
            localStorage.removeItem("token");
            localStorage.removeItem("plan");
            this.showError();
            this.doneLoading = true;
          },
        () =>{
          localStorage.removeItem("token");
          localStorage.removeItem("plan");
          this.toSubscribe = null;
          this.subscribe = sendingObject.newPlan,
          this.showSuccess();
          this.acceptDialog = false;
          this.doneLoading = true;

          if(this.subscribe === "firstplan"){
            this.btnStarter = true;
            this.btnFree = false;
            this.btnSeed = false;
            this.btnGrow = false;
            this.subscribe = "Starter Plan"
          }
          else if(this.subscribe === "secondplan"){
            this.btnSeed = true;
            this.btnFree = false;
            this.btnStarter = false;
            this.btnGrow = false;
            this.subscribe = "Seed Plan"
          }
          else if(this.subscribe === "thirdplan"){
            this.btnGrow = true;
            this.btnFree = false;
            this.btnStarter = false;
            this.btnSeed = false;
            this.subscribe = "Growing Plan"
          }
          else{
            this.btnFree = true;
            this.btnGrow = false;
            this.btnStarter = false;
            this.btnSeed = false;
            this.subscribe = "Free Plan"
          }
        });
    }

  }

  makeNewCust() {
      let input = JSON.parse(localStorage.getItem("token"));
      if(input === undefined || this.agreementAccepted === false){
        console.log("no input");
      }
      else{
        let sendingObject ={
          "id":input.id,
          "email":input.email,
          "username": localStorage.getItem("currentUser"),
          "newPlan": localStorage.getItem("plan"),
          "coupon": this.couponCode
        }
        this.doneLoading = false;
        this.subs.applySubscription(sendingObject).subscribe(
              (res:any) =>{
                this.acceptDialog = false;
              },
            err=>{
              localStorage.removeItem("token");
              localStorage.removeItem("plan");
              this.showError();
              this.doneLoading = true;
            },
          () =>{
            localStorage.removeItem("token");
            localStorage.removeItem("plan");
            this.toSubscribe = null;
            this.subscribe = sendingObject.newPlan,
            this.showSuccess();
            this.acceptDialog = false;
            this.doneLoading = true;

            if(this.subscribe === "firstplan"){
              this.btnStarter = true;
              this.btnFree = false;
              this.btnSeed = false;
              this.btnGrow = false;
              this.subscribe = "Starter Plan"
            }
            else if(this.subscribe === "secondplan"){
              this.btnSeed = true;
              this.btnFree = false;
              this.btnStarter = false;
              this.btnGrow = false;
              this.subscribe = "Seed Plan"
            }
            else if(this.subscribe === "thirdplan"){
              this.btnGrow = true;
              this.btnFree = false;
              this.btnStarter = false;
              this.btnSeed = false;
              this.subscribe = "Growing Plan"
            }
            else{
              this.btnFree = true;
              this.btnGrow = false;
              this.btnStarter = false;
              this.btnSeed = false;
              this.subscribe = "Free Plan"
            }

          });
      }

  }

  useCoupon(){
    this.openCheckout();
  }

  showSuccess() {
    this.checkMsg = [];
    this.checkMsg.push({severity:'success', summary:'Update Successful', detail:'Subscription Update completed successfully'});
}
  showError() {
    this.checkMsg = [];
    this.checkMsg.push({severity:'error', summary:'Error Message', detail:'Subscription Update failed'});
}

  showCheckboxError() {
    this.checkBoxMsg = [];
    this.checkBoxMsg.push({severity:'error', summary:'Error Message', detail:'Ensure that you agree to the changes in order to submit request'});
}

}
