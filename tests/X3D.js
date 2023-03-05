require ("jsdom-global") ()

global .require          = require
global .MutationObserver = window .MutationObserver

require ("@webcomponents/custom-elements")

global .customElements = window .customElements

const X3D = require ("../../x_ite/dist/x_ite")

module .exports = require ("../../x_ite/dist/x_ite")
