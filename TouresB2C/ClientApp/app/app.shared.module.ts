import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { ProductComponent } from './components/product/product.component';
import { ContactComponent } from './components/contact/contact.component';
import { PagetitleComponent } from './components/controls/pagetitle/pagetitle.component';
import { ItemprodComponent } from './components/controls/itemprod/itemprod.component';
import { ItemofferComponent } from './components/controls/itemoffer/itemoffer.component';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        AboutComponent,
        CampaignComponent,
        HomeComponent,
        ProductComponent,
        ContactComponent,
        PagetitleComponent,
        ItemprodComponent,
        ItemofferComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'about', component: AboutComponent },
            { path: 'campaign', component: CampaignComponent },
            { path: 'product', component: ProductComponent },
            { path: 'contact', component: ContactComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
