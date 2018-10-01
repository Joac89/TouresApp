import { Injectable, Optional } from '@angular/core';

@Injectable()
export class LocalStorageService {
    private item: string;
    private json: string = "";
    private crypt: boolean = true;

    constructor(item_: string, @Optional() crypt_: boolean = true) {
        this.item = item_;
        this.crypt = false; //crypt_;
    }

    save(data: any, stringify: boolean = true): void {
        var item = this.item; // this.encrypt(this.item);

        if (typeof window !== 'undefined') {

            if (stringify) {
                this.json = JSON.stringify(data);
            } else {
                this.json = data;
            }
            this.json = this.crypt ? this.encrypt(this.json) : this.json;

            localStorage.setItem(item, this.json);
        }
    }

    get(): string {
        var item = this.item;// this.encrypt(this.item);
        var resp = "";

        if (typeof window !== 'undefined') {
            var result = localStorage.getItem(item) || "";
            return result != "" ? (this.crypt ? this.decrypt(result) : result) : "";
        } else {
            return "";
        }
    }

    clear(): void {
        var item = this.item; // this.encrypt(this.item);
        if (typeof window !== 'undefined') localStorage.removeItem(item);
    }

    private encrypt(data: string) {
        return btoa(data);
    }

    private decrypt(data: string) {
        return atob(data);
    }
}