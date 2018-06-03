import {Company} from '../models/company.model';
import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class StartUpStatService {
    private companies: Company[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }
    getStartupStats(object: any){
        return this.http.post(this.baseUrl+ '/api/StartUpStats/GetCompanyStats',object).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }

    updateStartUpStat(object: any){
        return this.http.post(this.baseUrl+ '/api/StartUpStats/UpdateCompanyStats',object).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }

}
