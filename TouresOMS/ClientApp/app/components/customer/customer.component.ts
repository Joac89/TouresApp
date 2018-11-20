import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../services/loader.service';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'registration',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css', '../../style/general.css'],
    providers: [TokenService, CommonService]
})
export class CustomerComponent {
        registrationForm = new FormGroup({
        textName: new FormControl(''),
        textSurname: new FormControl(''),
        //textAddres: new FormControl(''),
        textPhone: new FormControl(''),
        textEmail: new FormControl(''),
        textPassword1: new FormControl(''),       
        textCreditCard: new FormControl(''),
        textDocument: new FormControl(''),
        selecttipoCliente: new FormControl(''),
    });
     
    cardtype: string = "";
    path: string = "";
    saved: boolean = false;
    typepsw: string = "password";
    error: any = { statusCode: 200 };
    newuser: string = btoa("undefined");

    private first: string = "";
    private last: string = "";
    private franchise: number = 0;
        
    id: string = "";
    user: any = {};    
    update: boolean = false;    
    authorize: boolean = false;

    constructor(@Inject('BASE_URL') baseUrl: string, private router: Router, private http: Http, private loaderService: LoaderService, private tokenService: TokenService, private authService: AuthService, private commonService: CommonService) {
        this.cardtype = "otra";
        this.path = baseUrl;    
            
    }

    searchForm = new FormGroup({
        textSearch: new FormControl(''),
        dateSearch: new FormControl(''),
        checkSearch: new FormControl(''),
        selectSearch: new FormControl(''),
    });

    get form() { return this.registrationForm.controls; }

    changeTypePws() {
        this.typepsw = (this.typepsw == "password") ? "text" : "password";
    }

    sendRegister() {
        this.loaderService.start();

        if (this.user.custId == undefined) {

            var json = {
                fname: this.registrationForm.value.textName,
                lname: this.registrationForm.value.textSurname,
                phonenumber: this.registrationForm.value.textPhone,
                email: this.registrationForm.value.textEmail,
                password: this.registrationForm.value.textPassword1,
                creditcardtype: this.franchise,
                creditcardnumber: this.registrationForm.value.textCreditCard,
                status: "1",
                docnumber: this.registrationForm.value.textDocument,
                username: this.getUsername(),
                address: "" //this.registrationForm.value.textAddres
                //clienttype: ""
            }
            var token = this.tokenService.getTokenHeader();

            this.http.post(this.path + "api/Customer/create", json, token).map(response => response.json()).subscribe(result => {
                this.saved = true;
                this.loaderService.end();     

                this.newuser = btoa(json.username);
                //this.authService.login(JSON.stringify(result));
            }, error => {
                this.loaderService.end();
                this.error = error;

                console.error(error);
            });
        }
        else {

            var jsonu = {
                custId: this.user.custId,
                fName: this.user.fName,
                lName: this.user.lName,
                phoneNumber: this.user.phoneNumber,
                email: this.user.email,
                password: this.user.password,
                creditCardType: this.user.creditCardType,
                creditCardNumber: this.user.creditCardNumber,
                status: "1",
                docNumber: this.user.docNumber,
                userName: this.getUsername(),
                address: "-",
                clientType: this.user.tipoCliente
            }
            var token = this.tokenService.getTokenHeader();            
           
            this.http.put(this.path + "api/customer/update", jsonu, token).map(response => response.json()).subscribe(result => {
                this.update = true;
                this.loaderService.end();

                this.searchForm.value.textSearch = jsonu.docNumber;

                this.getUserInfo();

                var object = {
                    code: 200,
                    message: "",
                    data: jsonu
                }
                this.authService.login(JSON.stringify(object.data));
            }, error => {
                this.loaderService.end();
                this.error = error;

                console.error(error);
            });
        }
    }

    getCreditCardType(value: number) {
        var card = this.commonService.identityCreditCard(value);

        this.cardtype = card.description;
        this.franchise = card.id;
    }

    getUsername() {       
        var first = this.registrationForm.value.textName;
        var last = this.registrationForm.value.textSurname;

        return this.commonService.generateUserName(first, last);
    }

    getYears() {       
        return this.commonService.getYears();
    }

    getMonths() {
        return this.commonService.getMonths();
    }

    getUserInfo() {
        console.log("prueba");
            this.loaderService.start();
            
            var token = this.tokenService.getTokenHeader();
        this.http.get(this.path + "api/Customer/get/" + this.searchForm.value.textSearch, token).map(response => response.json()).subscribe(result => {
                this.loaderService.end();
                this.user = result.data;

                this.user.creditType = this.commonService.getCreditCard(this.user.creditCardType);
                this.user.names = (this.user.fName + ' ' + this.user.lName).toUpperCase();

                this.reloadInfo();

            }, error => {
                this.loaderService.end();
                console.error(error);
            });
        }

    reloadInfo() {
            this.registrationForm.value.textName = this.user.fName;
            this.registrationForm.value.textSurname = this.user.lName;
            //this.updateForm.value.textAddres = "";
            this.registrationForm.value.textPhone = this.user.phoneNumber;
            this.registrationForm.value.textEmail = this.user.email;
            this.registrationForm.value.textPassword1 = "";
            this.registrationForm.value.textCreditCard = this.user.creditCardNumber;
            this.registrationForm.value.textDocument = this.user.docNumber;
            this.registrationForm.value.selecttipoCliente = this.user.tipoCliente;

            //this.user.address = "";
            this.user.password = "";

            this.getCreditCardType(<number>this.user.creditCardNumber);
    }
}