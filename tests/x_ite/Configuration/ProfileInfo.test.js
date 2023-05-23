const X3D = require ("../../X3D")

test ("properties", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      profile = Browser .getProfile ("Core")

   expect (profile) .toBeInstanceOf (X3D .ProfileInfo)
   expect (profile .constructor) .toBe (X3D .ProfileInfo)
   expect (profile .name) .toBe ("Core")
   expect (profile .title) .toBe ("Core")
   expect (profile .providerUrl .length > 0) .toBe (true)
   expect (profile .providerUrl) .not .toBe ("")
   expect (profile .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (profile .components) .toHaveLength (1)
   expect (profile .components [0] .name) .toBe ("Core")

   profile .name        = undefined
   profile .title       = undefined
   profile .providerUrl = undefined
   profile .components  = undefined

   expect (profile .name) .toBe ("Core")
   expect (profile .title) .toBe ("Core")
   expect (profile .providerUrl .length > 0) .toBe (true)
   expect (profile .providerUrl) .not .toBe ("")
   expect (profile .providerUrl) .not .toBe (undefined)
   expect (profile .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (profile .components) .toHaveLength (1)
   expect (profile .components [0] .name) .toBe ("Core")

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
      "title",
      "providerUrl",
      "components",
   ]

   enumerate (properties, profile)
})
