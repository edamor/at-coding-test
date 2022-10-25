import { Component, Input } from '@angular/core';
import { StockQuote } from "../../models";
import { LocalStorageService } from "../../service/local-storage.service";

@Component({
    selector: 'app-stock-information',
    template: `
        <div class="outer">
            <div class="inner">
                <h3>{{ stock.companyName }} ({{ stock.symbol }})</h3>
                <div [style.font-size]="'1.5rem'" [style.margin-left]="'auto'">
                    <button (click)="remove(stock.symbol)" 
                            [id]="'remove' + stock.symbol" >
                        ✕
                    </button>
                </div>
            </div>
            <div class="inner">
                <div [style.width]="'25%'">
                    <p><b>Change today: </b>
                        {{ stock.changeToday > 0 ? ("+" + stock.changeToday) : stock.changeToday }}
                    </p>
                    <p><b>Current price: </b>{{ stock.currentPrice | currency }}</p>
                </div>
                <div [style.width]="'25%'">
                    <p><b>Opening price: </b> {{ stock.openingPrice | currency }}</p>
                    <p><b>High price: </b>{{ stock.highPrice | currency }}</p>
                </div>
                <div [style.width]="'50%'" class="inner">
                    <span [style.font-size]="'4rem'" 
                          [style.color]="stock.changeToday < 0 ? 'red' : 'green'">
                        {{ stock.changeToday < 0 ? "🡇" : "🡅" }}
                    </span>
                </div>
            </div>
            <button type="button"
                    [id]="'sentiment' + stock.symbol"
                    [routerLink]="['/sentiment', stock.symbol]">
                Go to social sentiment detail 🡺
            </button>
        </div>
    `,
    styles: [
        'div.outer { border: 1px dotted black; padding: 1.5rem; }',
        'div.inner { width: 100%; display: flex; justify-content: center; align-items: center }'
    ]
})
export class StockInformationComponent {

    @Input() stock!: StockQuote;

    constructor(private storageService: LocalStorageService) {
    }

    remove(symbol: string): void {
        this.storageService.remove(symbol);
    }

}
