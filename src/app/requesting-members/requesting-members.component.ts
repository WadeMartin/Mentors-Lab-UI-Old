import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
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
import { NavbarComponent } from 'app/shared/navbar/navbar.component';
import { StartUpStatService } from '../services/startup-stats.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-user-profile',
  templateUrl: './requesting-members.component.html',
  styleUrls: ['./requesting-members.component.scss']
})
export class RequestingMembersComponent implements OnInit {
  memberRequests: MemberRequest[];
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

    
  selectedUser: User;
  msgs: Message[] = [];

  userProfiles: User[];

  doneLoading: boolean = false;
  
  displayDialog: boolean;


  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;


  constructor(private memberRequestService: MemberRequestService,private stat:StartUpStatService,private userService: UserService,private fileService:FileService) { }

  ngOnInit() {
    
    let sendingObject = {
      "SearchInput": localStorage.getItem("currentUser")
  }
   this.memberRequestService.searchForRequests(sendingObject).subscribe(
          (res: any) => {
              console.log(res)

            this.memberRequests = res;
            if(this.memberRequests !== undefined && this.memberRequests !== null){
            for(let req of this.memberRequests) {
                let userObj = {
                    "Username": req.username
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
                            this.showError();
                        });
              }
            }
             
          },
          err =>{
            this.showError();
        },
    () =>{
        this.doneLoading = true;
    });
     
          
          

      this.sortOptions = [
          {label: 'Username Ascending', value: 'username'},
          {label: 'Username Descending', value: '!username'},
          {label: 'title', value: 'title'}
      ];
      this.navbar.recheckLogin();
    } 
  
  selectCar(event: Event, request: User) {
      this.selectedUser = request;
      this.displayDialog = true;
      event.preventDefault();
  }


  downloadCV(event){
    // let userObj = {
    //     "filePath": this.selectedUser.cvDocLoc
    // }
    var blob = new Blob([this.selectedUser.cvDocLoc], { type: 'application/pdf' });
    saveAs(blob,"CVDoc.pdf")
    // var url= window.URL.createObjectURL(blob);
    // window.open(url);
   //this.fileService.GetCVDocument(userObj);
  }

  addUser(event,request: User){
      let userObj = {
          "Username": localStorage.getItem("currentUser"),
          "RequestingUsername": request.username,
          "Id": this.memberRequests.find( i => i.username == request.username).id,
          "Response": true,
      }

      this.memberRequestService.approveRequest(userObj).subscribe((use: any) => {
            console.log("Result from Adding ->" + use._body)
            this.showSuccess();
            
            this.userProfiles = this.userProfiles.filter((val,i) => i!=this.userProfiles.indexOf(request));
            this.selectedUser = null;
      },
      err =>{
          this.showError();
      },() =>{
        let update = { // come back and fix this
            "MembersApprovedIncrease":1,
            "Username": localStorage.getItem('currentUser')
          }
          this.stat.updateStartUpStat(update).subscribe((res:any) =>{
      
          });});
  }

  rejectUser(event,request: User){
    let userObj = {
        "Username": localStorage.getItem("currentUser"),
        "RequestingUsername": request.username,
        "Id": this.memberRequests.find( i => i.username == request.username).id,
        "Response": false,
    }

    this.memberRequestService.approveRequest(userObj).subscribe((use: any) => {
          console.log("Result from Adding ->" + use)
          this.showWarn();
          this.userProfiles = this.userProfiles.filter((val,i) => i!=this.userProfiles.indexOf(request));
            this.selectedUser = null;
    },
err =>{
    this.showError();
},() =>{
    let update = { // come back and fix this
        "MembersRejectedIncrease":1,
        "Username": localStorage.getItem('currentUser')
      }
      this.stat.updateStartUpStat(update).subscribe((res:any) =>{
  
      });
});
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Success Message', detail:'Member Request was Approved Successfully'});
    }

    showWarn() {
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'Warn Message', detail:'Member Request was Rejected Successfully'});
    }

    showError() {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error Message', detail:'Unable to process action'});
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
  }

}
