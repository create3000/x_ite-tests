const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

test ("properties", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      units   = Browser .currentScene .units

   expect (units) .toHaveLength (4)

   expect (units [0]) .toBeInstanceOf (X3D .UnitInfo)
   expect (units [0] .constructor) .toBe (X3D .UnitInfo)
   expect (units [0] .category) .toBe ("angle")
   expect (units [0] .name) .toBe ("radian")
   expect (units [0] .conversionFactor) .toBe (1)
   expect (units [0] .conversion_factor) .toBe (1)

   expect (units [1]) .toBeInstanceOf (X3D .UnitInfo)
   expect (units [1] .constructor) .toBe (X3D .UnitInfo)
   expect (units [1] .category) .toBe ("force")
   expect (units [1] .name) .toBe ("newton")
   expect (units [1] .conversionFactor) .toBe (1)
   expect (units [1] .conversion_factor) .toBe (1)

   expect (units [2]) .toBeInstanceOf (X3D .UnitInfo)
   expect (units [2] .constructor) .toBe (X3D .UnitInfo)
   expect (units [2] .category) .toBe ("length")
   expect (units [2] .name) .toBe ("metre")
   expect (units [2] .conversionFactor) .toBe (1)
   expect (units [2] .conversion_factor) .toBe (1)

   expect (units [3]) .toBeInstanceOf (X3D .UnitInfo)
   expect (units [3] .constructor) .toBe (X3D .UnitInfo)
   expect (units [3] .category) .toBe ("mass")
   expect (units [3] .name) .toBe ("kilogram")
   expect (units [3] .conversionFactor) .toBe (1)
   expect (units [3] .conversion_factor) .toBe (1)
})

test ("spread", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "..", "Parser", "files", "X3D", `statements.x3d`))))

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
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "..", "Parser", "files", "X3D", `statements.x3d`)))),
      units   = scene .units

   const a = units .filter (u => u .conversionFactor !== 1)

   expect (a) .not .toBe (units)
   expect (a) .toBeInstanceOf (X3D .UnitInfoArray)
   expect (a) .toHaveLength (units .length)

   for (const [i, v] of a .entries ())
      expect (v) .toBe (units [i])
})

test ("toString", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      units   = Browser .currentScene .units

   expect (units .toString ()) .toBe (`[object ${units .getTypeName ()}]`)
})
