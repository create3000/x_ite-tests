const
   X3D       = require ("../../X3D"),
   X3DObject = X3D .X3DObject

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   scene   = Browser .currentScene

test ("getId", () =>
{
   expect (X3DObject .getId ({ })) .not .toBe ({ })
   expect (Browser .getId ()) .not .toBe (scene .getId ())
})

test ("addInterest", () => new Promise ((resolve, reject) =>
{
   const
      browser = X3D .createBrowser () .browser,
      node    = browser .currentScene .createNode ("Transform");

   const object =
   {
      callback1 ()
      {
         resolve ();
      },
   };

   node .translation .addInterest ("callback1", object);
   node .translation .addEvent ();
}));

test ("add/removeInterest", () => new Promise ((resolve, reject) =>
{
   const
      browser = X3D .createBrowser () .browser,
      node    = browser .currentScene .createNode ("Transform");

   const object =
   {
      callback1 ()
      {
         node .translation .removeInterest ("callback1", object);
         node .translation .addInterest ("callback2", object);
         node .translation .addEvent ();
      },

      callback2 ()
      {
         resolve ();
      },
   };

   node .translation .addInterest ("callback1", object);
   node .translation .addEvent ();
}));

test ("get/setUserData", () =>
{
   const s = Symbol (), o = { }

   expect (Browser .getUserData (123)) .toBe (undefined)
   expect (Browser .getUserData (s))   .toBe (undefined)
   expect (Browser .getUserData (o))   .toBe (undefined)

   Browser .setUserData (123, 456)
   Browser .setUserData (s, "string")
   Browser .setUserData (o, "object")

   expect (Browser .getUserData (123)) .toBe (456)
   expect (Browser .getUserData (s))   .toBe ("string")
   expect (Browser .getUserData (o))   .toBe ("object")

   Browser .removeUserData (123)
   Browser .removeUserData (s)
   Browser .removeUserData (o)

   expect (Browser .getUserData (123)) .toBe (undefined)
   expect (Browser .getUserData (s))   .toBe (undefined)
   expect (Browser .getUserData (o))   .toBe (undefined)
})
