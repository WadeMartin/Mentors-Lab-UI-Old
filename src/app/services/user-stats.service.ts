import {Company} from '../models/company.model';
import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UserStatService {
    private companies: Company[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }
    getUserStats(object: any){
        return this.http.post(this.baseUrl+ '/api/UserStats/GetUserStats',object).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }

    updateUserStat(object: any){
        return this.http.post(this.baseUrl+ '/api/UserStats/UpdateUserStats',object).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }

}
