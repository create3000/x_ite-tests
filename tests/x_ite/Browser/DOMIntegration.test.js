const
   X3D = require ("../../X3D"),
   $   = require ("jquery")

test ("construction", () =>
{
   const canvas = document .createElement ("x3d-canvas")

   expect (canvas .nodeName) .toBe ("X3D-CANVAS")
   expect (canvas .browser) .toBeInstanceOf (X3D .X3DBrowser)
})

test ("construction-jquery", () =>
{
   const
      elements = $("<x3d-canvas></x3d-canvas>"),
      canvas   = elements [0]

   expect (elements) .toHaveLength (1)
   expect (canvas .nodeName) .toBe ("X3D-CANVAS")
   expect (canvas .browser) .toBeInstanceOf (X3D .X3DBrowser)
})

test ("onload", () =>
{
   return new Promise ((resolve, reject) =>
   {
      const canvas = $(`<x3d-canvas></x3d-canvas>`)

      canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`)

      canvas .on ("load", resolve)
      canvas .on ("error", reject)
   })
})

test ("oninitialized", () =>
{
   return new Promise ((resolve, reject) =>
   {
      const canvas = $(`<x3d-canvas></x3d-canvas>`)

      canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`)

      canvas .on ("initialized", resolve)
      canvas .on ("error", reject)
   })
})

test ("simple-scene", () =>
{
   return new Promise ((resolve, reject) =>
   {
      const
         canvas  = $(`<x3d-canvas></x3d-canvas>`),
         Browser = canvas .prop ("browser")

      canvas .html (`
<X3D profile='Interchange' version='4.0'>
   <head>
      <component name='Geometry2D' level='2'></component>
      <component name='Geospatial' level='2'></component>
      <component name='HAnim' level='3'></component>
   </head>
   <Scene>
      <Arc2D></Arc2D>
      <GeoTransform></GeoTransform>
      <HAnimJoint></HAnimJoint>
   </Scene>
</X3D>`)

      expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS")
      expect (Browser) .toBeInstanceOf (X3D .X3DBrowser)
      expect (Browser .currentScene .rootNodes) .toHaveLength (0)

      canvas .on ("load", () =>
      {
         expect (Browser .currentScene .rootNodes) .toHaveLength (3)
         expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Arc2D")
         expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("GeoTransform")
         expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("HAnimJoint")

         resolve ()
      })

      canvas .on ("error", reject)
   })
})
