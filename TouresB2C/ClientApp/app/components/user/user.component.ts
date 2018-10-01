import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../services/loader.service';
import { TokenService } from '../../services/token.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css', '../../style/general.css'],
    providers: [CommonService, TokenService, AuthService]
})
export class UserComponent {
    updateForm = new FormGroup({
        textName: new FormControl(''),
        textSurname: new FormControl(''),
        //textAddres: new FormControl(''),
        textPhone: new FormControl(''),
        textEmail: new FormControl(''),
        textPassword1: new FormControl(''),
        textCreditCard: new FormControl(''),
        textDocument: new FormControl('')
    });
    path: string = "";
    id: string = "";
    user: any = {};
    cardtype: string = "Otra";
    typepsw: string = "password";
    update: boolean = false;
    error: any = { statusCode: 200 };
    authorize: boolean = false;

    constructor(@Inject('BASE_URL') baseUrl: string, private router: Router, private authService: AuthService, private tokenService: TokenService, private commonService: CommonService, private route: ActivatedRoute, private http: Http, private loaderService: LoaderService) {
        this.path = baseUrl;

        if (typeof window !== 'undefined') {

            if (this.authService.isAuthorized()) {
                var info = JSON.parse(this.authService.get());

                this.authorize = true;
                this.getUserInfo(info.data.docNumber);
            }
        }
    }

    get form() { return this.updateForm.controls; }

    getUserInfo(id: string) {
        this.loaderService.start();
        this.id = id;

        var token = this.tokenService.getTokenHeader();
        this.http.get(this.path + "api/Customer/get/" + this.id, token).map(response => response.json()).subscribe(result => {
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

    changeTypePws() {
        this.typepsw = (this.typepsw == "password") ? "text" : "password";
    }

    sendUpdate() {
        this.loaderService.start();

        var json = {
            custid: this.user.custId,
            fname: this.user.fName,
            lname: this.user.lName,
            phonenumber: this.user.phoneNumber,
            email: this.user.email,
            password: this.user.password,
            creditcardtype: this.user.creditCardType,
            creditcardnumber: this.user.creditCardNumber,
            status: "1",
            docnumber: this.user.docNumber,
            username: this.getUsername(),
            address: "-" //this.registrationForm.value.textAddres
        }
        var token = this.tokenService.getTokenHeader();

        console.log(json);

        this.http.put(this.path + "api/registration/update", json, token).map(response => response.json()).subscribe(result => {
            this.update = true;
            this.loaderService.end();

            this.getUserInfo(json.docnumber);

            var object = {
                code: 200,
                message: "",
                data: json
            }
            this.authService.login(JSON.stringify(object));
        }, error => {
            this.loaderService.end();
            this.error = error;

            console.error(error);
        });
    }

    private getUsername() {
        var first = this.updateForm.value.textName;
        var last = this.updateForm.value.textSurname;

        return this.commonService.generateUserName(first, last);
    }

    private getCreditCardType(value: number) {
        var card = this.commonService.identityCreditCard(value);

        this.cardtype = card.description;
        this.user.creditCardType = card.id;
    }

    private reloadInfo() {
        this.updateForm.value.textName = this.user.fName;
        this.updateForm.value.textSurname = this.user.lName;
        //this.updateForm.value.textAddres = "";
        this.updateForm.value.textPhone = this.user.phoneNumber;
        this.updateForm.value.textEmail = this.user.email;
        this.updateForm.value.textPassword1 = "";
        this.updateForm.value.textCreditCard = this.user.creditCardNumber;
        this.updateForm.value.textDocument = this.user.docNumber;

        //this.user.address = "";
        this.user.password = "";

        this.getCreditCardType(<number>this.user.creditCardNumber);
    }
}
