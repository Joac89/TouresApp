import { Injectable, Inject } from '@angular/core';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { LocalStorageService } from './localstorage.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class TokenService {
    private storage: LocalStorageService;
    path: string = "";

    constructor(@Inject('BASE_URL') baseUrl: string, private jwtHelper: JwtHelper, private router: Router, private http: Http) {
        this.storage = new LocalStorageService("token");
    }

    removeToken(): void {
        this.storage.clear();
    }

    saveToken(token: string): void {
        this.storage.save(token, false);
    }

    getToken() {
        return this.storage.get();
    }

    getTokenHeader(): RequestOptions {
        var headers = new Headers();
        var token = this.getToken();
        var success = false;

        if (this.jwtHelper.isTokenExpired(token)) {
          
            this.http.post(this.path + "api/token", null).map(response => response.json()).subscribe(result => {
                if (result.code == 200) {

                    this.saveToken(result.data);
                    success = true;
                }
            }, error => {
                console.error(error);
            });

        }
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Bearer " + success ? this.getToken() : "");

        var request = new RequestOptions({ headers: headers });
        return request;
    }
}