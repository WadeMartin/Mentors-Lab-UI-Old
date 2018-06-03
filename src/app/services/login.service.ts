import {User} from '../models/user.model';
import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { LoginResponse } from 'app/models/login-response.model';

@Injectable()
export class LoginService {
    public user: User;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    login(login:any) {
        return this.http.post(this.baseUrl + '/api/login/login',login).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
        
    }

    createLogin(login:any) {
        return this.http.post(this.baseUrl + '/api/login',login).map((res: Response) => res).catch(err => {
            return Observable.throw('no');
        })
        
    }
    validateUsername(login:any) {
        return this.http.post(this.baseUrl + '/api/login/checkUsername',login).map((res: Response) => res).catch(err => {
            return Observable.throw('no');
        })
        
    }

    validateEmail(login:any) {
        return this.http.post(this.baseUrl + '/api/login/checkEmail',login).map((res: Response) => res).catch(err => {
            return Observable.throw('no');
        })
        
    }

    logout() {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
   
}
