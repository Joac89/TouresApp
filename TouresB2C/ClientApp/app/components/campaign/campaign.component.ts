import { Component } from '@angular/core';

@Component({
    selector: 'counter',
    templateUrl: './campaign.component.html'
})
export class CampaignComponent {
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }
}
