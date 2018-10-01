import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable()
export class GuardService implements CanActivate {    
    constructor(private jwtHelper: JwtHelper, private router: Router) {       
    }

    canActivate() {
        var storage = new AuthService();
        var token = storage.isAuthorized();

        if (token) {
            return true;
        }
        this.router.navigate(["login"]);
        return false;

        //var storage = new TokenService();
        //var token = storage.getToken();

        //console.log(token);

        //if (token && !this.jwtHelper.isTokenExpired(token)) {
        //    return true;
        //}
        //this.router.navigate(["login"]);
        //return false;
    }
}