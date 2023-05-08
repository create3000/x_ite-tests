const X3D = require ("../../X3D")

test ("properties", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      unit    = Browser .currentScene .getUnit ("angle")

   expect (unit) .toBeInstanceOf (X3D .UnitInfo)
   expect (unit .category) .toBe ("angle")
   expect (unit .name) .toBe ("radian")
   expect (unit .conversionFactor) .toBe (1)
   expect (unit .conversion_factor) .toBe (1)

   unit .category          = undefined
   unit .name              = undefined
   unit .conversionFactor  = undefined
   unit .conversion_factor = undefined

   expect (unit) .toBeInstanceOf (X3D .UnitInfo)
   expect (unit .category) .toBe ("angle")
   expect (unit .name) .toBe ("radian")
   expect (unit .conversionFactor) .toBe (1)
   expect (unit .conversion_factor) .toBe (1)
})
