import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    searchParamter = "";
    model = {
        left: true,
        middle: false,
        right: false
    };
    
    constructor(private router: Router) { }

    ngOnInit() {}

    search(){
        // this.router.navigateByUrl('/search');
        console.log("searches")
    }
}
