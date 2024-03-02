const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("properties", () =>
{
   const
      scene  = Browser .currentScene,
      routes = scene .routes

   expect (routes) .toHaveLength (0)
   expect (routes) .toBeInstanceOf (X3D .RouteArray)
   expect (routes .constructor) .toBe (X3D .RouteArray)
})

test ("filter", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF N1 Transform { }
DEF N2 Transform { }
DEF N3 Transform { }
DEF N4 Transform { }

ROUTE N1.translation TO N2.translation
ROUTE N2.translation TO N3.translation
ROUTE N3.translation TO N4.translation
   `)

   const routes = scene .routes

   const a = routes .filter (r => r .sourceNode .getNodeName () .match (/[12]$/))

   expect (a) .not .toBe (routes)
   expect (a) .toBeInstanceOf (X3D .RouteArray)
   expect (a) .toHaveLength (2)

   expect (a [0] .sourceNode .getNodeName ()) .toBe ("N1")
   expect (a [1] .sourceNode .getNodeName ()) .toBe ("N2")
})

test ("toString", () =>
{
   const
      scene  = Browser .currentScene,
      routes = scene .routes

   expect (X3D .RouteArray .typeName) .toBe ("RouteArray")
   expect (routes .getTypeName ()) .toBe ("RouteArray")
   expect (Object .prototype .toString .call (routes)) .toBe (`[object RouteArray]`)
   expect (routes .toString ()) .toBe (`[object ${routes .getTypeName ()}]`)
})
