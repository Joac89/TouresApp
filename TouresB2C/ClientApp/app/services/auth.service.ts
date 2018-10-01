import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
//import { Subject } from 'rxjs/Subject';
import { LocalStorageService } from './localstorage.service';

@Injectable()
export class AuthService {
    //auth: Subject<boolean> = new Subject<boolean>();
    private storage: LocalStorageService;

    constructor() {
        this.storage = new LocalStorageService("login");
    }

    login(data: string) {
        this.storage.save(data, false);
        //this.auth.next(true);
    }

    logout() {
        this.storage.clear();
        //this.auth.next(false);
    }

    //status(): Observable<boolean> {
    //    var log = this.storage.get() == "true" ? true : false;
    //    if (!log) {
    //        this.auth.next(false);
    //    }
    //    return this.auth.asObservable();
    //}

    get(): string {
        return this.storage.get();
    }

    isAuthorized(): boolean {
        return this.storage.get() != "" ? true : false;
    }
}