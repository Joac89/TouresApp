import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
    selector: 'home',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
})
export class StartComponent {
    check = new checkControl(0, "Sin filtro");
    searchForm = new FormGroup({
        textSearch: new FormControl(''),
        dateSearch: new FormControl(''),
        checkSearch: new FormControl(''),
    });

    constructor(private router: Router) {
    }

    sendSearch() {
        var text = this.searchForm.value.textSearch;
        var id = this.check.id;

        this.searchForm.reset();
        this.changeFilter(0, "Sin filtro");
        this.router.navigate(["product",
            {
                search: btoa(text),
                type: id
            }
        ]);
    }

    changeFilter(id: number, text: string) {
        this.check.id = id;
        this.check.text = text;
    }
}

export class checkControl {
    id: number | undefined;
    text: string | undefined;

    constructor(id_: number, text_: string) {
        this.id = id_;
        this.text = text_;
    }
}