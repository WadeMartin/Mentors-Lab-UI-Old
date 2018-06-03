import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { saveAs } from 'file-saver';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FileService {
   
    constructor(private http: HttpClient,private httpNormal: Http, @Inject('BASE_URL') private baseUrl: string) { }

    upload(files, parameters){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        // let headers = new HttpHeaders();
        // let options : any = ({ headers: headers });
        options.params = parameters;
        return  this.httpNormal.post(this.baseUrl + '/api/fileupload', files, options)
                 .map(response => response)
                 .catch(error => Observable.throw(error));

    }

    UploadBulk(files, parameters){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        options.params = parameters;
        return  this.httpNormal.post(this.baseUrl + '/api/fileupload/UploadBulk', files, options)
                 .map(response => response)
                 .catch(error => Observable.throw(error));

    }

//     GetCVDocument(parameters){
//         let headers = new Headers();
//         let options = new RequestOptions({ headers: headers });
//         this.http.post(this.baseUrl + '/api/fileupload/GetCVDocument',parameters, { responseType: 'blob' }).subscribe(blob => {
//            saveAs(blob, parameters.filePath, {
//               type: 'text/plain;charset=windows-1252' // --> or whatever you need here
//            })
//         },
//     err =>
// {
//     // do some error handling here
// })
    //}

    public downloadFile() {
        
     }
}
