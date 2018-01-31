import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from "../../services/alert.service";


@Component({
    moduleId: module.id,
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit {

    public message: any;

    constructor(
        private readonly alertService: AlertService
    ) {
    }

    public ngOnInit() {
        this.alertService.getMessage().subscribe(message => {
            this.message = message;
            setTimeout(() => {
                this.message = false;
            }, 5000);
        });
    }
}
