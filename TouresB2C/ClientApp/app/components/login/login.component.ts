import { Component, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoaderService } from '../../services/loader.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../../style/general.css'],
    providers: [TokenService]
})
export class LoginComponent {
    logForm = new FormGroup({
        textUsername: new FormControl(''),
        textPassword: new FormControl('')
    });
    path: string = "";
    error: any = { statusCode: 200 };
    newusername: string = "";

    constructor(@Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private tokenService: TokenService, private authService: AuthService, private loaderService: LoaderService) {
        this.path = baseUrl;

        //this.route.queryParams.subscribe(params => {
        //    var paramuser = params["user"];
        //    this.newusername = paramuser ? atob(paramuser) : "";
        //});

        this.route.params.subscribe(params => {
            var paramuser = params["user"];
            this.newusername = paramuser ? atob(paramuser) : "";
        });
    }

    get form() { return this.logForm.controls; }

    sendLogin() {
        this.loaderService.start();

        var json = {
            username: this.logForm.value.textUsername,
            password: this.logForm.value.textPassword
        }
        var header = this.tokenService.getTokenHeader();

        this.http.post(this.path + "api/customer/login", json, header).map(response => response.json()).subscribe(result => {
            this.loaderService.end();

            if (result.code == 200) {
                result.data.status = true;

                this.authService.login(JSON.stringify(result.data));
                this.router.navigate(['home']);
            }
        }, error => {
            this.loaderService.end();
            this.error = error;
        });
    }
}
