import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private readonly STORAGE_KEY = "symbols";

    private readonly _symbols$ = new ReplaySubject<[string, string]>()

    constructor() {
    }

    get symbols$(): Observable<[string, string]> {
        const symbols = this.getSymbols();
        symbols.forEach((value, key) => {
            this._symbols$.next([key, value]);
        })
        return this._symbols$.asObservable();
    }

    addSymbol(symbol: string, companyName: string): void {
        let symbols = this.getSymbols();

        if (symbols.has(symbol)) return;

        symbols.set(symbol, companyName);

        const objectified = Object.fromEntries(symbols);

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(objectified));

        this._symbols$.next([symbol, companyName]);
    }

    private getSymbols(): Map<string, string> {
        const optional = JSON.parse(localStorage.getItem(this.STORAGE_KEY)!);

        return optional === null ?  new Map() : new Map(Object.entries(optional));
    }

}
