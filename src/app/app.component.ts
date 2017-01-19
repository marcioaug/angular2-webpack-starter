import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<main><h1>Hello from Angular App with Webpack</h1></main>',
    styles: [
        `
            main {
                padding: 1em;
                font-family: Arial, Helvetica, sans-serif;
                text-align: center;
                margin-top: 50px;
                display: block;
            }
        `
    ]
})
export class AppComponent { }