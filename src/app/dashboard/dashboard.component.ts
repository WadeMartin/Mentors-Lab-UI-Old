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



@Component({
  selector: 'app-user-profile',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    blockContent = true;
    doneLoading = false;
    startupViews: any;
    managementStats: any;
    followers= [];
    expertiseSearches: any;
    data: any;
    msgs: Message[];

    constructor(private subs: SubscriberService,private router: Router,private stat:StartUpStatService) {
    }

  ngOnInit() {

    let user = {
        "username" : localStorage.getItem("currentUser")
      }
      this.subs.getSubscription(user).subscribe(
        (res:any) =>{
          console.log(res);
          if(res === undefined || res === null){
            this.router.navigateByUrl('/subscribe');
          }
          else{
             if(res.planName === "thirdplan"){
               
                this.populateData();
                this.blockContent = false;
            }
            else{
                this.router.navigateByUrl('/home');
            }
          }
          
        },
      err=>{
      },
    () =>{
      this.doneLoading = true;
    });
  }


  populateData(){
      let searchParams = {
          "Username": localStorage.getItem("currentUser")
      }

      this.stat.getStartupStats(searchParams).subscribe(
        (res:any) =>{
            let totalAmountOfClicks = [];
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']
            let twitterData = [];
            let facebookData = [];
            let googlePlusData = [];
            let linkdenData = [];
            let youtubeData = [];
            let instagramData = [];
            let addedTwitter = false;
            let addedFacebook = false;
            let addedGooglePlus = false;
            let addedYoutube= false;
            let addedLinkden = false;
            let addedInstagram = false;
            console.log(res)

            if(res.followers !== undefined && res.followers !== null){
                
                for(var isss of res.followers){
                    this.followers.push(isss);
                }

            }
            for(var i of months){
                console.log(i)
                if (res.views[i] !== undefined && res.views[i] !== null) {
                    totalAmountOfClicks.push(res.views[i]);
                }
                else {
                    totalAmountOfClicks.push(0);
                }
                
                if(res.socialMediaClicks[i] !== undefined && res.socialMediaClicks[i] !== null){
                    
                    for(var is in res.socialMediaClicks[i]){ 
                        if(is === "Twitter"){
                            twitterData.push(res.socialMediaClicks[i][is])
                            addedTwitter = true;
                        }
                        if(is === "Facebook"){
                            facebookData.push(res.socialMediaClicks[i][is])
                            addedFacebook = true;
                        }
                        if(is === "Google Plus"){
                            googlePlusData.push(res.socialMediaClicks[i][is])
                            addedGooglePlus = true;
                        }
                        if(is === "Youtube"){
                            youtubeData.push(res.socialMediaClicks[i][is])
                            addedYoutube = true;
                        }
                        if(is === "Linkden"){
                            linkdenData.push(res.socialMediaClicks[i][is])
                            addedLinkden = true;
                        }
                        if(is === "Instagram"){
                            instagramData.push(res.socialMediaClicks[i][is])
                            addedInstagram = true;
                        }
                    }

                    if(!addedTwitter){
                        twitterData.push(0)
                    }
                    if(!addedFacebook){
                        facebookData.push(0)
                    }
                    if(!addedGooglePlus){
                        googlePlusData.push(0)
                    }
                    if(!addedYoutube){
                        youtubeData.push(0)
                    }
                    if(!addedLinkden){
                        linkdenData.push(0)
                    }
                    if(!addedInstagram){
                        instagramData.push(0);
                    }
                }
                else{
                    twitterData.push(0)
                    facebookData.push(0)
                    googlePlusData.push(0)
                    linkdenData.push(0)
                    youtubeData.push(0)
                    instagramData.push(0);
                }
                
            }
            this.data = {
                labels: ['Total Member Requests','Total Approved Member Requests','Total Rejected Member Requests'],
                datasets: [
                    {
                        data: [res.amountOfMembers, res.amountOfMembersApproved, res.amountOfMembersRejected],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]    
                };
            this.expertiseSearches = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
                datasets: [
                    {
                        label: 'Twitter',
                        backgroundColor: '#00ffdd',
                        borderColor: '#000000',
                        data: twitterData
                    },
                    {
                        label: 'Facebook',
                        backgroundColor: '#0026ff',
                        borderColor: '#000000',
                        data: facebookData
                    },
                    {
                        label: 'Google Plus',
                        backgroundColor: '#ff8800',
                        borderColor: '#000000',
                        data: googlePlusData
                    },
                    {
                        label: 'Instagram',
                        backgroundColor: '#c300ff',
                        borderColor: '#000000',
                        data: instagramData
                    },
                    {
                        label: 'Linkden',
                        backgroundColor: '#00b6ff',
                        borderColor: '#000000',
                        data: linkdenData
                    },
                    {
                        label: 'Youtube',
                        backgroundColor: '#f42400',
                        borderColor: '#000000',
                        data: youtubeData
                    }
                ]
            }

            this.startupViews = {
                labels: months,
                datasets: [
                    {
                        label: 'Number of views',
                        data: totalAmountOfClicks,
                        fill: false,
                        borderColor: '#4bc0c0'
                    }
                ]
            }
        });
        
       

   
   

  }

}
