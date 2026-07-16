import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

test .concurrent ("cube.stl", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/STL/cube.stl", import.meta.url)));

   expect (scene .encoding) .toBe ("STL");
   expect (scene .rootNodes) .toHaveLength (2);

   const shape = scene .rootNodes [1];

   expect (shape .getNodeTypeName ()) .toBe ("Shape");
   expect (shape .appearance .getNodeTypeName ()) .toBe ("Appearance");
   expect (shape .appearance .material .getNodeTypeName ()) .toBe ("Material");
   expect (shape .geometry .getNodeTypeName ()) .toBe ("TriangleSet");
   expect (shape .geometry .normal .getNodeTypeName ()) .toBe ("Normal");
   expect (shape .geometry .normal .vector) .toHaveLength (12);
   expect (shape .geometry .coord .getNodeTypeName ()) .toBe ("Coordinate");
   expect (shape .geometry .coord .point) .toHaveLength (36);
});

test .concurrent ("Menger_sponge-Binary.stl", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/STL/Menger_sponge-Binary.stl", import.meta.url)));

   expect (scene .encoding) .toBe ("STL");
   expect (scene .rootNodes) .toHaveLength (2);
});
