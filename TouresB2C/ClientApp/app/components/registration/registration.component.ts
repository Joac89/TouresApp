import { Component, Inject } from '@angular/core';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css', '../../style/general.css']
})
export class RegistrationComponent {

    cardtype: string = "";

    constructor() {
        this.cardtype = "Visa";
    }

    getYears() {
        var years = [];
        for (var i = 2018; i < 2027; ++i) {
            years.push({
                id: i,
                description: i
            });
        }

        return years;
    }

    getMonths() {
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