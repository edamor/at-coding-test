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
                        <div>
                            <b>{{ getMonthString(item.month) | uppercase }}</b>
                            {{ " " + item.year }}
                        </div>
                        <p><b>Change: </b>
                            {{ item.change > 0 ? ("+" + item.change) : item.change }}
                        </p>
                        <p><b>MSPR: </b>{{ item.mspr }}</p>
                    </div>
                    <div>
                        <span [style.font-size]="'3.5rem'"
                              [style.display]="'flex'"
                              [style.height]="'100%'"
                              [style.justify-content]="'center'"
                              [style.align-items]="'center'"
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
