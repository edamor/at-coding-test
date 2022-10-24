import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment as ENV } from "src/environments/environment";
import { filter, from, mergeMap, Observable } from "rxjs";
import { FinnhubQuoteLookupResponse, FinnhubSymbolDetail, FinnhubSymbolLookupResponse } from "../models";

@Injectable({
    providedIn: 'root'
})
export class FinnhubService {

    params = new HttpParams().set("token", ENV.apiToken);

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

}
