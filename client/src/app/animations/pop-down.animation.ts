// import the required animation functions from the angular animations module
import {
    trigger,
    state,
    animate,
    transition,
    style,
    AnimationTriggerMetadata
} from '@angular/animations';

export const popDownAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('pop-down', [

        // end state styles for route container (host)
        state('*', style({
            // the view covers the whole screen with a semi tranparent background
        })),

        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({
                position: 'fixed',
                top: 0,
            }),

            // animation and styles at end of transition
            animate('0.5s ease-in-out', style({
                // transition the right position to 0 which slides the content into view
                top: '50px'
            }))
        ]),

        // route 'leave' transition
        transition(':leave', [

            style({
                position: 'fixed',
                top: '50px',
            }),
            // animation and styles at end of transition
            animate('0.5s ease-in-out', style({
                // transition the right position to -400% which slides the content out of view
                top: 0,
            }))
        ])
    ]);
