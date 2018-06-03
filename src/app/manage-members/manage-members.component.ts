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
import { CompanyService } from 'app/services/company.service';
import { fadeInContent } from '@angular/material';
import { ReportService } from 'app/services/report.service';
import { RatingService } from 'app/services/rating.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-user-profile',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent implements OnInit {
  memberRequests: MemberRequest[];

    
  selectedUser: User;
  msgs: Message[] = [];

  userProfiles: User[];

  doneLoading: boolean = false;
  
  displayDialog: boolean;
  reportDialog: boolean = false;
  ratingDialog: boolean = false;
  removeDialog: boolean = false;

  /// custom fields
reportReason: string;
rateValue: number = 1;

  ///


  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;


  constructor(private ratingService:RatingService, private reportService:ReportService,private companyService:CompanyService,private memberRequestService: MemberRequestService,private userService: UserService,private fileService:FileService) { }

  ngOnInit() {
    let sendingObject = {
      "SearchInput": localStorage.getItem("currentUser")
    }
    this.companyService.searchForCompanyByOwner(sendingObject).subscribe(
        (res: any) => {

            this.memberRequests = res.members;
            
            if(this.memberRequests !== undefined && this.memberRequests !== null){
                for(let req of this.memberRequests) {
                    let userObj = {
                        "Username": req
                    }
    
                        this.userService.getUserDetails(userObj).subscribe(
                            (use: any) => {
                                console.log(use);
                                if(this.userProfiles === undefined || this.userProfiles === null){
                                    console.log("gets here");
                                    this.userProfiles = [use];
                                    console.log(this.userProfiles)
                                }
                                else{
                                    console.log("gets here to");
                                    this.userProfiles.push(use);
                                    console.log(this.userProfiles)
                                }
    
                                
                            },
                            err =>{
                                this.showError("Error","Unable to process the transaction");
                            });
                  }
            }
          },
          err =>{
            this.showError("Error","Unable to process the transaction");
        },
        () =>{
            this.doneLoading = true;
        });
      this.sortOptions = [
          {label: 'Username Ascending', value: 'username'},
          {label: 'Username Descending', value: '!username'},
          {label: 'title', value: 'title'}
      ];
      
    } 
  
  selectCar(event: Event, request: User) {
      this.selectedUser = request;
      this.displayDialog = true;
      event.preventDefault();
  }

  selectReport(event: Event, request: User) {
    this.selectedUser = request;
    this.reportDialog = true;
    event.preventDefault();
}

selectRating(event: Event, request: User) {
    this.selectedUser = request;
    this.ratingDialog = true;
    event.preventDefault();
}

selectRemove(event: Event, request: User) {
    this.selectedUser = request;
    this.removeDialog = true;
    event.preventDefault();
}


  downloadCV(event){
    // let userObj = {
    //     "filePath": this.selectedUser.cvDocLoc
    // }

    // this.fileService.GetCVDocument(userObj);
    var blob = new Blob([this.selectedUser.cvDocLoc], { type: 'application/pdf' });
    saveAs(blob,"CVDoc.pdf")
  }

  removeUser(event,request: User){
      let userObj = {
          "Username": localStorage.getItem("currentUser"),
          "MemberName": this.selectedUser.username,
      }

      this.companyService.removeUserFromMembers(userObj).subscribe((use: any) => {
            console.log("Result from Adding ->" + use._body)
            this.showError("Success","Member removed Successful");
            
            this.userProfiles = this.userProfiles.filter((val,i) => i!=this.userProfiles.indexOf(this.selectedUser));
            this.selectedUser = null;
            this.removeDialog = false;
      },
      err =>{
          this.showError("Error","Unable to process the transaction");
      });
  }

  cancelDialog(event){
      this.removeDialog = false;
  }

  reportUser(event,request: User){

        let userObj = {
            "Reporter": localStorage.getItem("currentUser"),
            "Reported": this.selectedUser.username,
            "Description": this.reportReason
            
        }
  
        this.reportService.submitReport(userObj).subscribe((use: any) => {
              console.log("Result from Reporting ->" + use._body)
              this.showWarn();
              
             // this.userProfiles = this.userProfiles.filter((val,i) => i!=this.userProfiles.indexOf(request));
              this.selectedUser = null;
        },
        err =>{
            this.showError("Error","Unable to process the transaction");
        });
        this.addToast({title:'Default Toasty', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 5000, theme:'default', position:'bottom-right', type:'success'})
        this.reportReason = "";
        this.reportDialog = false;
    
  }

  rateUser(event,request: User){

    let userObj = {
        "RaterUsername": localStorage.getItem("currentUser"),
        "For": this.selectedUser.username,
        "Rate": this.rateValue,
        "Comment":this.reportReason,
    }

    this.ratingService.submitRating(userObj).subscribe((use: any) => {
          console.log("Result from Reporting ->" + use._body)
          this.showSuccess();
          
         // this.userProfiles = this.userProfiles.filter((val,i) => i!=this.userProfiles.indexOf(request));
          this.selectedUser = null;
    },
    err =>{
        this.showError("Error","Unable to process the transaction");
    });

    this.reportReason = "";
    this.ratingDialog = false;
    this.rateValue = 1;

}

  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Success Message', detail:'Member rating was submitted Successfully'});
    }

    showWarn() {
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'Success Message', detail:'Member was reported successfully'});
    }

    showError(status,message) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:status, detail: message});
    }

  onSortChange(event) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }
  
  onDialogHide() {
      this.selectedUser = null;
      this.reportReason = "";
      this.rateValue = 1;
  }

}
