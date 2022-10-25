import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment as ENV } from "../../environments/environment";
import { filter, from, map, mergeMap, Observable } from "rxjs";
import {
    FinnhubQuoteLookupResponse, FinnhubSentimentLookupResponse,
    FinnhubSymbolDetail,
    FinnhubSymbolLookupResponse,
    MonthlySentiment
} from "../models";

@Injectable({
    providedIn: 'root'
})
export class FinnhubService {

    private readonly params = new HttpParams().set("token", ENV.apiToken);

    constructor(private http: HttpClient) {
    }

    fetchQuote(symbol: string): Observable<FinnhubQuoteLookupResponse> {
        const params = this.params.set("symbol", symbol);
        return this.http.get<FinnhubQuoteLookupResponse>(`${ENV.apiUrl}/quote`, { params });
    }

    fetchSymbolDetail(symbol: string): Observable<FinnhubSymbolDetail> {
        const params = this.params.set("q", symbol);
        return this.http.get<FinnhubSymbolLookupResponse>(`${ENV.apiUrl}/search`, { params }).pipe(
            mergeMap(response => from(response.result)),
            filter(detail => detail.symbol === symbol)
        )
    }

    fetchStockSentiments(symbol: string, dateFrom: string, dateTo: string): Observable<MonthlySentiment[]> {
        const params = this.params.set("symbol", symbol).set("from", dateFrom).set("to", dateTo);
        return this.http.get<FinnhubSentimentLookupResponse>(`${ENV.apiUrl}/stock/insider-sentiment`, { params }).pipe(
            map(response => response.data)
        )
    }

}
