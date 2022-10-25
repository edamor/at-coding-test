import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, map, mergeMap, Observable } from "rxjs";
import { FinnhubService } from "../../service/finnhub.service";
import { MonthlySentiment } from "../../models";
import { LocalStorageService } from "../../service/local-storage.service";

@Component({
    selector: 'app-sentiment-page',
    template: `
        <div class="outer">
            <div [style.border]="'1px solid black'" 
                 [style.padding]="'1rem'" [style.margin-bottom]="'1rem'">
                <h2>{{ companyName$ | async }} ({{ symbol$ | async }})</h2>
                <app-sentiment-detail [sentiments$]="sentiments$"></app-sentiment-detail>
            </div>
            <button type="button" [routerLink]="''" id="backBtn" >
                🡰 Back to list of stocks
            </button>
        </div>
    `,
    styles: []
})
export class SentimentPageComponent implements OnInit {

    symbol$!: Observable<string>;

    companyName$!: Observable<string>;

    private _sentiments$ = new BehaviorSubject<MonthlySentiment[]>([]);

    constructor(private route: ActivatedRoute,
                private finnhubService: FinnhubService,
                private storageService: LocalStorageService) {
    }

    ngOnInit(): void {

        this.symbol$ = this.route.paramMap.pipe(
            map(p => p.has("symbol") ? p.get("symbol")! : "")
        );

        this.companyName$ = this.symbol$.pipe(
            map(s => this.storageService.getCompanyName(s))
        );

        const dateTo = new Date();
        const dateFrom = new Date(dateTo);
        dateFrom.setMonth(dateTo.getMonth() - 2)
        const to = dateTo.toISOString().substring(0, dateTo.toISOString().indexOf("T"));
        const from = dateFrom.toISOString().substring(0, dateFrom.toISOString().indexOf("T"));
        this.symbol$.pipe(
            mergeMap(s => this.finnhubService.fetchStockSentiments(s, from, to))
        ).subscribe(sentiments => {
            this._sentiments$.next(sentiments);
        })
    }

    get sentiments$(): Observable<MonthlySentiment[]> {
        return this._sentiments$.asObservable();
    }

}
