const X3D = require ("../../X3D")

test ("constructor", () =>
{
   const
      canvas   = X3D .createBrowser (),
      Browser  = canvas .browser,
      profiles = Browser .supportedProfiles

   expect (profiles .length) .toBeGreaterThan (0)
   expect (profiles) .toBeInstanceOf (X3D .ProfileInfoArray)
   expect (profiles .constructor) .toBe (X3D .ProfileInfoArray)
})
