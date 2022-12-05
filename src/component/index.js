import {patch, container} from "../init.js";

export default class Component {

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
                    container.el = patch(container.el, this.render())
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