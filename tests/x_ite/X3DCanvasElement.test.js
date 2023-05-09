const
   X3D = require ("../X3D"),
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

test ("onload-event", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`)

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`)

   canvas .on ("load", function ()
   {
      expect (this) .toBe (canvas [0])
      resolve ()
   })

   canvas .on ("error", reject)
}))

test ("onload-property", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`)

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`)

   canvas [0] .onload = function ()
   {
      expect (this) .toBe (canvas [0])
      resolve ()
   }

   canvas [0] .onerror = reject
}))

test ("oninitialized-event", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`)

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`)

   canvas .on ("initialized", function ()
   {
      expect (this) .toBe (canvas [0])
      resolve ()
   })

   canvas .on ("error", reject)
}))

test ("oninitialized-property", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`)

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`)

   canvas [0] .oninitialized = function ()
   {
      expect (this) .toBe (canvas [0])
      resolve ()
   }

   canvas [0] .onerror = reject
}))

test ("onerror-event", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`)

   canvas .attr ("src", "https://www.example.com/does-not-exist")

   canvas .on ("initialized", reject)
   canvas .on ("error", function ()
   {
      expect (this) .toBe (canvas [0])
      resolve ()
   })
}))

test ("onerror-property", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`)

   canvas .attr ("src", "https://www.example.com/does-not-exist")

   canvas [0] .oninitialized = reject
   canvas [0] .onerror = function ()
   {
      expect (this) .toBe (canvas [0])
      resolve ()
   }
}))

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
      expect (Browser .currentScene .profile .name) .toBe ("Interchange")
      expect (Browser .currentScene .components) .toHaveLength (0)

      expect (Browser .currentScene .rootNodes) .toHaveLength (3)
      expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Shape")
      expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("Material")
      expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

      resolve ()
   })

   canvas .on ("error", reject)
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
      expect (Browser .currentScene .profile .name) .toBe ("Interchange")
      expect (Browser .currentScene .components) .toHaveLength (0)

      expect (Browser .currentScene .rootNodes) .toHaveLength (3)
      expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Shape")
      expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("Material")
      expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

      resolve ()
   })

   canvas .on ("error", reject)
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
      expect (Browser .currentScene .profile .name) .toBe ("Interchange")
      expect (Browser .currentScene .components) .toHaveLength (0)

      expect (Browser .currentScene .rootNodes) .toHaveLength (3)
      expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Shape")
      expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("Material")
      expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

      resolve ()
   })

   canvas .on ("error", reject)
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
      expect (Browser .currentScene .profile .name) .toBe ("Interchange")
      expect (Browser .currentScene .components) .toHaveLength (0)

      expect (Browser .currentScene .rootNodes) .toHaveLength (3)
      expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Shape")
      expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("Material")
      expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

      resolve ()
   })

   canvas .on ("error", reject)
}))
