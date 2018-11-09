import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { StoreService } from '../../services/store.service';
import { LoaderService } from '../../services/loader.service';
import { CheckControl } from '../../models/check.control';
import { Product } from '../../models/product.model';
import { City } from '../../models/city.model';
import { Country } from '../../models/country.model';
import { TypeSpect } from '../../models/typeSpect.model';
import { TypeTrans } from '../../models/typeTrans.model';
import { TypeHospedaje } from '../../models/typeHospedaje.model';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css', '../../style/general.css'],
    providers: [AuthService, StoreService, DatePipe]
    
})
export class ProductComponent {
    search: any = {};
    aux: any = {};
    product: any = {};
    textSearch: string = "";
    typeSearch: number = 0;
    current: any = {};
    pag: number = 0;
    endPage: boolean = false;
    path: string = "";

    citys: City[] = [
        { id: 1, name: 'Bogota' },
        { id: 2, name: 'Medellin' },
        { id: 3, name: 'Barranquilla' },
        { id: 4, name: 'Cali' },
        { id: 5, name: 'Madrid' },
        { id: 6, name: 'Nueva York' },
        { id: 7, name: 'Paris' },
        { id: 11027, name: 'Berlin' }
    ];

    country: Country[] = [
        { id: 1, name: 'Colombia' },
        { id: 2, name: 'España' },
        { id: 3, name: 'USA' },
        { id: 4, name: 'Francia' },
        { id: 5, name: 'Alemania' }
    ];

    typespect: TypeSpect[] = [
        { id: 1, name: 'Nacional' },
        { id: 2, name: 'Internacional' },        
    ];

    typetrans: TypeTrans[] = [
        { id: 1, name: 'Aereo' },
        { id: 2, name: 'Terrestre' },
    ];

    typehospedaje: TypeHospedaje[] = [
        { id: 1, name: 'Nacional' },
        { id: 2, name: 'Internacional' },
    ];


    constructor(private datePipe: DatePipe, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private storeService: StoreService, private loaderService: LoaderService) {
        this.path = baseUrl;

        this.route.params.subscribe(params => {
            this.textSearch = params['search'];
            this.typeSearch = params['type'];
            this.search.data = [];

            if (this.textSearch) this.getSearch();
        });


    }

    //get form() { return this.productForm.controls; }

    transformDate(date: string) {
        return this.datePipe.transform(new Date(date), 'yyyy-MM-dd');
    }

    getSearch(inner: boolean = false) {
        this.loaderService.start();
        this.pag += 1;

        if (inner && this.pag > 1) {
            this.textSearch = btoa(this.textSearch);
        } else {
            this.pag = 1;
            this.endPage = false;
        }

        this.http.get(this.path + "api/product/search/" + this.textSearch + "/" + this.typeSearch + "/" + this.pag).map(response => response.json()).subscribe(result => {
            this.aux = result;
            this.product = result.data[0];

            this.product.fechaEspectaculo = this.transformDate(this.product.fechaEspectaculo);

            console.log(this.product);

            if (this.aux.data.length == 0 || this.aux.data.length < 4) this.endPage = true;

            var carts = this.storeService.getItemsInCart();
            for (var i = 0; i < this.aux.data.length; ++i) {
                var find = carts.find(x => x.id == this.aux.data[i].id);
                if (find) {
                    this.aux.data[i].inCart = true;
                    this.aux.data[i].countCart = find.count;
                }
            }
            for (var i = 0; i < this.aux.data.length; ++i) {
                this.search.data.push(this.aux.data[i]);
            }

            //console.log(this.product.fechaEspectaculo);

            //this.productForm.value.textEspectaculo = this.product[0].espectaculo;

            //console.log(this.productForm.value.textEspectaculo);

            this.loaderService.end();

        }, error => {
            this.loaderService.end();
            console.error(error);
        });

        this.textSearch = atob(this.textSearch);
    }

    getDetail(item: any) {
        this.current = item;
        this.current.count = 1;
    }

    update() {
        var carts = this.storeService.getItemsInCart();
        if (this.search.data) {
            for (var i = 0; i < this.search.data.length; ++i) {
                var find = carts.find(x => x.id == this.search.data[i].id);
                if (find) {
                    this.search.data[i].inCart = true;
                    this.search.data[i].countCart = find.count;
                }
            }
        }
    }

    //####################################################//

    check = new CheckControl(1, "Sin filtro");

    searchForm = new FormGroup({
        textSearch: new FormControl(''),
        dateSearch: new FormControl(''),
        checkSearch: new FormControl(''),
    });

    productForm = new FormGroup({
        textNombreProduct: new FormControl(''),
        textDescripProduct: new FormControl(''),
        fechaEspectaculo: new FormControl(''),
        fechaSalida: new FormControl(''),
        fechaRegreso: new FormControl(''),
        textEspectaculo: new FormControl(''),
        selectCiudad: new FormControl(''),
        selectCountry: new FormControl(''),
        textPrecioCiudad: new FormControl(''),
        textRutaimg: new FormControl(''),
        fileUImage: new FormControl(''),        
        textPrecioProducto: new FormControl(''),
        ////
        selectTipoEspectaculo: new FormControl(''),
        textNombreEspectaculo: new FormControl(''),
        textPrecioEspectaculo: new FormControl(''),
        //
        selectTipoTransporte: new FormControl(''),
        textNombreTransporte: new FormControl(''),
        textPrecioTrasporte: new FormControl(''),
        //
        selectTipoHospedaje: new FormControl(''),
        textNombreHospedaje: new FormControl(''),
        textPrecioHospedaje: new FormControl('') 
    });

    error: any = { statusCode: 200 };

    sendSearch() {
        var text = this.searchForm.value.textSearch;
        var id = this.check.id;

        this.searchForm.reset();
        this.changeFilter(1, "Sin filtro");
        this.router.navigate(["product",
            {
                search: btoa(text),
                type: id
            }
        ]);
    }

    get form() { return this.productForm.controls; }

    sendProduct() {

        this.loaderService.start();

        //    }, error => {
        //    this.loaderService.end();
        //    this.error = error;

        //    console.error(error);
        //});
    }

    changeFilter(id: number, text: string) {
        this.check.id = id;
        this.check.text = text;
    }

    deleteProduct(id: number) {
        this.loaderService.start();
                
        this.http.delete(this.path + "api/Product/delete/" + id).map(response => response.json()).subscribe(result => {

            // if (result.code == 200) 
            //this.sendSearch();

            this.loaderService.end();
        }, error => {
            this.loaderService.end();
            console.error(error);
        });

    }

    reloadInfoProduct() {

        console.log(this.product.espectaculo);

        this.productForm.value.textEspectaculo = this.product.espectaculo;

        console.log(this.productForm.value.textEspectaculo);
        
    }

}
