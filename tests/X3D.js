require ("jsdom-global") ()

window .HTMLElement = function () { }
window .HTMLElement .prototype .attachShadow = () => document .createElement ("div")

global .require          = require
global .HTMLElement      = window .HTMLElement
global .MutationObserver = window .MutationObserver

require ("@webcomponents/custom-elements")

global .customElements = window .customElements

const X3D = require ("../../x_ite/dist/x_ite")

module .exports = X3D
