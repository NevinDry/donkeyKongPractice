import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../../services/alert.service';
import {popDownAnimation} from '../../animations/pop-down.animation';

@Component({
    moduleId: module.id,
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    animations: [popDownAnimation],
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
