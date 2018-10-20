import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css', '../../style/general.css']
})
export class LogoutComponent {

    constructor(private authService: AuthService, private loaderService: LoaderService) {
        if (typeof window !== 'undefined') {
            this.logout();
        }
    }

    logout() {
        this.loaderService.start();
        this.authService.logout();
        this.loaderService.end();
    }
}
