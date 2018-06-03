import { Component, OnInit } from '@angular/core';
import {Company} from '../models/company.model';
import {Response} from '@angular/http';
import {CompanyService} from '../services/company.service';
import {ActivatedRoute} from "@angular/router";
import {CardModule} from 'primeng/card';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    test : Date = new Date();
    public companies : Company[];
    public searchParamter ="";
    public htmlBody = "";
    doneLoading = false;
    hasCompanies = false;
    private sendingObject : any;

    constructor(private companyService: CompanyService,private route: ActivatedRoute) {
        this.route.params.subscribe( params => this.sendingObject = params );
        console.log(this.sendingObject);
        this.sendingObject = {
            "SearchInput":this.sendingObject.SearchInput
        }

        this.searchParamter = this.sendingObject.SearchInput;
        console.log(this.sendingObject);
        this.companyService.searchForCompanies(this.sendingObject).subscribe(
            (res: any) => {
                this.companies = res;
                console.log(this.companies)
            },
            err =>{
                this.doneLoading = true;
                this.hasCompanies = false;
            },
            () =>{
                this.doneLoading = true;
                if(this.companies.length == 0){
                    this.hasCompanies = false;
                }
                else{
                    this.hasCompanies = true;
                }
                
            }
            
        );
        
    }

    SearchForCompanies(event){
        this.doneLoading = false;
        console.log('const hit');
        this.companies = null;
        this.sendingObject = {
            "SearchLookup": "Field",
            "SearchInput":this.searchParamter
        }
        if(this.sendingObject.SearchInput === undefined){
            this.sendingObject.SearchInput = "n/a";
        }
        this.companyService.searchForCompanies(this.sendingObject).subscribe(
            (res: any) => {
                
                this.companies = res;
                console.log(this.companies)
            },
            err =>{
                this.doneLoading = true;
                this.hasCompanies = false;
            }
            ,
            () =>{
                this.doneLoading = true;
                if(this.companies.length == 0){
                    this.hasCompanies = false;
                }
                else{
                    this.hasCompanies = true;
                }
            }
            
        );
    }


    ngOnInit() {
        this.route.params.subscribe( params => this.sendingObject = params );
        if(this.sendingObject){
            this.SearchForCompanies(null);
        }
        
    }
}
