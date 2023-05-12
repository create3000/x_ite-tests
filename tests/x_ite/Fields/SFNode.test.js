const X3D = require ("../../X3D")

test ("toString", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .currentScene,
      node    = scene .createNode ("WorldInfo")

   expect (node .toString ()) .toMatch (/^\w+ { }$/)
})
