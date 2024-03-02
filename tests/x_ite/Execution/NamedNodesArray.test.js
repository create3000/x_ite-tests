
const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("properties", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF N0 Group { }
DEF N1 Switch { }
DEF N2 StaticGroup { }
DEF N3 Transform { }
   `)

   const namedNodes = scene .namedNodes

   expect (namedNodes) .toBeInstanceOf (X3D .NamedNodesArray)
   expect (namedNodes) .toHaveLength (4)

   expect (namedNodes [0]) .toBeInstanceOf (X3D .SFNode)
   expect (namedNodes [1]) .toBeInstanceOf (X3D .SFNode)
   expect (namedNodes [2]) .toBeInstanceOf (X3D .SFNode)
   expect (namedNodes [3]) .toBeInstanceOf (X3D .SFNode)
})

test ("spread", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF N0 Group { }
DEF N1 Switch { }
DEF N2 StaticGroup { }
DEF N3 Transform { }
   `)

   const namedNodes = scene .namedNodes

   expect (namedNodes) .toBeInstanceOf (X3D .NamedNodesArray)
   expect (namedNodes .constructor) .toBe (X3D .NamedNodesArray)

   const a = [... namedNodes]

   expect (a) .toHaveLength (namedNodes .length)

   for (const [i, v] of a .entries ())
      expect (v) .toBe (namedNodes [i])
})

test ("filter", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF N0 Group { }
DEF N1 Switch { }
DEF N2 StaticGroup { }
DEF N3 Transform { }
   `)

   const namedNodes = scene .namedNodes

   const a = namedNodes .filter (n => n .getNodeName () .match (/[02]$/))

   expect (a) .not .toBe (namedNodes)
   expect (a) .toBeInstanceOf (X3D .NamedNodesArray)
   expect (a) .toHaveLength (2)

   expect (a [0]) .toBe (namedNodes [0])
   expect (a [1]) .toBe (namedNodes [2])
})

test ("toString", () =>
{
   const namedNodes = Browser .currentScene .namedNodes

   expect (X3D .NamedNodesArray .typeName) .toBe ("NamedNodesArray")
   expect (namedNodes .getTypeName ()) .toBe ("NamedNodesArray")
   expect (Object .prototype .toString .call (namedNodes)) .toBe (`[object NamedNodesArray]`)
   expect (namedNodes .toString ()) .toBe (`[object ${namedNodes .getTypeName ()}]`)
})
