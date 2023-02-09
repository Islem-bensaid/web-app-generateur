import {Injectable} from '@angular/core';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { AuthentificationService } from '../../../layouts/public-layout/shared/services/authentification/authentification.service';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { environment } from '../../../../environments/environment';
import { ForgeAuthentificationService } from '@privateLayout/shared/services/forge-authentification.service';

@Injectable({
    providedIn: 'root'
})
export class SessionTimeOutService {

    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;


    constructor(
        private authentificationService: AuthentificationService,
        private forgeAuthentificationService: ForgeAuthentificationService,
        private idle: Idle,
        private keepalive: Keepalive,
        private confirmDialogService: ConfirmDialogService,
    ) {
    }

    activateSessionTimeOut() {
        console.log('Gooooooooooooooooooooooooooooooooooo!!!');
        this.idle.setIdle(environment.Session.expired);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(environment.Session.timeout);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        this.authentificationService.getUserLoggedIn().subscribe((isUserLoggedIn: boolean) => {
            // console.log('isUserLoggedIn', isUserLoggedIn);
            if (isUserLoggedIn) {
                // if (localStorage.getItem('access_token') != null) {
                this.idle.onIdleEnd.subscribe(() => {
                    this.idleState = 'No longer idle.';
                    // console.log(this.idleState);
                    this.reset();
                });

                this.idle.onTimeout.subscribe(() => {
                    this.idleState = 'Timed out!';
                    this.timedOut = true;
                    // console.log(this.idleState);
                    this.logout();
                });

                this.idle.onIdleStart.subscribe(() => {
                    this.idleState = 'You\'ve gone idle!';
                    // console.log(this.idleState);
                    this.handleWarningTimeout(this.idleState);
                });

                this.idle.onTimeoutWarning.subscribe((countdown) => {
                    this.idleState = 'You will time out in ' + countdown + ' seconds!';
                    // console.log(this.idleState);
                    // this.handleWarningTimeout(this.idleState);
                    return this.idleState;
                });

                // sets the ping interval to 15 seconds
                this.keepalive.interval(15);

                this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

                this.reset();
                // }
            }
        });

    }

    logout() {
        this.authentificationService.logout();
        this.forgeAuthentificationService.logout();
    }

    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }

    stay() {
        this.reset();
    }

    handleWarningTimeout(msg) {
        this.idle.clearInterrupts();
        this.confirmDialogService.confirmLogin('', 'confirm_log_out').subscribe({
            next: (isConfirmed) => {
                if (isConfirmed) {
                    // console.log('logout');
                    this.logout();
                } else {
                    // console.log('resume');
                    this.confirmDialogService.close();
                    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
                    this.stay();
                }
            },
        });
    }
}
