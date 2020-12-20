import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private API_URL = "http://www.colr.org/json/color/random";

  getColors():Observable<any>{ 

    // Since the get request is a static URL the value gets cached,
    // at first I tried adding a header with cache control however the server rejected this
    // the fastest solution I thought off was to append a random string to the end of the URL to trick the browser/



    // const httpHeaders: HttpHeaders = new HttpHeaders({
    //   'Cache-Control': 'no-store, no-cache'
    //   // 'Pragma': 'no-cache'
    //   });

    return this.httpClient.get<any>(this.API_URL+"?r="+this.createRandomString(10),
      // {headers: httpHeaders}
      ).pipe(
       tap(data => console.log(data)), // View Colors in the console
    );
  }

  createRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
}
