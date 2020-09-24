import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
    tag: 'my-component',
    styleUrl: 'my-component.css',
    shadow: true,
})
export class MyComponent {
    /**
     * An example event
     */
    @Event() ding: EventEmitter<void>;

    /**
     * The first name
     */
    @Prop() first: string;

    /**
     * The middle name
     */
    @Prop() middle: string;

    /**
     * The last name
     */
    @Prop() last: string;

    private getText(): string {
        return format(this.first, this.middle, this.last);
    }

    render() {
        return (
            <Host>
                <p>Hello, World! I'm {this.getText()}!</p>
                <button onClick={() => this.ding.emit()}>emit "ding" event</button>.
            </Host>
        );
    }
}
