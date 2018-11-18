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

    inputFile: any;
    imageSrc = '';    

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
        { id: 'Colombia', name: 'Colombia' },
        { id: 'España', name: 'España' },
        { id: 'USA', name: 'USA' },
        { id: 'Francia', name: 'Francia' },
        { id: 'Alemania', name: 'Alemania' }
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
        this.imageSrc = "";

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
            this.product.fechaSalida = this.transformDate(this.product.fechaSalida);
            this.product.fechaLlegada = this.transformDate(this.product.fechaLlegada);

            console.log(this.product);
                       
            if (this.aux.data.length == 0 || this.aux.data.length < 4) this.endPage = true;
                        
            for (var i = 0; i < this.aux.data.length; ++i) {
                this.search.data.push(this.aux.data[i]);
            }
                        
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
        selectProducto: new FormControl(''),
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
        var id: any ;
       
        if (this.searchForm.value.selectProducto == 2) {
            this.check.id = 2
            id = this.check.id;
        }
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

        var json = {
            id: 0,
            nombre: this.productForm.value.textNombreProduct,
            espectaculo: this.productForm.value.textEspectaculo,
            fechaSalida: this.productForm.value.fechaSalida,
            cuidadEspectaculo: this.productForm.value.selectCiudad,
            fechaLlegada: this.productForm.value.fechaRegreso,
            fechaEspectaculo: this.productForm.value.fechaEspectaculo,
            tipoEspectaculo: this.productForm.value.selectTipoEspectaculo,
            tipoHospedaje: this.productForm.value.selectTipoHospedaje,
            tipoTransporte: this.productForm.value.selectTipoTransporte,
            rutaImagen: "/products/" + this.file.name,
            image: this.imageSrc,
            route: 0,         
                        
        }
        
        if (this.product.id !== undefined) {

            json.id = this.product.id;

            if (json.rutaImagen == "")
                json.rutaImagen = this.product.rutaImagen,

            //console.log(this.product);
            console.log(json);
            this.http.put(this.path + "api/Product/update", json, this.product.id).map(response => response.json()).subscribe(result => {
                //this.saved = true;
                this.loaderService.end();

                //this.newprod = btoa(json.username);
                //this.authService.login(JSON.stringify(result));
            }, error => {
                this.loaderService.end();
                this.error = error;

                console.error(error);
            });
        
        }
        else
        {
            
            this.http.post(this.path + "api/Product/create", json).map(response => response.json()).subscribe(result => {
                //this.saved = true;
                this.loaderService.end();

                //this.newprod = btoa(json.username);
                //this.authService.login(JSON.stringify(result));
            }, error => {
                this.loaderService.end();
                this.error = error;

                console.error(error);
            });
        }
                    // if (result.code == 200) 
            this.product.image = "";
           

           
       
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

    file: any;

    handleInputChange(e: any) {
        this.file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        const pattern = /image-*/;
        const reader = new FileReader();
        if (!this.file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(this.file);
    }
    _handleReaderLoaded(e: any) {
        const reader = e.target;
        this.imageSrc = reader.result;
    }

    clearProduct() {
        this.productForm.reset()
        this.product = {};
    }


}
