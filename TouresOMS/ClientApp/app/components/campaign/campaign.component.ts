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
    products: any = {};
    selectedCampaign: boolean = false;
    campaignId: number = 0;
    current: any = {};

    constructor(@Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private loaderService: LoaderService) {
        this.path = baseUrl;

        this.getCampaign();
    }

    update() { }

    getDetail(item: any) {
        this.current = item;
        this.current.count = 1;
    }

    getCampaign() {
        this.loaderService.start();

        this.http.get(this.path + "api/campaign/all").map(response => response.json()).subscribe(result => {
            this.campaign = result;

            this.loaderService.end();
        }, error => {
            this.loaderService.end();
            console.error(error);
        });
    }

    getProductsByCampaign(id: string, name: string) {
        var camp = btoa(id + "|" + name);
        this.router.navigate(['/detail', camp]);
        //this.loaderService.start();

        //this.http.get(this.path + "api/campaign/get/" + id).map(response => response.json()).subscribe(result => {
        //    this.products = result.data;
        //    this.selectedCampaign = true;

        //    this.loaderService.end();
        //}, error => {
        //    console.error(error);
        //    this.loaderService.end();
        //});
    }

    getImage(image: string) {
        //return "url(" + this.path + image + ")";        
        return "url(" + image + ")";
    }

    getImageLink(image: string) {
        //return this.path + image;
        return image;
    }
}
