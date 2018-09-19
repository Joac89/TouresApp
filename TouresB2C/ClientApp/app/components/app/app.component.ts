import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', '../../style/general.css'],
    providers: [LoaderService]
})
export class AppComponent implements OnDestroy {
    showLoader: boolean = false;    
    subscription: Subscription;

    constructor(private router: Router, private loaderService: LoaderService) {
        this.subscription = this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }

    ngOnDestroy() {
       
        this.subscription.unsubscribe();
    }

    validateRoute() {
        return this.router.url != '/' ? true : false;
    }
}
