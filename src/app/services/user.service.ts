import {User} from '../models/user.model';
import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    public user: User;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    getUserDetails(username:any) {
        return this.http.post(this.baseUrl + '/api/user/GetUserDetails',username).map((res: Response) =>  <User[]>res.json()).catch(err => {
            return Observable.throw('no');
        })
        
    }
    updateUserDetails(user:any) {
        return this.http.post(this.baseUrl + '/api/user/UpdateUserDetails',user).map((res: Response) =>  res).catch(err => {
            return Observable.throw('no');
        })
    }

   

    getFullName(user: User) {
        return user.firstName + ' ' + user.lastName;
    }
}
