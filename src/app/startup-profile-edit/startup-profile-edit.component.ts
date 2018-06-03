import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CompanyService} from '../services/company.service';
import {Company} from '../models/company.model';
import {User} from '../models/User.model';
import {ActivatedRoute, Router} from "@angular/router";
import { count } from 'rxjs/operators/count';
import { NgxCarousel,NgxCarouselStore } from 'ngx-carousel';
import {DomSanitizer} from '@angular/platform-browser';
import {RatingBreakdown} from '../models/rating-breakdown.model';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { RatingService } from 'app/services/rating.service';
import {CalendarModule} from 'primeng/calendar';
import {FileService} from '../services/file.service';
import { SubscriberService } from 'app/services/subscriber.service';
import { Message } from 'primeng/components/common/message';
import { StartUpStatService } from 'app/services/startup-stats.service';


@Component({
  selector: 'app-startup-profile-edit',
  templateUrl: './startup-profile-edit.component.html',
  styleUrls: ['./startup-profile-edit.component.scss'],
})
export class StartupProfileEditComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  public imgURL= this.sanitizer.bypassSecurityTrustUrl("pp.jpng");
  private logoUrl: any;
  videoLinks = null;
  co:Company;


  subType :any;

  public companyName: string;
  public field: string[];
  public location: string;
  public createdYear: Date;
  public description: string;
  public logoLoc: string;
  public photos: string[] = [];
  public videos: any[];
  public mediaLinks: string[];
  public websiteURL: string;
  messages: any;
  owningUsername: any;

  checkMsg: Message[] = [];

  maxSelectedItems:number;
  maxAmountOfImages = 0;
  
  public twitterLink: string;
  public youtubeLink: string;
  public instagramLink: string;
  public googlePlusLink: string;
  public facebookLink: string;


  doneLoading = false;

  isValid = true;



  
  errors: Array<string> =[];
  dragAreaClass: string = 'dragarea';
  @Input() projectId: number = 0;
  @Input() sectionId: number = 0;
  @Input() fileExt: string = "JPG, GIF, PNG";
  @Input() maxFiles: number = 1;
  @Input() maxSize: number = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();
 constructor(private router: Router,private sanitizer:DomSanitizer, private subs: SubscriberService,private fileService:FileService,private companyService:CompanyService){}

 msgs = [];
    uploadedFiles: any[] = [];

    mySelect(event) {
      console.log(event);
        for(let file of event.files) {
          const index: number = this.uploadedFiles.indexOf(this.uploadedFiles.find( c => c.name === file.name));
      console.log(index)
       if (index === -1) {
        this.uploadedFiles.push(file);
        } 
            
        }
        console.log(this.uploadedFiles);
      }
      myRemove(event) {
        const index: number = this.uploadedFiles.indexOf(this.uploadedFiles.find( c => c.name === event.file.name));
        console.log(index)
    if (index !== -1) {
        this.uploadedFiles.splice(index, 1);
    }
    console.log(this.uploadedFiles);
       
        ;
        }


    

 ngOnInit(){
     
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
            if(res.planName === "firstplan"){
                this.subType = "starter";
                this.maxSelectedItems = 4;
                this.maxAmountOfImages = 0; 
                this.videoLinks = null;
            }
            else if(res.planName === "secondplan"){
                this.subType = "seed";
                this.maxSelectedItems = 6;
                this.maxAmountOfImages = 1; 
                this.videoLinks = [""];
            }
            else if(res.planName === "thirdplan"){
                this.subType = "growing";
                this.maxSelectedItems = 6;
                this.maxAmountOfImages = 4; 
                this.videoLinks = ["",""];
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
    
    
    
  this.dropdownList = [
    { item_id: 1, item_text:'Admin'},
    { item_id: 2, item_text:'Coaching' },
    { item_id: 3, item_text: 'Communication'},
    { item_id: 4, item_text: 'Digital'},
    { item_id: 5, item_text: 'Design'},
       { item_id: 6, item_text:   'Finance'},
       { item_id: 7,  item_text:  'Fundraising'}, 
       { item_id: 8,  item_text:  'HR' },
       { item_id: 9,  item_text: 'IT Infustracture'} ,
       { item_id: 10,  item_text: 'Manufacturing'},
       { item_id: 11,  item_text:  'Marketing' },
       { item_id: 12,  item_text: 'Purchasing'},
       { item_id: 13,  item_text:  'Sales'},
       { item_id: 14,  item_text:    'Supply Chain'},
       { item_id: 15,  item_text:    'Social Networks'},
       { item_id: 16,  item_text:   'Software Development'},
       { item_id: 17,  item_text:  'Strategy'},
];
this.dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true
};

let usernameObject = {
    "SearchInput": localStorage.getItem("currentUser")
}

this.companyService.searchForCompanyByUsername(usernameObject).subscribe(
 (res: any) =>{
     console.log(res);
     this.co = res[0];
     
    this.companyName = res[0].companyName,
    this.description = res[0].description,
    this.field = res[0].field,
    this.location = res[0].location,
    this.logoLoc = res[0].logoLoc,
    this.logoUrl  = res[0].logoLoc,
    this.imgURL = this.logoLoc,
    this.createdYear.setDate(res[0].createdYear),
    this.websiteURL = res[0].websiteURL,
    this.selectedItems = res[0].field;
    if(res[0].mediaLinks != undefined){
        this.twitterLink = res[0].mediaLinks[0];
        this.youtubeLink= res[0].mediaLinks[1];
        this.instagramLink= res[0].mediaLinks[2];
        this.googlePlusLink= res[0].mediaLinks[3];
        this.facebookLink= res[0].mediaLinks[4];
    }
    
    this.photos = res[0].photos;
    this.videoLinks = res[0].videos;
    this.owningUsername = localStorage.getItem('currentUser');
    console.log(this.owningUsername);
    
    
 },
 (err) =>{

 },
 () =>{
     this.doneLoading = true;
    }
);
 }

 onFileChange(event){
  let files = event.target.files; 
  this.saveFiles(files);
}

