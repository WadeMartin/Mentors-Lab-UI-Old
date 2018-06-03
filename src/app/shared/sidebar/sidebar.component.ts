import {Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
import {DataViewModule} from 'primeng/dataview';
import { SelectItem } from 'primeng/components/common/selectitem';
import { MemberRequest } from 'app/models/member-request.model';
import { MemberRequestService } from 'app/services/member-request.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit { // come fix this
    isMentor: boolean;

    constructor( private router: Router) { }

    ngOnInit(){
        // if(localStorage.getItem("type") === "mentor"){
        //     this.isMentor = true;
        // }
        // else if(localStorage.getItem("type") === "startup"){
        //     this.isMentor = false;
        // }
        // else{
        //     this.router.navigateByUrl("/home");
        // }
    }

}
