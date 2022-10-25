import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from "rxjs";
import { StoredItem } from "../models";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private readonly STORAGE_KEY = "symbols";

    private readonly _symbols$ = new BehaviorSubject<string[]>([])

    constructor() {
        this._symbols$.next(this.getSymbols());
    }

    set(symbol: string, companyName: string): void {

        if (this.has(symbol)) return;

        let symbols = this.getSymbols();
        let newSymbol = `${symbol}:${companyName}`

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify([newSymbol, ...symbols]));

        this._symbols$.next([newSymbol, ...symbols]);
    }

    remove(symbol: string): void {

        let symbols = this.getSymbols().filter(s => !s.startsWith(symbol));

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(symbols));

        this._symbols$.next(symbols)
    }

    has(symbol: string): boolean {
        return this.getSymbols().findIndex(s => s.startsWith(symbol)) > -1;
    }

    getCompanyName(symbol: string): string {
        return this.getSymbols().find(s => s.startsWith(symbol))?.split(":")[0] || "";
    }

    get symbols$(): Observable<StoredItem[]> {
        return this._symbols$.asObservable().pipe(
            map(items => items
                .map(s => s.split(":"))
                .map(([symbol, companyName]) => ({ symbol, companyName})))
        );
    }

    private getSymbols(): string[] {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)!) ?? [];
    }
}
