require ("jsdom-global") ()
require ("@webcomponents/custom-elements")

Object .defineProperty (window, "localStorage",
{
   value: new (require ("node-localstorage") .LocalStorage) ("/tmp"),
   writable: false,
})

global .require          = require
global .HTMLElement      = window .HTMLElement
global .MutationObserver = window .MutationObserver
global .customElements   = window .customElements
global .localStorage     = window .localStorage

module .exports = require ("../../x_ite/dist/x_ite")
