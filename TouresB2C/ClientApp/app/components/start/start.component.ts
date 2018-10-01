import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { CheckControl } from '../../models/check.control';

@Component({
    selector: 'home',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
})
export class StartComponent {
    check = new CheckControl(0, "Sin filtro");
    searchForm = new FormGroup({
        textSearch: new FormControl(''),
        dateSearch: new FormControl(''),
        checkSearch: new FormControl(''),
    });

    constructor(private router: Router, private http: Http) {
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