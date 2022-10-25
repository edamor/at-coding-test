import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./page/home-page/home-page.component";
import { SentimentPageComponent } from "./page/sentiment-page/sentiment-page.component";

const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "sentiment/:symbol", component: SentimentPageComponent },
    { path: "**", redirectTo: ""}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
