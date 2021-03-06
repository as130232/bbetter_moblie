import { Component } from '@angular/core';

@Component({
    selector:'app-touch-event',
    template:`
    <div class="gestures"
        (click)="onElementClicked()">
        Click me
    </div>
    <div class="gestures"
        (tap)="onElementTapped()">
        Tap me
    </div>
    <div class="gestures"
        (press)="onElementPressed()">
        Long Press me
    </div>
    `
})
export class TouchEventComponet {

    onElementClicked(){
        console.log('I was clicked');
    }

    onElementTapped(){
        console.log('I was tapped');
    }

    onElementPressed(){
        console.log('I was pressed');
    }
}