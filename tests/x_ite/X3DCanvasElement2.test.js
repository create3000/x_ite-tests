const
   X3D = require ("../X3D"),
   $   = require ("jquery")

test ("src-property", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = $(`<x3d-canvas></x3d-canvas>`),
      Browser = canvas .prop ("browser")

   canvas [0] .src = `data:model/x3d-xml,
<X3D profile='Interchange' version='4.0'>
   <Scene>
      <Shape></Shape>
      <Material></Material>
      <Box></Box>
   </Scene>
</X3D>`

   expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS")
   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser)
   expect (Browser .currentScene .rootNodes) .toHaveLength (0)

   canvas .on ("initialized", () =>
   {
      try
      {
         expect (Browser .currentScene .profile .name) .toBe ("Interchange")
         expect (Browser .currentScene .components) .toHaveLength (0)

         expect (Browser .currentScene .rootNodes) .toHaveLength (3)
         expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Shape")
         expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("Material")
         expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   canvas .on ("error", () => reject ("onerror"))
}))

test ("url-property", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = $(`<x3d-canvas></x3d-canvas>`),
      Browser = canvas .prop ("browser")

   canvas [0] .url = new X3D .MFString (`data:model/x3d-xml,
<X3D profile='Interchange' version='4.0'>
   <Scene>
      <Shape></Shape>
      <Material></Material>
      <Box></Box>
   </Scene>
</X3D>`)

   expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS")
   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser)
   expect (Browser .currentScene .rootNodes) .toHaveLength (0)

   canvas .on ("initialized", () =>
   {
      try
      {
         expect (Browser .currentScene .profile .name) .toBe ("Interchange")
         expect (Browser .currentScene .components) .toHaveLength (0)

         expect (Browser .currentScene .rootNodes) .toHaveLength (3)
         expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Shape")
         expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("Material")
         expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   canvas .on ("error", () => reject ("onerror"))
}))

test ("src-attribute", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = $(`<x3d-canvas></x3d-canvas>`),
      Browser = canvas .prop ("browser")

   canvas .attr ("src", `data:model/x3d-xml,
<X3D profile='Interchange' version='4.0'>
   <Scene>
      <Shape></Shape>
      <Material></Material>
      <Box></Box>
   </Scene>
</X3D>`)

   expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS")
   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser)
   expect (Browser .currentScene .rootNodes) .toHaveLength (0)

   canvas .on ("initialized", () =>
   {
      try
      {
         expect (Browser .currentScene .profile .name) .toBe ("Interchange")
         expect (Browser .currentScene .components) .toHaveLength (0)

         expect (Browser .currentScene .rootNodes) .toHaveLength (3)
         expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Shape")
         expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("Material")
         expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   canvas .on ("error", () => reject ("onerror"))
}))

test ("url-attribute", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = $(`<x3d-canvas></x3d-canvas>`),
      Browser = canvas .prop ("browser")

   canvas .attr ("url", `"data:model/x3d-xml,
<X3D profile='Interchange' version='4.0'>
   <Scene>
      <Shape></Shape>
      <Material></Material>
      <Box></Box>
   </Scene>
</X3D>"`)

   expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS")
   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser)
   expect (Browser .currentScene .rootNodes) .toHaveLength (0)

   canvas .on ("initialized", () =>
   {
      try
      {
         expect (Browser .currentScene .profile .name) .toBe ("Interchange")
         expect (Browser .currentScene .components) .toHaveLength (0)

         expect (Browser .currentScene .rootNodes) .toHaveLength (3)
         expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Shape")
         expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("Material")
         expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   canvas .on ("error", () => reject ("onerror"))
}))
