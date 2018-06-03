import {Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MenuItem } from 'primeng/components/common/api';
import { Input } from '@angular/core/src/metadata/directives';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    username:string = "Welcome "+localStorage.getItem("currentUser");
    private sidebarVisible: boolean;
    loginToken = undefined;
    items: MenuItem[];
    display: boolean = false;
    msgs = [];
    msgss = [];

    public Email;
    public Password;
    public isFail = false;

    @Output() selectedPage = new EventEmitter<string>();

    constructor(private loginService:LoginService,public location: Location,private router: Router, private element : ElementRef) {
        this.sidebarVisible = false;
    }


    showDialog() {
        this.display = true;
    }

    recheckLogin(){
       this.loginToken  = localStorage.getItem("currentUserToken")
       this.username = "Welcome "+localStorage.getItem("currentUser");
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

        this.recheckLogin();
        this.items = [{
            items: [
                {label: 'Profile', icon: 'fa-user' ,routerLink: ['/dashboard']},
                {label: 'Logout', icon: 'fa-sign-out',routerLink: ['/home'], command: (event) => {
                    localStorage.clear();
                    this.recheckLogin();
                }}
            ]
        }];



    }

    login(event){
        console.log("it gets here");
        let loginObject = {
          "Email": this.Email,
          "Password": this.Password
        }
        console.log(loginObject);
        this.loginService.login(loginObject).subscribe(
          (res: any) =>{
            if(res !== null){
                console.log(res);
              localStorage.setItem("currentUserToken",res.token);
              localStorage.setItem("currentUser",res.username);
              localStorage.setItem("type",res.type);
            }
            else{
                this.showError()
            }
          },
          err => { this.showError()},
          () =>{
            this.showSuccess(); 
            this.display = false;   
            this.recheckLogin();      
            }
        )
      }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }




    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }


showSuccess() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Success', detail:'Login Successful'});
    }

    showWarn() {
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'Warn Message', detail:'Member Request was Rejected Successfully'});
    }

    showError() {
        this.msgss = [];
        this.msgss.push({severity:'error', summary:'Failed', detail:'Login unsuccessful'});
    }
}
