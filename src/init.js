import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from 'snabbdom'

export const patch = init([
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
])

export const container = {
    el: document.getElementById('app')
}

export const renderApp = (component) => {
    container.el = patch(container.el, component.render())
}