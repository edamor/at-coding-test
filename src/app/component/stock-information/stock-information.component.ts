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
                    <button (click)="remove(stock.symbol)">✕</button>
                </div>
            </div>
            <div class="inner">
                <div [style.width]="'25%'">
                    <p>Change today: {{ stock.changeToday }}</p>
                    <p>Current price: {{ stock.currentPrice }}</p>
                </div>
                <div [style.width]="'25%'">
                    <p>Opening price: {{ stock.openingPrice }}</p>
                    <p>High price: {{ stock.highPrice }}</p>
                </div>
                <div [style.width]="'50%'" class="inner">
                    <span [style.font-size]="'4rem'" 
                          [style.color]="stock.changeToday < 0 ? 'red' : 'green'">
                        {{ stock.changeToday < 0 ? "🡇" : "🡅" }}
                    </span>
                </div>
            </div>
            <button type="button" [routerLink]="['/sentiment', stock.symbol]">
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
