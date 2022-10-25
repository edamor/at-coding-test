import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div [style.max-width]="'800px'" [style.margin]="'0 auto'">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: []
})
export class AppComponent {

}
