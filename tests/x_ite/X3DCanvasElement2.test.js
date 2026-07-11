const
   X3D = require ("../X3D"),
   $   = require ("jquery");

test ("attributes", () =>
{
   const
      canvas  = $(`<x3d-canvas></x3d-canvas>`),
      browser = canvas .prop ("browser");

   expect (browser .getBrowserOption ("Antialiased")) .toBe (true);
   canvas .attr ("antialiased", "false");
   expect (browser .getBrowserOption ("Antialiased")) .toBe (false);
   canvas .attr ("antialiased", "true");
   expect (browser .getBrowserOption ("Antialiased")) .toBe (true);
   canvas .attr ("antialiased", "false");
   expect (browser .getBrowserOption ("Antialiased")) .toBe (false);
   canvas .attr ("antialiased", "foo");
   expect (browser .getBrowserOption ("Antialiased")) .toBe (true);

   canvas .attr ("baseurl", "https://example.com/");
   expect (browser .baseURL) .toBe ("https://example.com/");

   expect (browser .getBrowserOption ("Cache")) .toBe (true);
   canvas .attr ("cache", "false");
   expect (browser .getBrowserOption ("Cache")) .toBe (false);
   canvas .attr ("cache", "true");
   expect (browser .getBrowserOption ("Cache")) .toBe (true);
   canvas .attr ("cache", "false");
   expect (browser .getBrowserOption ("Cache")) .toBe (false);
   canvas .attr ("cache", "foo");
   expect (browser .getBrowserOption ("Cache")) .toBe (true);

   expect (browser .getBrowserOption ("ColorSpace")) .toBe ("LINEAR_WHEN_PHYSICAL_MATERIAL");
   canvas .attr ("colorspace", "LINEAR");
   expect (browser .getBrowserOption ("ColorSpace")) .toBe ("LINEAR");
   canvas .attr ("colorspace", "");
   expect (browser .getBrowserOption ("ColorSpace")) .toBe ("LINEAR_WHEN_PHYSICAL_MATERIAL");

   expect (browser .getBrowserOption ("ContentScale")) .toBe (1);
   canvas .attr ("contentscale", "auto");
   expect (browser .getBrowserOption ("ContentScale")) .toBe (-1);
   canvas .attr ("contentscale", "2");
   expect (browser .getBrowserOption ("ContentScale")) .toBe (2);

   expect (browser .getBrowserOption ("ContextMenu")) .toBe (true);
   canvas .attr ("contextmenu", "false");
   expect (browser .getBrowserOption ("ContextMenu")) .toBe (false);
   canvas .attr ("contextmenu", "true");
   expect (browser .getBrowserOption ("ContextMenu")) .toBe (true);
   canvas .attr ("contextmenu", "false");
   expect (browser .getBrowserOption ("ContextMenu")) .toBe (false);
   canvas .attr ("contextmenu", "foo");
   expect (browser .getBrowserOption ("ContextMenu")) .toBe (true);

   expect (browser .getBrowserOption ("Debug")) .toBe (false);
   canvas .attr ("debug", "true");
   expect (browser .getBrowserOption ("Debug")) .toBe (true);
   canvas .attr ("debug", "false");
   expect (browser .getBrowserOption ("Debug")) .toBe (false);
   canvas .attr ("debug", "true");
   expect (browser .getBrowserOption ("Debug")) .toBe (true);
   canvas .attr ("debug", "foo");
   expect (browser .getBrowserOption ("Debug")) .toBe (false);

   expect (browser .getBrowserOption ("DisplayColorSpace")) .toBe ("SRGB");
   canvas .attr ("displaycolorspace", "DISPLAY_P3");
   expect (browser .getBrowserOption ("DisplayColorSpace")) .toBe ("DISPLAY_P3");
   canvas .attr ("displaycolorspace", "");
   expect (browser .getBrowserOption ("DisplayColorSpace")) .toBe ("SRGB");

   expect (browser .getBrowserOption ("Exposure")) .toBe (1);
   canvas .attr ("exposure", "0.5");
   expect (browser .getBrowserOption ("Exposure")) .toBe (0.5);
   canvas .attr ("exposure", "2");
   expect (browser .getBrowserOption ("Exposure")) .toBe (2);

   expect (browser .getBrowserOption ("LogarithmicDepthBuffer")) .toBe (false);
   canvas .attr ("logarithmicdepthbuffer", "true");
   expect (browser .getBrowserOption ("LogarithmicDepthBuffer")) .toBe (true);
   canvas .attr ("logarithmicdepthbuffer", "false");
   expect (browser .getBrowserOption ("LogarithmicDepthBuffer")) .toBe (false);
   canvas .attr ("logarithmicdepthbuffer", "true");
   expect (browser .getBrowserOption ("LogarithmicDepthBuffer")) .toBe (true);
   canvas .attr ("logarithmicdepthbuffer", "foo");
   expect (browser .getBrowserOption ("LogarithmicDepthBuffer")) .toBe (false);

   expect (browser .getBrowserOption ("MaximumFrameRate")) .toBe (80);
   canvas .attr ("maximumframerate", "120");
   expect (browser .getBrowserOption ("MaximumFrameRate")) .toBe (120);
   canvas .attr ("maximumframerate", "30");
   expect (browser .getBrowserOption ("MaximumFrameRate")) .toBe (30);

   expect (browser .getBrowserOption ("Multisampling")) .toBe (4);
   canvas .attr ("multisampling", "1");
   expect (browser .getBrowserOption ("Multisampling")) .toBe (1);
   canvas .attr ("multisampling", "2");
   expect (browser .getBrowserOption ("Multisampling")) .toBe (2);

   // oninitialized is tested below.
   // onshutdown is tested below.

   expect (browser .getBrowserOption ("Notifications")) .toBe (true);
   canvas .attr ("notifications", "false");
   expect (browser .getBrowserOption ("Notifications")) .toBe (false);
   canvas .attr ("notifications", "true");
   expect (browser .getBrowserOption ("Notifications")) .toBe (true);
   canvas .attr ("notifications", "false");
   expect (browser .getBrowserOption ("Notifications")) .toBe (false);
   canvas .attr ("notifications", "foo");
   expect (browser .getBrowserOption ("Notifications")) .toBe (true);

   expect (browser .getBrowserOption ("OrderIndependentTransparency")) .toBe (false);
   canvas .attr ("orderindependenttransparency", "true");
   expect (browser .getBrowserOption ("OrderIndependentTransparency")) .toBe (true);
   canvas .attr ("orderindependenttransparency", "false");
   expect (browser .getBrowserOption ("OrderIndependentTransparency")) .toBe (false);
   canvas .attr ("orderindependenttransparency", "true");
   expect (browser .getBrowserOption ("OrderIndependentTransparency")) .toBe (true);
   canvas .attr ("orderindependenttransparency", "foo");
   expect (browser .getBrowserOption ("OrderIndependentTransparency")) .toBe (false);

   expect (browser .getBrowserOption ("SplashScreen")) .toBe (true);
   canvas .attr ("splashscreen", "false");
   expect (browser .getBrowserOption ("SplashScreen")) .toBe (false);
   canvas .attr ("splashscreen", "true");
   expect (browser .getBrowserOption ("SplashScreen")) .toBe (true);
   canvas .attr ("splashscreen", "false");
   expect (browser .getBrowserOption ("SplashScreen")) .toBe (false);
   canvas .attr ("splashscreen", "foo");
   expect (browser .getBrowserOption ("SplashScreen")) .toBe (true);

   // src is tested below.

   expect (browser .getBrowserOption ("TextCompression")) .toBe ("CHAR_SPACING");
   canvas .attr ("textcompression", "SCALING");
   expect (browser .getBrowserOption ("TextCompression")) .toBe ("SCALING");
   canvas .attr ("textcompression", "");
   expect (browser .getBrowserOption ("TextCompression")) .toBe ("CHAR_SPACING");

   expect (browser .getBrowserOption ("Timings")) .toBe (false);
   canvas .attr ("timings", "true");
   expect (browser .getBrowserOption ("Timings")) .toBe (true);
   canvas .attr ("timings", "false");
   expect (browser .getBrowserOption ("Timings")) .toBe (false);
   canvas .attr ("timings", "true");
   expect (browser .getBrowserOption ("Timings")) .toBe (true);
   canvas .attr ("timings", "foo");
   expect (browser .getBrowserOption ("Timings")) .toBe (false);

   expect (browser .getBrowserOption ("ToneMapping")) .toBe ("NONE");
   canvas .attr ("tonemapping", "KHR_PBR_NEUTRAL");
   expect (browser .getBrowserOption ("ToneMapping")) .toBe ("KHR_PBR_NEUTRAL");
   canvas .attr ("tonemapping", "");
   expect (browser .getBrowserOption ("ToneMapping")) .toBe ("NONE");

   expect (browser .getBrowserOption ("AutoUpdate")) .toBe (false);
   canvas .attr ("update", "auto");
   expect (browser .getBrowserOption ("AutoUpdate")) .toBe (true);
   expect (browser .isLive ()) .toBe (true);
   canvas .attr ("update", "false");
   expect (browser .isLive ()) .toBe (false);
   canvas .attr ("update", "true");
   expect (browser .isLive ()) .toBe (true);
   canvas .attr ("update", "false");
   expect (browser .isLive ()) .toBe (false);
   canvas .attr ("update", "foo");
   expect (browser .isLive ()) .toBe (true);

   // url is tested below.

   expect (browser .getBrowserOption ("XRSessionMode")) .toBe ("IMMERSIVE_VR");
   canvas .attr ("xrsessionmode", "IMMERSIVE_AR");
   expect (browser .getBrowserOption ("XRSessionMode")) .toBe ("IMMERSIVE_AR");
   canvas .attr ("xrsessionmode", "");
   expect (browser .getBrowserOption ("XRSessionMode")) .toBe ("IMMERSIVE_VR");
});

