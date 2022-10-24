import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, concatMap, map, Observable } from "rxjs";
import { StockQuote } from "../../models";
import { LocalStorageService } from "../../service/local-storage.service";
import { FinnhubService } from "../../service/finnhub.service";

@Component({
    selector: 'app-home-page',
    template: `
        <app-stock-input></app-stock-input>
        <div>
            <ng-container *ngFor="let stock of stocks$ | async">
                <app-stock-information [stock]="stock"></app-stock-information>
            </ng-container>
        </div>
        <router-outlet></router-outlet>
    `,
    styles: []
})
export class HomePageComponent implements OnInit {

    private _stocks$ = new BehaviorSubject<StockQuote[]>([]);

    constructor(private storageService: LocalStorageService,
                private finnhubService: FinnhubService) {
    }

    ngOnInit(): void {

        this.storageService.symbols$.pipe(
            concatMap(([symbol, companyName]) => this.finnhubService
                .fetchQuote(symbol).pipe(
                    map(quote => new StockQuote(symbol, companyName, quote))
                )
            )
        ).subscribe(stockQuote => {
            let stocks = this._stocks$.value;
            this._stocks$.next([...stocks, stockQuote])
        });
    }

    get stocks$(): Observable<StockQuote[]> {
        return this._stocks$.asObservable();
    }
}
