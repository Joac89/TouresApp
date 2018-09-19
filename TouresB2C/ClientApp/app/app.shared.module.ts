import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { StartComponent } from './components/start/start.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { ProductComponent } from './components/product/product.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StoreComponent } from './components/store/store.component';
import { PagetitleComponent } from './controls/pagetitle/pagetitle.component';
import { ItemprodComponent } from './controls/itemprod/itemprod.component';
import { ItemofferComponent } from './controls/itemoffer/itemoffer.component';
import { DetailProdComponent } from './controls/detailprod/detailprod.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        OrderComponent,
        CampaignComponent,
        StartComponent,
        HomeComponent,
        ProductComponent,
        RegistrationComponent,
        StoreComponent,
        PagetitleComponent,
        ItemprodComponent,
        ItemofferComponent,
        DetailProdComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            //{ path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '', component: StartComponent },
            { path: 'home', component: HomeComponent },
            { path: 'order', component: OrderComponent },
            { path: 'campaign', component: CampaignComponent },
            { path: 'product', component: ProductComponent },
            { path: 'registration', component: RegistrationComponent },
            { path: 'store', component: StoreComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
