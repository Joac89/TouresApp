import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { CreditCard } from '../models/creditcard.model';

@Injectable()
export class CommonService {

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

    generateUserName(name_: string, surname_: string) {
        var first = name_;
        var last = surname_;
        var snComplex = last.indexOf(' ') >= 0 ? true : false;
        var surname = snComplex ? last.split(' ')[0] + last.split(' ')[1].substring(0, 1) : last;
        var username = snComplex ? first.substring(0, 1) + surname : first.substring(0, 2) + surname;

        return username;
    }

    identityCreditCard(value: number): CreditCard {
        var result = new CreditCard();

        var found = false;
        var tcs = [
            { id: 1, type: 'ax', desc: "American Express", regex: '3[47][0-9]{13}' },
            { id: 2, type: 'mc', desc: "Mastercard", regex: '5[1-5][0-9]{14}' },
            { id: 3, type: 'vi', desc: "Visa", regex: '4(?:[0-9]{12}|[0-9]{15})' },
            { id: 4, type: 'dc', desc: "Diners Club", regex: '3(?:0[0-5][0-9]{11}|[68][0-9]{12})' },
        ]
        tcs.forEach(x => {
            var reg = new RegExp(x.regex);
            var val = reg.test(value.toString());

            if (val && !found) {
                found = true;
                result.description = x.desc;
                result.id = x.id;
                result.alias = x.type;
            }
        });
        if (!found) result.description = "Otra";

        return result;
    }

    getCreditCard(id: number): string {
        var result = "Otra";

        var found = false;
        var tcs = [
            { id: 1, type: 'ax', desc: "American Express", regex: '3[47][0-9]{13}' },
            { id: 2, type: 'mc', desc: "Mastercard", regex: '5[1-5][0-9]{14}' },
            { id: 3, type: 'vi', desc: "Visa", regex: '4(?:[0-9]{12}|[0-9]{15})' },
            { id: 4, type: 'dc', desc: "Diners Club", regex: '3(?:0[0-5][0-9]{11}|[68][0-9]{12})' },
        ]
        tcs.forEach(x => {
            if (x.id == id) {
                result = x.desc;
            }
        });
      
        return result;
    }


    getYears(): any[] {
        var years = [];
        for (var i = 2018; i < 2027; ++i) {
            years.push({
                id: i.toString().substring(2, 4),
                description: i
            });
        }
        return years;
    }

    getMonths(): any[] {
        return [
            {
                id: "01",
                description: "Enero"
            },
            {
                id: "02",
                description: "Febrero"
            },
            {
                id: "03",
                description: "Marzo"
            },
            {
                id: "04",
                description: "Abril"
            },
            {
                id: "05",
                description: "Mayo"
            },
            {
                id: "06",
                description: "Junio"
            },
            {
                id: "07",
                description: "Julio"
            },
            {
                id: "08",
                description: "Agosto"
            },
            {
                id: "09",
                description: "Septiembre"
            },
            {
                id: "10",
                description: "Octubre"
            },
            {
                id: "11",
                description: "Noviembre"
            },
            {
                id: "12",
                description: "Diciembre"
            },
        ];
    }
}