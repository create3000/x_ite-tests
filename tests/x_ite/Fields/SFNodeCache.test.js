const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   scene   = Browser .currentScene,
   node    = scene .createNode ("WorldInfo");

test ("get", () =>
{
   const n = X3D .SFNodeCache .get (node .getValue ());

   expect (n) .toBe (node);
   expect (n .getValue ()) .toBe (node .getValue ());
   expect (n) .toBe (X3D .SFNodeCache .get (node .getValue ()));
});

test ("delete", () =>
{
   X3D .SFNodeCache .delete (node .getValue ());

   const n = X3D .SFNodeCache .get (node .getValue ());

   expect (n) .toBeInstanceOf (X3D .SFNode);
   expect (n) .not .toBe (node);
   expect (n .getValue ()) .toBe (node .getValue ());
   expect (n) .toBe (X3D .SFNodeCache .get (node .getValue ()));
});

test ("add", () =>
{
   X3D .SFNodeCache .delete (node .getValue ());
   X3D .SFNodeCache .add (node .getValue (), node);

   const n = X3D .SFNodeCache .get (node .getValue ());

   expect (n) .toBeInstanceOf (X3D .SFNode);
   expect (n) .toBe (node);
   expect (n .getValue ()) .toBe (node .getValue ());
   expect (n) .toBe (X3D .SFNodeCache .get (node .getValue ()));
});
