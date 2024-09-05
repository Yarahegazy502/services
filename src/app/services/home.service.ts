import { environment } from '../../environments/environment';
import { roots } from '../shared/configs/endPoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiUrl: string = environment?.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getMembershipsData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.memberships}`);
  }
}
