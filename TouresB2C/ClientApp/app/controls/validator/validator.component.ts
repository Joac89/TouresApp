import { Component, Input, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'validator',
    templateUrl: './validator.component.html',
    styleUrls: ['./validator.component.css', '../../style/general.css'],
})
export class ValidatorComponent {
    @Input() field: FormControl | undefined;

    constructor() {
    }

    identityPattern(pattern: string): string {
        var psubs = "";
        var text = "Caracteres no v&aacute;lidos";
        var patterns = [
            { text: "No es un correo electr&oacute;nico v&aacute;lido", pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$" },
            { text: "Solo acepta n&uacute;meros", pattern: "^(0|[1-9][0-9]*)$" }
        ];

        patterns.forEach(x => {
            psubs = pattern.substring(1, pattern.length - 1);
            if (x.pattern === psubs) text = x.text;
        });

        return text;
    }
}