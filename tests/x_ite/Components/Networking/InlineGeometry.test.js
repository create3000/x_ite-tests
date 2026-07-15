import { expect, test } from "vitest";
import X3D              from "../../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   browser = canvas .browser;

test ("dispose", async () =>
{
   const scene1 = await browser .createX3DFromString (`
InlineGeometry {
   url "data:model/x3d+vrml,#X3D V3.3 utf8
Box { }
"
}
`);

   const
      inline     = scene1 .rootNodes [0],
      inlineNode = inline .getValue ();

   expect (inlineNode .checkLoadState ()) .toBe (X3D .X3DConstants .COMPLETE_STATE);
   expect (inlineNode .getInternalScene () .rootNodes) .toHaveLength (1);
   expect (inlineNode .getInternalScene () .rootNodes [0] .getNodeTypeName ()) .toBe ("Box");

   expect (inlineNode .getInternalScene () .isLive ()) .toBe (true);

   inline .dispose ();

   expect (inlineNode .getInternalScene () .isLive ()) .toBe (false);
});
