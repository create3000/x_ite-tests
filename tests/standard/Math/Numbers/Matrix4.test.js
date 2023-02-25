const
   Window = require ("window");

global .window           = new Window ();
global .self             = window;
global .navigator        = window .navigator;
global .document         = window .document;
global .require          = require;
global .HTMLElement      = window .HTMLElement;
global .Document         = window .Document;
global .DocumentFragment = window .DocumentFragment;
global .Node             = window .Node;
global .Element          = window .Element;
global .MutationObserver = window .MutationObserver;
require ("@webcomponents/custom-elements");
global .customElements   = window .customElements;

const
   X3D     = require ("../../../../../x_ite/dist/x_ite"),
   Matrix4 = X3D .require ("standard/Math/Numbers/Matrix4");

test ("constructor", () =>
{
   expect (new Matrix4 ()) .toEqual ({
      0:1, 1:0, 2:0, 3:0,
      4:0, 5:1, 6:0, 7:0,
      8:0, 9:0, 10:1, 11:0,
      12:0, 13:0, 14:0, 15:1,
   });
});