test ("onload-attribute", () => new Promise ((resolve, reject) =>
{
   window .onload1 = undefined;
   window .onload2 = jest .fn ();

   expect (window .onload1) .toBe (undefined);

   const canvas = $(`<x3d-canvas onload="window.onload1=this;window.onload2()"></x3d-canvas>`);

   expect (window .onload2) .toHaveBeenCalledTimes (1);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas [0] .addEventListener ("load", function (event)
   {
      try
      {
         expect (event .type) .toBe ("load");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         expect (window .onload1) .toBe (canvas [0]);
         expect (window .onload2) .toHaveBeenCalledTimes (2);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });

   canvas [0] .addEventListener ("error", () => reject ("onerror"));
}));

test ("oninitialized-attribute", () => new Promise ((resolve, reject) =>
{
   window .oninitialized1 = undefined;
   window .oninitialized2 = jest .fn ();

   expect (window .oninitialized1) .toBe (undefined);

   const canvas = $(`<x3d-canvas oninitialized="window.oninitialized1=this;window.oninitialized2()"></x3d-canvas>`);

   expect (window .oninitialized2) .toHaveBeenCalledTimes (0);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas [0] .addEventListener ("initialized", function (event)
   {
      try
      {
         expect (event .type) .toBe ("initialized");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         expect (window .oninitialized1) .toBe (canvas [0]);
         expect (window .oninitialized2) .toHaveBeenCalledTimes (1);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });

   canvas [0] .addEventListener ("error", () => reject ("onerror"));
}));

test ("onshutdown-attribute", () => new Promise ((resolve, reject) =>
{
   window .onshutdown1 = undefined;
   window .onshutdown2 = jest .fn ();

   expect (window .onshutdown1) .toBe (undefined);

   const canvas = $(`<x3d-canvas onshutdown="window.onshutdown1=this;window.onshutdown2()"></x3d-canvas>`);

   expect (window .onshutdown2) .toHaveBeenCalledTimes (0);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas [0] .addEventListener ("shutdown", function (event)
   {
      try
      {
         expect (event .type) .toBe ("shutdown");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         expect (window .onshutdown1) .toBe (canvas [0]);
         expect (window .onshutdown2) .toHaveBeenCalledTimes (1);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });

   canvas [0] .addEventListener ("error", () => reject ("onerror"));
}));

test ("onerror-attribute", () => new Promise ((resolve, reject) =>
{
   window .onerror1 = undefined;
   window .onerror2 = jest .fn ();

   expect (window .onerror1) .toBe (undefined);

   const canvas = $(`<x3d-canvas onerror="window.onerror1=this;window.onerror2()"></x3d-canvas>`);

   expect (window .onerror2) .toHaveBeenCalledTimes (0);

   canvas .attr ("src", "https://www.example.com/does-not-exist");

   canvas [0] .addEventListener ("initialized", () => reject ("onerror"));
   canvas [0] .addEventListener ("error", function (event)
   {
      try
      {
         expect (event .type) .toBe ("error");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         expect (window .onerror1) .toBe (canvas [0]);
         expect (window .onerror2) .toHaveBeenCalledTimes (1);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });
}));

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

test ("src-attribute", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = $(`<x3d-canvas></x3d-canvas>`),
      Browser = canvas .prop ("browser");

   canvas .attr ("src", `data:model/x3d-xml,
<X3D profile='Interchange' version='4.0'>
   <Scene>
      <Shape></Shape>
      <Material></Material>
      <Box></Box>
   </Scene>
</X3D>`);

   expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS");
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

test ("url-attribute", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = $(`<x3d-canvas></x3d-canvas>`),
      Browser = canvas .prop ("browser");

   canvas .attr ("url", `"data:model/x3d-xml,
<X3D profile='Interchange' version='4.0'>
   <Scene>
      <Shape></Shape>
      <Material></Material>
      <Box></Box>
   </Scene>
</X3D>"`);

   expect (canvas .prop ("nodeName")) .toBe ("X3D-CANVAS");
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
