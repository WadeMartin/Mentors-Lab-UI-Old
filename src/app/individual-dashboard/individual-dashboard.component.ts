import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {FileService} from '../services/file.service';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../services/user.service';
import { MemberRequest } from 'app/models/member-request.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { MemberRequestService } from 'app/services/member-request.service';
import { User } from 'app/models/user.model';
import { Subscriber } from 'rxjs/Subscriber';
import {Message} from 'primeng/components/common/api';
import { RatingService } from 'app/services/rating.service';
import { SubscriberService } from 'app/services/subscriber.service';
import { Router } from '@angular/router';
import { StartUpStatService } from 'app/services/startup-stats.service';
import { Rating } from '../models/rating.model';
import { UserStatService } from '../services/user-stats.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './individual-dashboard.component.html',
  styleUrls: ['./individual-dashboard.component.scss']
})
export class IndividualDashboardComponent implements OnInit {

    doneLoading = false;
    following= [];
    memberOf = [];
    msgs: Message[];
    public avgRating = 0;
    ratings : Array<Rating>;
    ratingsGiven : Array<Rating>;
    hasRecievedRatings = false;
    hasGivenRatings = false;

    constructor(private subs: SubscriberService,private router: Router,private stat:UserStatService,private ratingService: RatingService, private memberRequestService: MemberRequestService,private userService: UserService,private fileService:FileService) {
    }

  ngOnInit() {
    this.populateRatings()
    this.populateStats()
  }

  populateRatings(){
    let sendingObject = {
        "SearchInput":localStorage.getItem("currentUser"),
        "Rating":true
      }
      
      this.ratingService.searchForRatingsByUsername(sendingObject).subscribe(
        (res: any) => {
          this.ratings = res;
          console.log(res)
          if(this.ratings !== null && this.ratings.length > 0){
            this.hasRecievedRatings = true;
            for(let rate of this.ratings){
              console.log("getting inside the ratings")
              let usernameObject = {
                "Username":rate.raterUsername
              };
              this.userService.getUserDetails(usernameObject).subscribe(
                (res: any) =>{
                  this.ratings[this.ratings.indexOf(rate)].raterProfile  = res.profilePicLoc;
                  console.log("assigned pro-pic")
                }
              )
        } 
      }
      else{
        this.msgs = [];
          this.msgs.push({severity:'warn', summary:'     No Ratings found', detail:'You have not recieved or given any ratings'});
      }
        },
    err =>{

    },
() => {
    this.avgRating = this.ratingService.getAverageRating(this.ratings);
this.doneLoading = true
})
  
        this.ratingService.searchForRatingsByUsername(sendingObject).subscribe(
          (res: any) => {
            console.log("im getting into given")
            this.ratingsGiven = res;
            console.log(res)
            if(this.ratingsGiven !== null && this.ratingsGiven.length > 0){
              this.hasGivenRatings = true;
        }
        else{
          this.msgs = [];
            this.msgs.push({severity:'warn', summary:'     No Ratings found', detail:'You have not recieved or given any ratings'});
        }
          })
  }


  populateStats(){
    let searchParams = {
        "Username": localStorage.getItem("currentUser")
    }

    this.stat.getUserStats(searchParams).subscribe(
        (res:any) =>{
            console.log(res);
            this.following = res.following;
            this.memberOf = res.startUpsAssignedTo
        },
        err => {},
        () =>{this.doneLoading = true}
    )
  }

}
