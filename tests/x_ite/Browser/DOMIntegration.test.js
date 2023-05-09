const
   X3D = require ("../../X3D"),
   $   = require ("jquery")

test ("simple-scene-direct", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas>
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
</X3D>
   </x3d-canvas>`)

   const Browser = canvas .prop ("browser")

   expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS")
   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser)
   expect (Browser .currentScene .rootNodes) .toHaveLength (0)

   canvas .on ("load", () =>
   {
      try
      {
         expect (Browser .currentScene .profile .name) .toBe ("Interchange")
         expect (Browser .currentScene .components) .toHaveLength (3)
         expect (Browser .currentScene .components [0] .name) .toBe ("Geometry2D")
         expect (Browser .currentScene .components [1] .name) .toBe ("Geospatial")
         expect (Browser .currentScene .components [2] .name) .toBe ("HAnim")

         expect (Browser .currentScene .rootNodes) .toHaveLength (3)
         expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Arc2D")
         expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("GeoTransform")
         expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("HAnimJoint")

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   canvas .on ("error", reject)
}))

test ("simple-scene-later", () => new Promise ((resolve, reject) =>
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
      <unit category='angle' name='degree' conversionFactor='0.017453292519943295'></unit>
      <unit category='force' name='millinewton' conversionFactor='0.001'></unit>
      <unit category='length' name='millimetre' conversionFactor='0.002'></unit>
      <unit category='mass' name='gram' conversionFactor='0.003'></unit>
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
      try
      {
         expect (Browser .currentScene .profile .name) .toBe ("Interchange")
         expect (Browser .currentScene .components) .toHaveLength (3)
         expect (Browser .currentScene .components [0] .name) .toBe ("Geometry2D")
         expect (Browser .currentScene .components [1] .name) .toBe ("Geospatial")
         expect (Browser .currentScene .components [2] .name) .toBe ("HAnim")
         expect (Browser .currentScene .units) .toHaveLength (4)
         expect (Browser .currentScene .units [0] .category) .toBe ("angle")
         expect (Browser .currentScene .units [0] .name) .toBe ("degree")
         expect (Browser .currentScene .units [0] .conversionFactor) .toBeCloseTo (0.017453292519943295)
         expect (Browser .currentScene .units [1] .category) .toBe ("force")
         expect (Browser .currentScene .units [1] .name) .toBe ("millinewton")
         expect (Browser .currentScene .units [1] .conversionFactor) .toBeCloseTo (0.001)
         expect (Browser .currentScene .units [2] .category) .toBe ("length")
         expect (Browser .currentScene .units [2] .name) .toBe ("millimetre")
         expect (Browser .currentScene .units [2] .conversionFactor) .toBeCloseTo (0.002)
         expect (Browser .currentScene .units [3] .category) .toBe ("mass")
         expect (Browser .currentScene .units [3] .name) .toBe ("gram")
         expect (Browser .currentScene .units [3] .conversionFactor) .toBeCloseTo (0.003)

         expect (Browser .currentScene .rootNodes) .toHaveLength (3)
         expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Arc2D")
         expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("GeoTransform")
         expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("HAnimJoint")

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   canvas .on ("error", reject)
}))
