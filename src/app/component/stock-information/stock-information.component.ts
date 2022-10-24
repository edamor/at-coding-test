import { Component, Input, OnInit } from '@angular/core';
import { StockQuote } from "../../models";

@Component({
    selector: 'app-stock-information',
    template: `
        <div class="outer">
            <h3>{{ stock.companyName }} ({{ stock.symbol }})</h3>
            <div class="inner">
                <div>
                    <p>Change today: {{ stock.changeToday }}</p>
                    <p>Current price: {{ stock.currentPrice }}</p>
                </div>
                <div>
                    <p>Opening price: {{ stock.openingPrice }}</p>
                    <p>High price: {{ stock.highPrice }}</p>
                </div>
                <div>
                    <span [style.font-size]="'4rem'" 
                          [style.color]="stock.changeToday < 0 ? 'red' : 'green'">
                        {{ stock.changeToday < 0 ? "🡇" : "🡅" }}
                    </span>
                </div>
            </div>
        </div>
    `,
    styles: [
        'div.outer { border: 1px dotted black; padding: 0.5rem; }',
        'div.inner { width: 80%; display: flex; justify-content: space-between; }'
    ]
})
export class StockInformationComponent implements OnInit {

    @Input() stock!: StockQuote;

    constructor() {
    }

    ngOnInit(): void {
    }

}
