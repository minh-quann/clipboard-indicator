import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export class Keyboard {
    #device;
    #contentPurpose;

    constructor () {
        let seat = Clutter.get_default_backend().get_default_seat();
        this.#device = seat.create_virtual_device(Clutter.InputDeviceType.KEYBOARD_DEVICE);

        Main.inputMethod.connectObject('notify::content-purpose', (method) => {
            this.#contentPurpose = method.content_purpose;
        }, this);
    }

    destroy () {
        Main.inputMethod.disconnectObject(this);
        this.#device.run_dispose();
    }

    #notify (key, state) {
        // Use GLib monotonic time instead of Clutter.get_current_event_time()
        // because the latter returns 0 when called outside an event handler
        this.#device.notify_keyval(
            GLib.get_monotonic_time(),
            key,
            state
        );
    }

    get purpose () {
        return this.#contentPurpose;
    }

    press (key) {
        this.#notify(key, Clutter.KeyState.PRESSED);
    }

    release (key) {
        this.#notify(key, Clutter.KeyState.RELEASED);
    }

    /**
     * Send a key combo with delays between each event to ensure proper
     * processing across main loop iterations. This prevents key events
     * from being batched together which can cause modifier misordering
     * and infinite key repeat on Wayland.
     *
     * @param {number[]} modifiers - modifier keyvals (e.g. Clutter.KEY_Control_L)
     * @param {number} key - the main key to press (e.g. Clutter.KEY_v)
     * @param {Function} [callback] - called after all keys are released
     */
    sendCombo (modifiers, key, callback) {
        const DELAY = 30;
        const steps = [];

        // 1. Press each modifier
        for (const mod of modifiers) {
            steps.push(() => this.press(mod));
        }
        // 2. Press the main key
        steps.push(() => this.press(key));
        // 3. Release the main key
        steps.push(() => this.release(key));
        // 4. Release modifiers in reverse order
        for (let i = modifiers.length - 1; i >= 0; i--) {
            steps.push(() => this.release(modifiers[i]));
        }

        // Execute steps sequentially with delays between each
        let i = 0;
        const runNext = () => {
            if (i < steps.length) {
                steps[i]();
                i++;
                this._comboTimeout = setTimeout(runNext, DELAY);
            } else if (callback) {
                this._comboTimeout = setTimeout(callback, DELAY);
            }
        };
        runNext();
    }
}
