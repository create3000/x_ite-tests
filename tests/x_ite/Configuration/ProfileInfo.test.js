const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("properties", () =>
{
   const profile = Browser .getProfile ("Core")

   expect (profile) .toBeInstanceOf (X3D .ProfileInfo)
   expect (profile .constructor) .toBe (X3D .ProfileInfo)
   expect (profile .name) .toBe ("Core")
   expect (profile .title) .toBe ("Core")
   expect (profile .providerURL .length > 0) .toBe (true)
   expect (profile .providerURL) .not .toBe ("")
   expect (profile .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (profile .components) .toHaveLength (1)
   expect (profile .components [0] .name) .toBe ("Core")

   profile .name        = undefined
   profile .title       = undefined
   profile .providerURL = undefined
   profile .components  = undefined

   expect (profile .name) .toBe ("Core")
   expect (profile .title) .toBe ("Core")
   expect (profile .providerURL .length > 0) .toBe (true)
   expect (profile .providerURL) .not .toBe ("")
   expect (profile .providerURL) .not .toBe (undefined)
   expect (profile .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (profile .components) .toHaveLength (1)
   expect (profile .components [0] .name) .toBe ("Core")

   const properties = [
      "name",
      "title",
      "providerURL",
      "components",
   ]

   enumerate (properties, profile)
})

test ("legacy", () =>
{
   const profile = Browser .getProfile ("Core")

   expect (profile .providerUrl .length > 0) .toBe (true)
   expect (profile .providerUrl) .not .toBe ("")
})

test ("toString", () =>
{
   const profile = Browser .getProfile ("Core")

   expect (profile .toString ()) .toBe (`[object ${profile .getTypeName ()}]`)
})
