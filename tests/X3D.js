const Window = require ("window")

global .window           = new Window ()
global .self             = window
global .navigator        = window .navigator
global .document         = window .document
global .require          = require
global .HTMLElement      = window .HTMLElement
global .Document         = window .Document
global .DocumentFragment = window .DocumentFragment
global .Node             = window .Node
global .Element          = window .Element
global .MutationObserver = window .MutationObserver

require ("@webcomponents/custom-elements")

global .customElements = window .customElements

const X3D = require ("../../x_ite/dist/x_ite")

module .exports = X3D
