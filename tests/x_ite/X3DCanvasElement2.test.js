const
   X3D = require ("../X3D"),
   $   = require ("jquery")

test ("onload-attribute", () => new Promise ((resolve, reject) =>
{
   window .onload1 = undefined;
   window .onload2 = jest .fn ();

   expect (window .onload1) .toBe (undefined)

   const canvas = $(`<x3d-canvas onload="window.onload1=this;window.onload2()"></x3d-canvas>`)

   expect (window .onload2) .toHaveBeenCalledTimes (1)

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`)

   canvas [0] .addEventListener ("load", function (event)
   {
      try
      {
         expect (event .type) .toBe ("load")
         expect (event) .toBeInstanceOf (CustomEvent)
         expect (this) .toBe (canvas [0])
         expect (window .onload1) .toBe (canvas [0])
         expect (window .onload2) .toHaveBeenCalledTimes (2)
         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   canvas [0] .addEventListener ("error", () => reject ("onerror"))
}))

test ("oninitialized-attribute", () => new Promise ((resolve, reject) =>
{
   window .oninitialized1 = undefined;
   window .oninitialized2 = jest .fn ();

   expect (window .oninitialized1) .toBe (undefined)

   const canvas = $(`<x3d-canvas oninitialized="window.oninitialized1=this;window.oninitialized2()"></x3d-canvas>`)

   expect (window .oninitialized2) .toHaveBeenCalledTimes (0)

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`)

   canvas [0] .addEventListener ("initialized", function (event)
   {
      try
      {
         expect (event .type) .toBe ("initialized")
         expect (event) .toBeInstanceOf (CustomEvent)
         expect (this) .toBe (canvas [0])
         expect (window .oninitialized1) .toBe (canvas [0])
         expect (window .oninitialized2) .toHaveBeenCalledTimes (1)
         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   canvas [0] .addEventListener ("error", () => reject ("onerror"))
}))

test ("onshutdown-attribute", () => new Promise ((resolve, reject) =>
{
   window .onshutdown1 = undefined;
   window .onshutdown2 = jest .fn ();

   expect (window .onshutdown1) .toBe (undefined)

   const canvas = $(`<x3d-canvas onshutdown="window.onshutdown1=this;window.onshutdown2()"></x3d-canvas>`)

   expect (window .onshutdown2) .toHaveBeenCalledTimes (0)

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`)

   canvas [0] .addEventListener ("shutdown", function (event)
   {
      try
      {
         expect (event .type) .toBe ("shutdown")
         expect (event) .toBeInstanceOf (CustomEvent)
         expect (this) .toBe (canvas [0])
         expect (window .onshutdown1) .toBe (canvas [0])
         expect (window .onshutdown2) .toHaveBeenCalledTimes (1)
         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   canvas [0] .addEventListener ("error", () => reject ("onerror"))
}))

test ("onerror-attribute", () => new Promise ((resolve, reject) =>
{
   window .onerror1 = undefined;
   window .onerror2 = jest .fn ();

   expect (window .onerror1) .toBe (undefined)

   const canvas = $(`<x3d-canvas onerror="window.onerror1=this;window.onerror2()"></x3d-canvas>`)

   expect (window .onerror2) .toHaveBeenCalledTimes (0)

   canvas .attr ("src", "https://www.example.com/does-not-exist")

   canvas [0] .addEventListener ("initialized", () => reject ("onerror"))
   canvas [0] .addEventListener ("error", function (event)
   {
      try
      {
         expect (event .type) .toBe ("error")
         expect (event) .toBeInstanceOf (CustomEvent)
         expect (this) .toBe (canvas [0])
         expect (window .onerror1) .toBe (canvas [0])
         expect (window .onerror2) .toHaveBeenCalledTimes (1)
         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })
}))

test ("src-property", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = $(`<x3d-canvas></x3d-canvas>`),
      Browser = canvas .prop ("browser");

   const src = `data:model/x3d-xml,
<X3D profile='Interchange' version='4.0'>
   <Scene>
      <Shape></Shape>
      <Material></Material>
      <Box></Box>
   </Scene>
</X3D>`;

   canvas .prop ("src", src);

   expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS");
   expect (canvas .prop ("src")) .toBe (src);
   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser);
   expect (Browser .currentScene .rootNodes) .toHaveLength (0);

   canvas .on ("initialized", () =>
   {
      try
      {
         expect (Browser .currentScene .profile .name) .toBe ("Interchange");
         expect (Browser .currentScene .components) .toHaveLength (0);

         expect (Browser .currentScene .rootNodes) .toHaveLength (3);
         expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Shape");
         expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("Material");
         expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("Box");

         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });

   canvas .on ("error", () => reject ("onerror"));
}));

test ("url-property", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = $(`<x3d-canvas></x3d-canvas>`),
      Browser = canvas .prop ("browser");

   const url = new X3D .MFString (`data:model/x3d-xml,
<X3D profile='Interchange' version='4.0'>
   <Scene>
      <Shape></Shape>
      <Material></Material>
      <Box></Box>
   </Scene>
</X3D>`);

   canvas .prop ("url", url);

   expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS");
   expect ([... canvas .prop ("url")]) .toEqual ([... url]);
   expect (canvas .prop ("url") .equals (url)) .toBe (true);
   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser);
   expect (Browser .currentScene .rootNodes) .toHaveLength (0);

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
   });

   canvas .on ("error", () => reject ("onerror"));
}));

test ("multi-url-property", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = $(`<x3d-canvas></x3d-canvas>`),
      Browser = canvas .prop ("browser");

   const url = new X3D .MFString ("https://example.com/does-not-exist", `data:model/x3d-xml,
<X3D profile='Interchange' version='4.0'>
   <Scene>
      <Shape></Shape>
      <Material></Material>
      <Box></Box>
   </Scene>
</X3D>`);

   canvas .prop ("url", url);

   expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS");
   expect ([... canvas .prop ("url")]) .toEqual ([... url]);
   expect (canvas .prop ("url") .equals (url)) .toBe (true);
   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser);
   expect (Browser .currentScene .rootNodes) .toHaveLength (0);

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
   });

   canvas .on ("error", () => reject ("onerror"));
}));

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
