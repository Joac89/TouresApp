import { NgModule } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
import { CommonService } from '../app/services/common.service';
import { StoreService } from '../app/services/store.service';
import { LoaderService } from '../app/services/loader.service';
import { AuthService } from '../app/services/auth.service';
import { LocalStorageService } from '../app/services/localstorage.service';
import { GuardService } from '../app/services/guard.service';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppModuleShared
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        LoaderService,
        AuthService,
        StoreService,
        CommonService,
        LocalStorageService,
        GuardService,
        JwtHelper
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
