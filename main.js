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

class Component {

    constructor(
        {
            state = {},
            methods,
            render
        }
    ) {
        this.state = this.stateInitiator.call(this, state)
        this.methods = this.methodsInitiator.call(this, methods)
        this.render = this.renderInitiator.call(this, render)
    }

    stateInitiator(initState) {
        return new Proxy(
            initState,
            {
                set: (obj, prop, newVal) => {
                    obj[prop] = newVal
                    container = patch(container, this.render())
                    return true
                }
            }
        )
    }

    methodsInitiator(initMethods) {
        return initMethods.call(this)
    }

    renderInitiator(initRender) {
        return initRender.bind(this)
    }
}

const vNode = <div>Hello</div>;

const counter = new Component({
    state: {
        counter: 0,
        items: []
    },
    methods() {
        return {
            changeCounter: () => {
                this.state.counter++
            },
            addItem: () => {
                this.state.items.push('Hello')
            }
        }
    },
    render() {
        return vNode
    }
})

container = patch(container, counter.render())