import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
/*
  Generated class for the BasicServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BasicServiceProvider {

  constructor(public http: Http) {
     this.host_url ="http://192.168.58.102:8080";
  }
  CreateHeader(): any
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let token = localStorage.getItem('token');
    if (token)
    {
      headers.append('Authorization', token);
    }

    return new RequestOptions({headers: headers});
  }

  Get(uri: string): Promise<any>
  {
    let url = this.host_url + '/' + uri;   
    let options = this.CreateHeader();

    return this.http.get(url,options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  Post(data: any, uri?: string): Promise<any>
  {    
    let url = this.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }
    
    let options = this.CreateHeader();
    return this.http.post(url, data,options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  Put(data: any, uri?: string): Promise<any>
  {    
    let url = this.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }
    
    let options = this.CreateHeader();
    return this.http.put(url, data,options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  Delete(data: any, uri?: string): Promise<any>
  {    
    let url = this.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }
    
    let options = this.CreateHeader();
    return this.http.delete(url,options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  private extractData(res: Response) 
  {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) 
  {
    let errMsg: string;
    if (error instanceof Response) 
    {
      errMsg = `${error.status} - ${error.statusText}`;
    } 
    else 
    {
      errMsg = error.message ? error.message : error.toString();
    }

    //console.error(errMsg);
    return Promise.reject(errMsg);
  }


  private host_url:string;
}
