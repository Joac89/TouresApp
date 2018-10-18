import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from './localstorage.service';

@Injectable()
export class TokenService {
    private storage: LocalStorageService;
    path: string = "";

    constructor(@Inject('BASE_URL') baseUrl: string, private jwtHelper: JwtHelper, private http: Http) {
        this.storage = new LocalStorageService();
        this.storage.define("token");
        this.path = baseUrl;
    }

    removeToken(): void {
        this.storage.clear();
    }

    saveToken(token: string): void {
        this.storage.save(token, false);
    }

    getToken(): string {
        return this.storage.get();
    }

    getTokenHeader(): RequestOptions {
        var headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Bearer " + this.getToken());

        var request = new RequestOptions({ headers: headers });
        return request;
    }
}