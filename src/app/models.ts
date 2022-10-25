export class StockQuote {
    readonly symbol: string;
    readonly companyName: string;
    readonly changeToday: number;
    readonly openingPrice: number;
    readonly currentPrice: number;
    readonly highPrice: number;

    constructor(symbol: string, companyName: string, quote: FinnhubQuoteLookupResponse) {
        this.symbol = symbol;
        this.companyName = companyName;
        this.changeToday = quote.d;
        this.openingPrice = quote.o;
        this.currentPrice = quote.c;
        this.highPrice = quote.h;
    }
}

export interface FinnhubQuoteLookupResponse {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
}

export interface FinnhubSymbolLookupResponse {
    count: number;
    result: FinnhubSymbolDetail[];
}

export interface FinnhubSymbolDetail {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
}

export interface FinnhubSentimentLookupResponse {
    symbol: string;
    data: MonthlySentiment[];
}

export interface MonthlySentiment {
    change: number;
    month: number;
    mspr: number;
    symbol: string;
    year: number;
}

export interface StoredItem {
    symbol: string;
    companyName: string;
}