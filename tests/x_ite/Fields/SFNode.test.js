const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   scene   = Browser .currentScene,
   load    = Browser .loadComponents (Browser .getProfile ("Full"))

test ("toString", async () =>
{
   await load;

   const node = scene .createNode ("WorldInfo")

   expect (node .toString ()) .toMatch (/^\w+ { }$/)
})
