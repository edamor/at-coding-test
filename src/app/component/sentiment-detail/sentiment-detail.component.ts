import { Component, Input } from '@angular/core';
import { MonthlySentiment } from "../../models";
import { Observable } from "rxjs";

@Component({
    selector: 'app-sentiment-detail',
    template: `
        <div class="outer">
            <ng-container *ngFor="let item of sentiments$ | async">
                <div class="inner">
                    <div>
                        <p>{{ getMonthString(item.month) + " " + item.year }}</p>
                        <p>Change: {{ item.change }}</p>
                        <p>MSPR: {{ item.mspr }}</p>
                    </div>
                    <div>
                        <span [style.font-size]="'3.5rem'"
                              [style.color]="item.change < 0 ? 'red' : 'green'">
                            {{ item.change < 0 ? "🡇" : "🡅" }}
                        </span>
                    </div>
                </div>
            </ng-container>
        </div>
    `,
    styles: [
        'div.outer { display: flex; justify-content: space-around }',
        'div.inner { display: flex; justify-content: space-evenly }'
    ]
})
export class SentimentDetailComponent {

    @Input() sentiments$!: Observable<MonthlySentiment[]>;

    getMonthString(monthNum: number): string {
        const months = ["OFFSET", "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        return months[monthNum];
    }

}
