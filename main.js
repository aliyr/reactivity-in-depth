import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from 'snabbdom'

const patch = init([
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
])

let container = document.getElementById('app')

const state = new Proxy(
    {
        counter: 0
    },
    {
        set(obj, prop, newVal) {
            obj[prop] = newVal
            container = patch(container, component())
            return true
        }
    }
)

const methods = {
    changeCounter() {
        console.log(state.counter)
        state.counter++
    }
}

function component () {
    return h(
        'div',
        {
            style: {
                color: 'green'
            },
            on: {
                click: () => { methods.changeCounter() }
            }
        },
        `counter is ${state.counter}`
    )
}

container = patch(container, component())