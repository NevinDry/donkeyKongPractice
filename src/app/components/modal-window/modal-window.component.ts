import {
    Component,
    Input,
    OnInit,
    ViewChild,
    EventEmitter,
    Output
} from '@angular/core';

import {
    ModalDirective
} from 'ngx-bootstrap';

@Component(
    {
        selector: 'app-modal-window',
        templateUrl: './modal-window.component.html',
        styleUrls: ['./modal-window.component.scss']
    })

export class ModalWindowComponent implements OnInit {

    private isShowing: boolean = false;

    public windowTitle: string;

    @Input() public title: string = '';

    @Input() public showClose: boolean = true;

    @Input() public modalSize: string = 'modal-lg';

    @Output() public closeEvent = new EventEmitter<any>();

    @ViewChild('modalPopup') public popup: ModalDirective;

    constructor() {
    }

    public ngOnInit() {

    }

    public showPopup() {
        this.isShowing = true;
        this.popup.show();
    }

    public hidePopup() {
        this.isShowing = false;
        this.popup.hide();
    }

    public togglePopup() {
        // this.popup.toggle() is broken.
        if (this.isShowing) {
            this.hidePopup();
        } else {
            this.showPopup();
        }
    }

    public closeModalHandler() {
        this.closeEvent.emit();
    }
}
