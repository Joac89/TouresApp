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
import { reportComponent } from './components/report/report.component';
import { reportClienteComponent } from './components/report/reportCliente.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCComponent } from './components/product/productC.component';
import { CustomerComponent } from './components/customer/customer.component';
import { StoreComponent } from './components/store/store.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PagetitleComponent } from './controls/pagetitle/pagetitle.component';
import { ItemprodComponent } from './controls/itemprod/itemprod.component';
import { ItemofferComponent } from './controls/itemoffer/itemoffer.component';
import { DetailProdComponent } from './controls/detailprod/detailprod.component';
import { ValidatorComponent } from './controls/validator/validator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuardService } from './services/guard.service';
import { DetailComponent } from './components/campaign/detail.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        OrderComponent,
        reportComponent,
        reportClienteComponent,
        CampaignComponent,
        DetailComponent,
        StartComponent,
        HomeComponent,
        ProductComponent,
        ProductCComponent,
        CustomerComponent,
        StoreComponent,
        UserComponent,
        LoginComponent,
        LogoutComponent,
        PagetitleComponent,
        ItemprodComponent,
        ItemofferComponent,
        DetailProdComponent,
        ValidatorComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            //{ path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '', component: LoginComponent },
            { path: 'home', component: HomeComponent },
            { path: 'order', component: OrderComponent, canActivate: [GuardService] },
            
            { path: 'report', component: reportComponent },
            { path: 'reportCliente', component: reportClienteComponent },
            { path: 'campaign', component: CampaignComponent },
            { path: 'detail', component: DetailComponent },
            { path: 'detail/:camp', component: DetailComponent },
            { path: 'product', component: ProductComponent },
            { path: 'productC', component: ProductCComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'store', component: StoreComponent },
            { path: 'user', component: UserComponent, canActivate: [GuardService] },
            { path: 'login', component: LoginComponent },
            { path: 'login/:user', component: LoginComponent },
            { path: 'logout', component: LogoutComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
