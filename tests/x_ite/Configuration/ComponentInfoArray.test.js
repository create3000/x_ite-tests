const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("constructor", () =>
{
   const components = Browser .supportedComponents

   expect (components) .toHaveLength (36 + 2) // WebXR + X_ITE
   expect (components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (components .constructor) .toBe (X3D .ComponentInfoArray)
})

test ("filter", () =>
{
   const components = Browser .supportedComponents

   const a = components .filter (c => c .name .match (/[23]D$/))

   expect (a) .not .toBe (components)
   expect (a) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (a) .toHaveLength (3)

   expect (a [0] .name) .toBe ("Geometry2D")
   expect (a [1] .name) .toBe ("Geometry3D")
   expect (a [2] .name) .toBe ("Texturing3D")
})

test ("toString", () =>
{
   const components = Browser .supportedComponents

   expect (X3D .ComponentInfoArray .typeName) .toBe ("ComponentInfoArray")
   expect (components .getTypeName ()) .toBe ("ComponentInfoArray")
   expect (Object .prototype .toString .call (components)) .toBe (`[object ComponentInfoArray]`)
   expect (components .toString ()) .toBe (`[object ${components .getTypeName ()}]`)
})
