import { Component, Inject, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../../services/loader.service';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', '../../style/general.css'],
    providers: [LoaderService, TokenService]
})
export class AppComponent implements OnDestroy {
    showLoader: boolean = false;
    subscription: Subscription;
    path: string = "";

    constructor(@Inject('BASE_URL') baseUrl: string, private router: Router, private http: Http, private loaderService: LoaderService, private tokenService: TokenService) {
        this.path = baseUrl;
        this.subscription = this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });

        if (typeof window !== 'undefined') {
            this.getTokenServices();
        }
    }

    getTokenServices() {

        this.http.post(this.path + "api/token", null).map(response => response.json()).subscribe(result => {
            if (result.code == 200) {
                this.tokenService.saveToken(result.data);
            } else {
                console.error(result.message);
            }

        }, error => {
            console.error(error);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    validateRoute() {
        return this.router.url != '/' ? true : false;
    }
}
