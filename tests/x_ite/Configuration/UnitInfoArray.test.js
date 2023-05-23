const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

test ("spread", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "..", "Parser", "files", `statements.x3d`))))

   const units = scene .units

   expect (units) .toBeInstanceOf (X3D .UnitInfoArray)
   expect (units .constructor) .toBe (X3D .UnitInfoArray)

   const a = [... units]

   expect (a) .toHaveLength (units .length)

   for (const [i, v] of a .entries ())
      expect (v) .toBe (units [i])
})

test ("filter", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "..", "Parser", "files", `statements.x3d`)))),
      units   = scene .units

   const a = units .filter (u => u .conversionFactor !== 1)

   expect (a) .not .toBe (units)
   expect (a) .toBeInstanceOf (X3D .UnitInfoArray)
   expect (a) .toHaveLength (units .length)

   for (const [i, v] of a .entries ())
      expect (v) .toBe (units [i])
})
