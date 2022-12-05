
import { renderApp } from "./src/init.js";
import { counter } from "./src/usage/counter.js";

const element = document.getElementById('root')

renderApp(element, counter)