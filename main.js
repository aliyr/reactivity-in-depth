import {classModule, eventListenersModule, h, init, propsModule, styleModule,} from 'snabbdom'

const patch = init([
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
])

let container = document.getElementById('app')

class Component {

    state = new Proxy(
        {
            counter: 0
        },
        {
            set: (obj, prop, newVal) => {
                obj[prop] = newVal
                container = patch(container, this.render())
                return true
            }
        }
    )

    methods = {
        changeCounter: () => {
            this.state.counter++
        }
    }

    render() {

        return h(
            'div',
            {
                style: {
                    color: 'green'
                },
                on: {
                    click: () => { this.methods.changeCounter() }
                }
            },
            `counter is ${this.state.counter}`
        )
    }
}

function selfish (target) {
    const cache = new WeakMap();
    const handler = {
        get (target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        }
    };
    return new Proxy(target, handler);
}

const counterBound = selfish(Component)

const counter = new counterBound()

container = patch(container, counter.render())