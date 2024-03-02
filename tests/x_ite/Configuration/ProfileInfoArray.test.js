const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("constructor", () =>
{
   const profiles = Browser .supportedProfiles

   expect (profiles) .toHaveLength (8)
   expect (profiles) .toBeInstanceOf (X3D .ProfileInfoArray)
   expect (profiles .constructor) .toBe (X3D .ProfileInfoArray)
})

test ("filter", () =>
{
   const profiles = Browser .supportedProfiles

   const a = profiles .filter (p => p .name .match (/^In/))

   expect (a) .not .toBe (profiles)
   expect (a) .toBeInstanceOf (X3D .ProfileInfoArray)
   expect (a) .toHaveLength (2)

   expect (a [0] .name) .toBe ("Interactive")
   expect (a [1] .name) .toBe ("Interchange")
})

test ("toString", () =>
{
   const profiles = Browser .supportedProfiles

   expect (X3D .ProfileInfoArray .typeName) .toBe ("ProfileInfoArray")
   expect (profiles .getTypeName ()) .toBe ("ProfileInfoArray")
   expect (Object .prototype .toString .call (profiles)) .toBe (`[object ProfileInfoArray]`)
   expect (profiles .toString ()) .toBe (`[object ${profiles .getTypeName ()}]`)
})