customTrackBy(index: number, obj: any): any {
	return index;
}

saveFiles(files){
this.errors = []; // Clear error
// Validate file size and allowed extensions
if (files.length > 0 && (!this.isValidFiles(files))) {
    this.uploadStatus.emit(false);
    return;
}       
if (files.length > 0) {
      let formData: FormData = new FormData();
      for (var j = 0; j < files.length; j++) {
          formData.append("file[]", files[j], files[j].name);
      }
      var parameters = {
          projectId: this.projectId,
          sectionId: this.sectionId
      }
      this.fileService.upload(formData, parameters)
          .subscribe(
          success => {
            this.logoUrl = success._body
            this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.logoUrl);
            console.log(success)
            this.uploadStatus.emit(true);
            
            
          },
          error => {
              this.uploadStatus.emit(true);
              this.errors.push(error.ExceptionMessage);
          }) 
  } 
}

private isValidFiles(files){
// Check Number of files
 if (files.length > this.maxFiles) {
     this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
     return;
 }        
 this.isValidFileExtension(files);
 return this.errors.length === 0;
}

private isValidFileExtension(files){
// Make array of file extensions
var extensions = (this.fileExt.split(','))
                .map(function (x) { return x.toLocaleUpperCase().trim() });
for (var i = 0; i < files.length; i++) {
    // Get file extension
    var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
    // Check the extension exists
    var exists = extensions.includes(ext);
    if (!exists) {
        this.errors.push("Error (Extension): " + files[i].name);
    }
    // Check file size
    this.isValidFileSize(files[i]);
}
}




private isValidFileSize(file) {
var fileSizeinMB = file.size / (1024 * 1000);
var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
if (size > this.maxSize)
    this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
}

UpdateProfile(event){
  this.myUploader();
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

myUploader(){
    this.checkMsg = [];
    this.isValid = true;
    let files = this.uploadedFiles;
    console.log(this.maxSelectedItems);
    console.log(this.maxAmountOfImages);
    
    if(this.selectedItems.length > this.maxSelectedItems){
        this.isValid = false;
        this.checkMsg.push({severity:'error', summary:'Error Message', detail:'You may only select '+this.maxSelectedItems+' areas of expertise your startup is looking for'});
    }
    if(files.length > this.maxAmountOfImages && files !== undefined){
        this.isValid = false;
        this.checkMsg.push({severity:'error', summary:'Error Message', detail:'You may only select '+this.maxAmountOfImages+' amount of images for your startup'});
    }
    
    else{
        if (files.length > 0) {
            if(this.isValid){
            let formData: FormData = new FormData();
            for (var j = 0; j < files.length; j++) {
                formData.append("file[]", files[j], files[j].name);
            }
            var parameters = {
                projectId: this.projectId,
                sectionId: this.sectionId
            }
            
            this.fileService.UploadBulk(formData, parameters)
                .subscribe(
                success => {
                  
                   let workingString = success._body.replace("[","");
                  workingString = workingString.replace("]","");
                  workingString = workingString.replace(/"/g,'');
                  this.photos = workingString.split('^');

                  console.log(this.photos)
                  
                  this.uploadStatus.emit(true);
                  let fields = []
                  for(let file of this.selectedItems) {
                    fields.push(file.item_text);
                  }
                  console.log(this.selectedItems);
                  let e = this.imgURL;
                  let sendingObject = {
                    "CompanyName": this.companyName,
                    "Field": fields,
                    "Location": this.location,
                    "websiteUrl": this.websiteURL,
                    "MediaLinks":[
                      this.facebookLink,
                      this.twitterLink,
                      this.instagramLink,
                      this.googlePlusLink,
                      this.youtubeLink],
                    "CreatedYear": this.createdYear,
                    "LogoLoc": this.logoUrl,
                    "Videos": this.videoLinks,
                    "Description": this.description,
                    "Photos": this.photos,
                    "OwningUsername":this.owningUsername
                  }
                
                  console.log(sendingObject);
                
                
                    this.companyService.createOrUpdateCompany(sendingObject).subscribe(
                    (res: any) => {
                    });
                  
                  
                },
                error => {
                    this.uploadStatus.emit(true);
                    this.errors.push(error.ExceptionMessage);
                })
            } 
        }
        else{
            console.log(files);
            this.errors = []; // Clear error
            // Validate file size and allowed extensions      
           
              if(this.isValid){
                let fields = []
                for(let file of this.selectedItems) {
                  fields.push(file.item_text);
                }
                let e = this.imgURL;
                let sendingObject = {
                  "CompanyName": this.companyName,
                  "Field": fields,
                  "Location": this.location,
                  "websiteUrl": this.websiteURL,
                  "MediaLinks":[
                    this.facebookLink,
                    this.twitterLink,
                    this.instagramLink,
                    this.googlePlusLink,
                    this.youtubeLink],
                  "CreatedYear": this.createdYear,
                  "LogoLoc": this.logoUrl,
                  "Videos": this.videoLinks,
                  "Description": this.description,
                  "OwningUsername":this.owningUsername
                }
              
                console.log(sendingObject);
              
              
                  this.companyService.createOrUpdateCompany(sendingObject).subscribe(
                  (res: any) => {
                  });
              } 
        }
    }

  }

}
