import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  USER_API_BASE_URL = environment.userApiUrl;
  PICTURES_API_BASE_URL = environment.picturesApiUrl;

  private getAuthorizationHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer test123'
    });
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  makeHttpPostCall(url, body, options): Promise<any> {
    return new Promise(async (resolved, reject) => {
      const subscription = await this.httpClient.post(url, body, { headers: options }).subscribe(
        (data) => {
          console.log(data);
          subscription.unsubscribe();
          resolved(data);
        },
        error => {
          console.error(error);
          subscription.unsubscribe();
          reject(error);
        }
      );
    });
  }

  makeHttpGetCall(urlPath, params) {
    const headers = this.getAuthorizationHeader();
    return new Promise((resolved, reject) => {
      const subscription = this.httpClient.get(urlPath, {
        params, headers
      }).subscribe(
        (data) => {
          console.log(data);
          subscription.unsubscribe();
          resolved(data);
        },
        error => {
          console.error(error);
          subscription.unsubscribe();
          reject(error);
        }
      );
    });
  }

  getAvailableStatus(results = 10): Promise<any> {
    const url = this.USER_API_BASE_URL + '?results=' + results;
    const params = new HttpParams();
    return this.makeHttpGetCall(url, params);
  }

  getUsersList(pageNo = 1, results = 10): Promise<any> {
    const url = this.USER_API_BASE_URL + '?page=3' + pageNo + '&results=' + results;
    const params = new HttpParams();
    return this.makeHttpGetCall(url, params);
  }

  getPicturesList(pageNo = 1, limit = 10): Promise<any> {
    const url = this.PICTURES_API_BASE_URL + 'v2/list?page=' + pageNo + '&limit=' + (limit > 0 ? limit : 1);
    const params = new HttpParams();
    return this.makeHttpGetCall(url, params);
  }

}
