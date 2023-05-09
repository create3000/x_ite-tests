const X3D = require ("../../X3D")

test ("properties", () =>
{
   const
      canvas    = X3D .createBrowser (),
      Browser   = canvas .browser,
      component = Browser .getComponent ("Core")

   expect (component) .toBeInstanceOf (X3D .ComponentInfo)
   expect (component .name) .toBe ("Core")
   expect (component .level) .toBe (2)
   expect (component .title) .toBe ("Core")
   expect (component .providerUrl .length > 0) .toBe (true)
   expect (component .providerUrl) .not .toBe ("")

   component .name        = undefined
   component .level       = undefined
   component .title       = undefined
   component .providerUrl = undefined

   expect (component .name) .toBe ("Core")
   expect (component .level) .toBe (2)
   expect (component .title) .toBe ("Core")
   expect (component .providerUrl .length > 0) .toBe (true)
   expect (component .providerUrl) .not .toBe ("")
   expect (component .providerUrl) .not .toBe (undefined)

   function enumerate (properties, target)
   {
      const
         a = { },
         b = { }

      for (const property in target)
         a [property] = true

      for (const property of properties)
         b [property] = true

      expect (a) .toEqual (b)
   }

   const properties = [
      "name",
      "level",
      "title",
      "providerUrl",
   ]

   enumerate (properties, component)
})
