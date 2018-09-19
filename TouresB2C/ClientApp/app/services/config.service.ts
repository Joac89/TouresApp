import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    constructor() {
    }

    countUp(item: number): number {
        item < 99 ? item += 1 : 99;
        return item;
    }

    countDown(item: number): number {
        item > 0 ? item -= 1 : 0;
        return item;
    }
}