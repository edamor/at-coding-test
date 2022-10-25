import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockInputComponent } from './component/stock-input/stock-input.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { StockInformationComponent } from './component/stock-information/stock-information.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { SentimentPageComponent } from './page/sentiment-page/sentiment-page.component';
import { SentimentDetailComponent } from './component/sentiment-detail/sentiment-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        StockInputComponent,
        StockInformationComponent,
        HomePageComponent,
        SentimentPageComponent,
        SentimentDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
