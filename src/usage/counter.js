import { h } from 'snabbdom'
import Component from '../component/index.js'

export const counter = new Component({
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
        return h(
            'div',
            {
                style: {
                    color: 'green'
                },
                on: {
                    click: () => {
                        this.methods.addItem()
                        this.methods.changeCounter()
                    }
                }
            },
            [
                `Counter is: ${this.state.counter}`,
                ...this.state.items.map((item) => {
                    return h(
                        'p',
                        {},
                        `${item}`
                    )
                })
            ]
        )
    }
})

