import {Company} from '../models/company.model';
import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CompanyService {
    private companies: Company[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    getCompanies() {
        return this.companies;
    }

    searchForCompany(search: any) {
        return this.http.post(this.baseUrl+ '/api/startup/search',search).map((res: Response) => <Company>res.json()).catch(err => {
            return Observable.throw('no');
        })
        
        
    }

    searchForCompanyByOwner(search: any) {
        return this.http.post(this.baseUrl+ '/api/startup/GetCompanyByOwner',search).map((res: Response) => <Company>res.json()).catch(err => {
            return Observable.throw('no');
        })
        
        
    }

    removeUserFromMembers(search: any) {
        return this.http.post(this.baseUrl+ '/api/startup/RemoveMemberFromStartup',search).map((res: Response) => <Company>res.json()).catch(err => {
            return Observable.throw('no');
        })
        
        
    }

    searchForCompanyByUsername(search: any) {
        return this.http.post(this.baseUrl+ '/api/startup/SearchForCompanyByUsername',search).map((res: Response) => <Company>res.json()).catch(err => {
            return Observable.throw('no');
        })
        
        
    }

    searchForCompanies(search: any) {
        return this.http.post(this.baseUrl+ '/api/startup/SearchForAll',search).map((res: Response) => <Company[]>res.json()).catch(err => {
            return Observable.throw('no');
        })
        
        
    }

    createOrUpdateCompany(search: any) {
        return this.http.post(this.baseUrl+ '/api/startup/CreateNewOrUpdateStartUp',search).map((res: Response) => <Company>res.json()).catch(err => {
            return Observable.throw('no');
        })
        
        
    }

}
