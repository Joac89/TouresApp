import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {
    //public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    status: Subject<boolean> = new Subject<boolean>();

    constructor() {
    }

    start() {
         this.status.next(true);
    }

    end() {
        this.status.next(false);
    }

    get(): Observable<boolean> {
        return this.status.asObservable();
    }
}