import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../services/company.service';
import {UserService} from '../services/user.service';
import {Company} from '../models/company.model';
import {User} from '../models/User.model';
import {ActivatedRoute, Router} from "@angular/router";
import { count } from 'rxjs/operators/count';
import { NgxCarousel,NgxCarouselStore } from 'ngx-carousel';
import {DomSanitizer} from '@angular/platform-browser';
import {RatingBreakdown} from '../models/rating-breakdown.model';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { RatingService } from 'app/services/rating.service';
import { MemberRequestService } from 'app/services/member-request.service';
import { Message } from 'primeng/components/common/message';
import { SubscriberService } from 'app/services/subscriber.service';
import { StartUpStatService } from 'app/services/startup-stats.service';


@Component({
  selector: 'app-startup-profile',
  templateUrl: './startup-profile.component.html',
  styleUrls: ['./startup-profile.component.scss']
})
export class StartupProfileComponent implements OnInit {
  public carouselPhotoItems: Array<any>;
  public carouselVideoItems: Array<any>;
  public ratersProfiles: Array<any>;
  public carouselTile: NgxCarousel;
  public membersList: Array<any>;
  loginDisplay = false;
  public avgRating = 0;
  company: Company;
  private users : Array<User>;
  public ratings : Array<any>;
  public hasRatings = false;
  sendingObject: any;
  public breakdown: RatingBreakdown;
  proposeDialog: boolean = false;
  agreementAccepted: boolean;
  showCaseRatings: boolean = true;
  doneLoading:boolean = false;
  isLoggedIn = localStorage.getItem("currentUser")
  
  facebookUrl;
  twitterUrl;
  instagram;
  googlePlus;
  youtube;
  linkden;

  public followersCount = 0;

  public fiveStarPercentages : {};
  public fourStarPercentages : {};
  public threeStarPercentages : {};
  public twoStarPercentages : {};
  public oneStarPercentages : {};
  msgs: Message[] = [];
  checkBoxMsg: Message[] = [];

  constructor(private router: Router,private subs: SubscriberService,private stat:StartUpStatService,private companyService: CompanyService,private memberRequestService: MemberRequestService,private userService: UserService,private ratingService : RatingService,private route: ActivatedRoute,private sanitizer:DomSanitizer) {
    
   }

