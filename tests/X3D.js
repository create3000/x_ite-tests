require ("jsdom-global") ()
require ("@webcomponents/custom-elements")

//window .HTMLCanvasElement .prototype .getContext = () => null

global .require          = require
global .HTMLElement      = window .HTMLElement
global .MutationObserver = window .MutationObserver
global .customElements   = window .customElements

module .exports = require ("../../x_ite/dist/x_ite")
