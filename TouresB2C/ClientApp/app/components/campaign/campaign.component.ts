import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'counter',
    templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.css', '../../style/general.css']
})
export class CampaignComponent {
    campaign: any = {};
    path: string = "";

    constructor(@Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private loaderService: LoaderService) {
        this.path = baseUrl;

        this.getCampaign();
    }

    getCampaign() {
        this.loaderService.start();

        this.http.get(this.path + "api/campaign").map(response => response.json()).subscribe(result => {
            this.campaign = result;

            this.loaderService.end();
        }, error => console.error(error));
    }

    getImage(image: string) {
        return "url(" + this.path + image + ")";
    }

    getImageLink(image: string) {
        return this.path + image;
    }
}
