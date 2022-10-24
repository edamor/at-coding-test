import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../../service/local-storage.service";
import { FormControl, Validators } from "@angular/forms";
import { FinnhubService } from "../../service/finnhub.service";

@Component({
    selector: 'app-stock-input',
    template: `
        <div>
            <p>Enter the symbol of a stock to track (i.e. AAPL, TSLA, GOOGL)</p>
            <input id="stockInput"
                   type="text"
                   (input)="transformInput()"
                   [formControl]="stockInputControl"/>
            <button id="trackBtn"
                    type="button"
                    (click)="saveSymbol()"
                    [disabled]="this.stockInputControl.invalid">
                Track Stock
            </button>
        </div>
    `,
    styles: ['div { border: 1px solid black; padding: 0.5rem; }']
})
export class StockInputComponent implements OnInit {

    readonly stockInputControl = new FormControl("",
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)]);

    constructor(private storageService: LocalStorageService,
                private finnhubService: FinnhubService) {
    }

    ngOnInit(): void {
    }

    saveSymbol(): void {

        if (this.stockInputControl.invalid) return;

        this.finnhubService
            .fetchSymbolDetail(this.stockInputControl.value!)
            .subscribe(detail => {
                this.storageService.addSymbol(detail.symbol, detail.description);
            })
        this.stockInputControl.reset();
    }

    transformInput(): void {
        this.stockInputControl.setValue(this.stockInputControl.value!.toUpperCase().replace(/[^A-Z]/g, ''));
    }

}
