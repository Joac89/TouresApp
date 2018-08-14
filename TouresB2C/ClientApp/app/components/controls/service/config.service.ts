import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    pathImages: string | "";

    constructor() {
        this.pathImages = "../../../..";
    }
}