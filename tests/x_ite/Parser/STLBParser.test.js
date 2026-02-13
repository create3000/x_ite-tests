const
   path = require ("path"),
   url  = require ("url");

const X3D = require ("../../X3D");

test ("cube.stl", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "STL", `cube.stl`))));

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

test ("Menger_sponge-Binary.stl", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "STL", `Menger_sponge-Binary.stl`))));

   expect (scene .encoding) .toBe ("STL");
   expect (scene .rootNodes) .toHaveLength (2);
});
