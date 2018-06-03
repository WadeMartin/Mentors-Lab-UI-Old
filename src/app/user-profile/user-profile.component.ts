import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {FileService} from '../services/file.service';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    dropdownList = [];
    selectedItems = [];
    msgs = [];
    dropdownSettings = {};
    public imgURL = this.sanitizer.bypassSecurityTrustUrl("http://192.168.1.2:8080/pp.png");
    public docUrl = null;
    docUploaded = null;
    public Comments;
    public firstName;
    doneLoading: boolean = false;
    updateLoading: boolean = true;
    public lastName;
    public title;
    public uploadedStatus : string;;
    public currentEmployer;

    ///Imaging Details
    errors: Array<string> =[];
  dragAreaClass: string = 'dragarea';
  @Input() projectId: number = 0;
  @Input() sectionId: number = 0;
  @Input() fileExt: string = "JPG, GIF, PNG, PDF, DOCX";
  @Input() maxFiles: number = 1;
  @Input() maxSize: number = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();

  

  constructor(private fileService: FileService,private sanitizer:DomSanitizer,private userService: UserService) { }

  onFileChange(event){
    let files = event.target.files; 
    this.saveFiles(files);
 }

 onDocChange(event){
    let files = event.target.files; 
    this.saveDocs(files);
 }


 updateUser(event){

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
                this.imgURL = success._body
              this.uploadStatus.emit(true);
              this.uploadedStatus = "Document Uploaded"
              
            },
            err => {
                this.showError();
            },
            () =>{
                this.showSuccess("Profile Picture Upload Complete");
            }
        ) 
    } 
}

saveDocs(files){
    
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    if (files.length > 0 && (!this.isValidFiles(files))) {
        console.log("uplaodingDoc");
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
                this.docUrl = success._body
                this.uploadStatus.emit(true);
                this.uploadedStatus = "Document Uploaded"
                this.docUploaded = "Document Uploaded"
                
              },
              err => {
                  this.showError();
              },
              () =>{
                  this.showSuccess("Document Upload Complete");
              }
          ) 
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



UpdateProfile(event){
this.updateLoading = false;
let fields = []
for(let file of this.selectedItems) {
  fields.push(file.item_text);
}
    let usernameObject = {
        "FirstName" : this.firstName,
        "Username": localStorage.getItem("currentUser"),
        "LastName" :this.lastName,
        "Title" :this.title,
        "Description": this.Comments,
        "ProfilePicLoc": this.imgURL,
        "CurrentEmployer": this.currentEmployer,
        "Expertises" : fields,
        "CVDocLoc": this.docUrl,
    }
console.log(usernameObject)

    this.userService.updateUserDetails(usernameObject).subscribe(
        (res: any) =>{
            this.showSuccess("User updated Successfully");
        }
        ,
        err => {
            this.showError();
        },
        () =>{
            this.updateLoading = true;
        }

      )
}


showSuccess(messages) {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Success Message', detail:messages});
    }

    showWarn() {
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'Warn Message', detail:'Member Request was Rejected Successfully'});
    }

    showError() {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error Message', detail:'Unable to process action'});
    }


private isValidFileSize(file) {
  var fileSizeinMB = file.size / (1024 * 1000);
  var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
  if (size > this.maxSize)
      this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
}

  ngOnInit(){
    this.dropdownList = [
        { item_id: 1,  item_text: 'Admin'},
        { item_id: 2, item_text: 'Coaching' },
           { item_id: 3, item_text: 'Communication' },
           { item_id: 4,  item_text: 'Digital'},
           { item_id: 5,  item_text: 'Design'},
           { item_id: 6,  item_text: 'Finance'},
           { item_id: 7,  item_text: 'Fundraising'}, 
           { item_id: 8, item_text: 'HR' },
           { item_id: 9, item_text: 'IT Infustracture' },
           { item_id: 10, item_text: 'Manufacturing'},
           { item_id: 11,  item_text: 'Marketing' },
           { item_id: 12,  item_text: 'Purchasing'},
           { item_id: 13,  item_text: 'Sales'},
           { item_id: 14, item_text: 'Supply Chain'},
           { item_id: 15, item_text: 'Social Networks'},
           { item_id: 16, item_text: 'Software Development'},
           { item_id: 17,  item_text: 'Strategy'},
   ];
   this.selectedItems = [

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
       "Username": localStorage.getItem("currentUser")
   }

  this.userService.getUserDetails(usernameObject).subscribe(
    (res: any) =>{
        this.firstName = res.firstName,
        this.lastName= res.lastName,
        this.title= res.title,
        this.Comments= res.description,
        this.imgURL= res.profilePicLoc,
        this.currentEmployer= res.currentEmployer,
        this.selectedItems= res.expertises;
        if(res.cvDocLoc){
            this.docUploaded= "CV Document is uploaded"
        }
        else{
            this.docUploaded= "No CV Document Loaded"
        }
    },
    (err) =>{

    },
    () =>{
        this.doneLoading = true;
    }

  )
}
onItemSelect(item:any){
   console.log(this.selectedItems);
}
onSelectAll(items: any){
   console.log(items);
}

}
