import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { LocalStorageService } from './localstorage.service';

@Injectable()
export class StoreService {
    private carts: Product[] = [];
    private storage: LocalStorageService;
    private aux: Product[] = [];

    constructor() {
        this.storage = new LocalStorageService();
        this.storage.define("carts");
    }

    clearItemsCart(): void {
        this.storage.clear();
    }

    addItemInCart(product: Product): void {
        var stor = this.storage.get();

        this.carts = stor != "" ? <Product[]>JSON.parse(stor) : [];
        this.carts.push(product);
        this.storage.save(this.carts);
    }

    getItemsInCart(): Product[] {
        var stor = this.storage.get();

        this.carts = stor != "" ? <Product[]>JSON.parse(stor) : [];
        return this.carts;
    }

    removeItemInCart(id: number): void {
        var index = this.getItemIndex(id);

        this.remove(this.carts, index);
    }

    updateItemInCart(product: Product) {
        var index = this.getItemIndex(<number>product.id);

        if (index > -1) {
            this.carts[index].id = product.id;
            this.carts[index].name = product.name;
            this.carts[index].price = product.price;
            this.carts[index].count = product.count;

            this.storage.save(this.carts);
        }
    }

    newItemCart(): Product {
        return {
            id: 0,
            name: "",
            price: 0,
            count: 0,
            extra: {
                tipoHabitacion: "",
                FechaSalida: "",
                FechaLlegada: "",
                modalidadTransporte: "",
                pais: "",
                precioHotel: ""
            }
        };
    }

    newOrderCart(): Order {
        return {
            id: 0,
            price: 0,
            count: 0,
            state: 0,
            stateName: ""

            /*ordId: 0,
            custId: 0,
            ordenDate: new Date(),
            price: 0,
            quantity: 0,
            lItem: []*/
        }
    }

    private getItemIndex(id: number): number {
        var index = -1;
        var stor = this.storage.get();

        this.carts = stor != "" ? <Product[]>JSON.parse(stor) : [];
        if (this.carts) index = this.carts.findIndex(x => id === x.id);

        return index;
    }

    private remove(data: Product[], index: number): void {
        var c = 0;

        if (index > -1) {
            data.slice(index, index + 1);
            data.forEach(x => {
                if (c != index) this.aux.push(x);
                c += 1;
            });
            data = this.aux;

            this.aux = [];
            this.storage.save(data);
        }
    }
}


















//### declare
//private storage: Storage;
//### implement constructor 
//this.storage = new Storage("carts");
//###
//export class Storage {
//    private item: string;
//    private aux: Product[] = [];
//    constructor(item_: string) {
//        this.item = item_;
//    }
//    save(data: Product[]): void {
//        if (typeof window !== 'undefined') {
//            var json = this.encrypt(JSON.stringify(data));
//            localStorage.setItem("carts", json);
//        }
//    }
//    get(): Product[] {
//        if (typeof window !== 'undefined') {
//            var result = localStorage.getItem(this.item) || "";
//            return result != "" ? <Product[]>JSON.parse(this.decrypt(result)) : [];
//        } else {
//            return [];
//        }
//    }
//    remove(data: Product[], index: number): void {
//        var c = 0;
//        if (index > -1) {
//            data.slice(index, index + 1);
//            data.forEach(x => {
//                if (c != index) this.aux.push(x);
//                c += 1;
//            });
//            data = this.aux;
//            this.aux = [];
//            var json = this.encrypt(JSON.stringify(data));
//            localStorage.setItem("carts", json);
//        }
//    }
//    clear(): void {
//        if (typeof window !== 'undefined') localStorage.removeItem(this.item);
//    }
//    encrypt(data: string) {
//        return btoa(data);
//    }
//    decrypt(data: string) {
//        return atob(data);
//    }
//}