  ngOnInit() {
    
    this.PopulateStartUpFields();
    this.carouselTile = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 5,
      touch: true,
      easing: 'ease'
    }
    

    
  }

  PopulateStartUpFields(){
    this.route.params.subscribe( params => this.sendingObject = params );
  this.companyService.searchForCompany(this.sendingObject).subscribe(
      (res: any) => {
        this.company = res[0];
        console.log(this.company);
        this.facebookUrl= res[0].mediaLinks[0];
        this.twitterUrl=res[0].mediaLinks[1];
        this.instagram=res[0].mediaLinks[2];
        this.googlePlus=res[0].mediaLinks[3];
        this.youtube=res[0].mediaLinks[4];
        this.company.OwningUsername = res[0].owningUsername;
        //this.linkden=res[0].mediaLinks[5];
          console.log(this.company);
          // if(this.company.followers !== null){
          //   this.followersCount = this.company.followers.length;
          // }
          // else{
          //   this.followersCount = 0;
          // }
          if(this.company.photos !== null){
            for(let photo of this.company.photos){
              if(this.carouselPhotoItems == undefined){
                this.carouselPhotoItems = [this.sanitizer.bypassSecurityTrustUrl("http://192.168.1.2:8080/"+photo)];
              }
              else{
                this.carouselPhotoItems.push(this.sanitizer.bypassSecurityTrustUrl("http://192.168.1.2:8080/"+photo));
              }
              
            }
          }
          if(this.company.videos !== null){
            for(let vid of this.company.videos){
              let url = this.sanitizer.bypassSecurityTrustResourceUrl(vid);
              if(this.carouselVideoItems == undefined){
                this.carouselVideoItems = [url];
                console.log(this.carouselVideoItems);
              }
              else{
                this.carouselVideoItems.push(url);
              }
            }
          }
          
          
            if(this.company.members !== null){
              for(let member of this.company.members){
                console.log("member=>" + member)
                let usernameObject = {
                  "Username":member
                };
                this.userService.getUserDetails(usernameObject).subscribe(
                  (res: any) =>{
                    if(this.membersList == undefined){
                      console.log("member result=>" + res.firstName)
                      this.membersList = [res];
                      console.log(this.carouselVideoItems);
                    }
                    else{
                      this.membersList.push(res);
                    }
                  }
                )
               
              }
            }

          console.log(this.membersList);
          this.ratingService.searchForRatings(this.sendingObject).subscribe(
            (res: any) => {
              this.breakdown = new RatingBreakdown();
              this.ratings = res;
              console.log(this.ratings);
            console.log(this.hasRatings);
              if(this.ratings !== null){
                this.hasRatings = true;
                console.log()
                for(let rate of this.ratings){
                  let usernameObject = {
                    "Username":rate.raterUsername
                  };
                  this.userService.getUserDetails(usernameObject).subscribe(
                    (res: any) =>{
                      this.ratings[this.ratings.indexOf(rate)].raterProfile  = res.profilePicLoc;
                    }
                  )
                console.log("still get into ratings")
                this.avgRating = this.ratingService.getAverageRating(this.ratings);
              
              this.breakdown = this.breakdown.SetCountsAndPercentages(this.ratings);
              this.fiveStarPercentages = {
                'width':this.breakdown.fiveStarPercentage + '%'
              }
              this.fourStarPercentages = {
                'width':this.breakdown.fourStarPercentage + '%'
              }
              this.threeStarPercentages = {
                'width':this.breakdown.threeStarPercentage + '%'
              }
              this.twoStarPercentages = {
                'width':this.breakdown.twoStarPercentage + '%'
              }
            this.oneStarPercentages = {
              'width':this.breakdown.oneStarPercentage + '%'
            }
              }

            console.log(this.breakdown);
            
            }
          
             
          }
              
        
          )
         
          
      },(err=>{}),() =>{
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
        let update = { // come back and fix this
          "View":{
            "ViewKey": monthNames[new Date().getMonth()]
          },
          "Username": this.company.OwningUsername
        }
        this.stat.updateStartUpStat(update).subscribe((res:any) =>{
    
        });
        console.log(this.company.OwningUsername)
        let user = {
          "username" : this.company.OwningUsername
        }
        this.subs.getSubscription(user).subscribe(
          (res:any) =>{
            console.log(res);
             if(res.planName === "starterplan"){
              this.showCaseRatings = false;
              }
              
            }
            
          )
        this.doneLoading = true;
      }
      
  );

  
  

  return this.company;

    
  }

  display: boolean = false;

      selectPropose(event: Event) {
        if(localStorage.getItem("currentUser") !== null && localStorage.getItem("currentUser") !== undefined){
          this.proposeDialog = true;
          event.preventDefault();
        }
        else{
          this.loginDisplay = true;
        }
      
  }


  sendRequest(){
    if(this.agreementAccepted){


    let usernameObject = {
      "Username":localStorage.getItem("currentUser")
    };
    this.userService.getUserDetails(usernameObject).subscribe(
      (res: any) =>{
       let user = res;

       let request = {
         "Username":localStorage.getItem("currentUser"),
         "Reason":user.description,
         "StartupName":this.company.companyName
       }
       this.memberRequestService.sendRequest(request).subscribe(
        (output: any)=>{
          console.log(output);
          this.showSuccess('Member Request was sent Successfully');
        },
        err =>{
          this.showError();
      }
       )

      },
      err =>{

      },
      () =>{
              let update = { // come back and fix this
                "AmountOfMembersIncrease":1,
                "Username": this.company.OwningUsername
              }
              this.stat.updateStartUpStat(update).subscribe((res:any) =>{
          
              });
      }
    )
  }
  else{
    this.showCheckboxError();
  }
  }
  follow(event){
    if(localStorage.getItem("currentUser") !== null && localStorage.getItem("currentUser") !== undefined){
      let update = { // come back and fix this
        "FollowerAdd":localStorage.getItem("currentUser"),
        "Username": this.company.OwningUsername
      }
      console.log("gets into success")
      this.stat.updateStartUpStat(update).subscribe((res:any) =>{
       
      },
    err =>{

    },
  () =>{
    
    
  });
  this.showSuccess('You are now following '+this.company.companyName);
    }
    else{
      this.loginDisplay = true;
    }
    
  }
  showSuccess(message) {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Success Message', detail: message});
    this.proposeDialog = false;
    }
  showError() {
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'Error Message', detail:'Unable to process action'});
  }

  showCheckboxError() {
    this.checkBoxMsg = [];
    this.checkBoxMsg.push({severity:'error', summary:'Error Message', detail:'Ensure that you agree to the terms and conditions in order to submit request'});
}

AddSocialMediaClick(event){
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
        let update = { // come back and fix this
          "SocialMedia":{
            "SocialKey": event,
            "SocialMonth": monthNames[new Date().getMonth()]
          },
          "Username": this.company.OwningUsername
        }
        this.stat.updateStartUpStat(update).subscribe((res:any) =>{
    
        },
      (err) =>{

      },
    () =>{
      
    });
}

}
