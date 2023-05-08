
const X3D = require ("../../X3D")

test ("properties", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF I PositionInterpolator { }

DEF T Transform {
   children Shape {
      geometry Box { }
   }
}

ROUTE I.value_changed TO T.set_translation
`))

   expect (scene .routes) .toHaveLength (1)
   expect (scene .routes [0]) .toBeInstanceOf (X3D .X3DRoute)

   const route = scene .routes [0]

   expect (route .sourceNode) .toBeInstanceOf (X3D .SFNode)
   expect (route .sourceNode .getNodeTypeName ()) .toBe ("PositionInterpolator")
   expect (route .sourceField) .toBe ("value_changed")
   expect (route .destinationNode) .toBeInstanceOf (X3D .SFNode)
   expect (route .destinationNode .getNodeTypeName ()) .toBe ("Transform")
   expect (route .destinationField) .toBe ("translation")

   route .sourceNode       = undefined
   route .sourceField      = undefined
   route .destinationNode  = undefined
   route .destinationField = undefined

   expect (route .sourceNode) .toBeInstanceOf (X3D .SFNode)
   expect (route .sourceNode .getNodeTypeName ()) .toBe ("PositionInterpolator")
   expect (route .sourceField) .toBe ("value_changed")
   expect (route .destinationNode) .toBeInstanceOf (X3D .SFNode)
   expect (route .destinationNode .getNodeTypeName ()) .toBe ("Transform")
   expect (route .destinationField) .toBe ("translation")
})
