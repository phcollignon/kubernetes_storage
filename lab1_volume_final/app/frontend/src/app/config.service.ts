import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {
  }

  public fetchConfig(key: String): Observable<any> {
    return this.http.get("./assets/config/"+key, {
      observe: 'body',
      responseType: "text"
    })
  }

}
