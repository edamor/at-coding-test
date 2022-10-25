import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, concatMap, from, map, mergeMap, Observable, Subject, takeUntil, toArray } from "rxjs";
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
    `,
    styles: []
})
export class HomePageComponent implements OnInit, OnDestroy {

    private _stocks$ = new BehaviorSubject<StockQuote[]>([]);

    private _subs$ = new Subject();

    constructor(private storageService: LocalStorageService,
                private finnhubService: FinnhubService) {
    }

    ngOnInit(): void {

        this.storageService.symbols$.pipe(
            takeUntil(this._subs$),
            mergeMap(items => from(items).pipe(
                    concatMap(item => this.finnhubService.fetchQuote(item.symbol).pipe(
                        map(quote => new StockQuote(item.symbol, item.companyName, quote))
                    )),
                    toArray()
                )
            )
        ).subscribe(stocks => {
            this._stocks$.next(stocks)
        });

    }

    ngOnDestroy(): void {
        this._subs$.next({});
        this._subs$.complete();
    }

    get stocks$(): Observable<StockQuote[]> {
        return this._stocks$.asObservable();
    }
}
