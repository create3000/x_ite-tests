const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("properties", () =>
{
   const component = Browser .getComponent ("Core")

   expect (component) .toBeInstanceOf (X3D .ComponentInfo)
   expect (component .constructor) .toBe (X3D .ComponentInfo)
   expect (component .name) .toBe ("Core")
   expect (component .level) .toBe (2)
   expect (component .title) .toBe ("Core")
   expect (component .providerURL .length > 0) .toBe (true)
   expect (component .providerURL) .not .toBe ("")

   component .name        = undefined
   component .level       = undefined
   component .title       = undefined
   component .providerURL = undefined
   component .providerUrl = undefined

   expect (component .name) .toBe ("Core")
   expect (component .level) .toBe (2)
   expect (component .title) .toBe ("Core")
   expect (component .providerURL .length > 0) .toBe (true)
   expect (component .providerURL) .not .toBe ("")
   expect (component .providerURL) .not .toBe (undefined)

   const properties = [
      "name",
      "level",
      "title",
      "providerURL",
   ]

   enumerate (properties, component)
})

test ("legacy", () =>
{
   const component = Browser .getComponent ("Core")

   expect (component .providerUrl) .toBe (component .providerURL)

   expect (Browser .getComponent ("H-Anim") .name) .toBe ("HAnim")
})

test ("toString", () =>
{
   const component = Browser .getComponent ("Core")

   expect (X3D .ComponentInfo .typeName) .toBe ("ComponentInfo")
   expect (component .getTypeName ()) .toBe ("ComponentInfo")
   expect (Object .prototype .toString .call (component)) .toBe (`[object ComponentInfo]`)
   expect (component .toString ()) .toBe (`[object ${component .getTypeName ()}]`)
})
