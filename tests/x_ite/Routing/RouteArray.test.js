const X3D = require ("../../X3D")

test ("properties", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .currentScene,
      routes  = scene .routes

   expect (routes) .toHaveLength (0)
   expect (routes) .toBeInstanceOf (X3D .RouteArray)
   expect (routes .constructor) .toBe (X3D .RouteArray)
})
