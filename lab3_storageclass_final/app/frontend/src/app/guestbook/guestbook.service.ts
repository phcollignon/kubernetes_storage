import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { GuestbookData } from './guestbook.component';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class GuestbookService {

  private config: any;
  constructor(private http: HttpClient, private configService: ConfigService) {
    
  }

  public getGuestbook(): Observable<GuestbookData[]> {
    return new Observable(obs => {
      this.configService.fetchConfig("backend_uri").subscribe(conf => {
        this.http.get<GuestbookData[]>(conf).subscribe(data => obs.next(data))
      })
    }) ;
  }

  public postGuestbook(guestbookData: GuestbookData): Observable < Object > {

    return new Observable(obs => {
      this.configService.fetchConfig("backend_uri").subscribe(conf => {
        this.http.post(conf, guestbookData).subscribe(data => obs.next(data))
      })
    }) ;

  }


}
