require ("jsdom-global") ()

global .require          = require
global .MutationObserver = window .MutationObserver

require ("@webcomponents/custom-elements")

global .customElements = window .customElements

module .exports = require ("../../x_ite/dist/x_ite")
