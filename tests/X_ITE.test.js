const
   $                = require ("jquery"),
   X3D              = require ("./X3D"),
   X3DCanvasElement = X3D .X3DCanvasElement,
   DEVELOPMENT      = X3D .DEVELOPMENT;

test ("noConflict", () =>
{
   expect (X3D .noConflict ()) .toBe (X3D);
});

test ("createBrowser", () =>
{
   const canvas = X3D .createBrowser ();

   expect (canvas) .toBeInstanceOf (X3DCanvasElement);
   expect (X3D .getBrowser (canvas)) .toBe (canvas .browser);
   expect (canvas .browser) .toBeInstanceOf (X3D .X3DBrowser);
});

test ("getBrowser", () =>
{
   const canvas = $(X3D .createBrowser ());

   canvas .addClass ("browser");

   expect (X3D .getBrowser ()) .toBe (undefined);

   $("body") .append (canvas);

   expect (X3D .getBrowser ()) .toBe (canvas [0] .browser);
   expect (X3D .getBrowser (canvas [0])) .toBe (canvas [0] .browser);
   expect (X3D .getBrowser (canvas)) .toBe (canvas [0] .browser);
   expect (X3D .getBrowser (".browser")) .toBe (canvas [0] .browser);
});

test ("X3D-classic", () => new Promise ((resolve, reject) =>
{
   X3D (() =>
   {
      resolve ();
   },
   (error) =>
   {
      reject (error .message);
   });
}));

test ("X3D-async", async () =>
{
   await X3D ();
});

test ("DEVELOPMENT", () =>
{
   expect (DEVELOPMENT) .toBe (false);
});

test ("X3D", async () =>
{
   const Browser = X3D .createBrowser () .browser;

   await Browser .loadComponents (Browser .getProfile ("Full"));

   for (const key in X3D .Namespace)
      expect (X3D [key]) .toBe (X3D .Namespace [key]);

   for (const key in X3D .Fields)
      expect (X3D [key]) .toBe (X3D .Fields [key]);

   for (const ConcreteNode of Browser .getConcreteNodes ())
      expect (X3D [ConcreteNode .typeName]) .toBe (ConcreteNode);

   const values = new Set (Object .values (X3D));

   for (const AbstractNode of Browser .getAbstractNodes ())
      expect (values .has (AbstractNode)) .toBe (true);


   expect (X3D .Namespace .hasOwnProperty ("call")) .toBe (false);
   expect (X3D .Namespace .hasOwnProperty ("apply")) .toBe (false);
   expect (X3D .Namespace .hasOwnProperty ("bind")) .toBe (false);
   expect (X3D .Namespace .hasOwnProperty ("toString")) .toBe (false);

   expect (X3D .hasOwnProperty ("add")) .toBe (false);
   expect (X3D .hasOwnProperty ("has")) .toBe (false);
   expect (X3D .hasOwnProperty ("set")) .toBe (false);
   expect (X3D .hasOwnProperty ("get")) .toBe (false);
   expect (X3D .hasOwnProperty ("delete")) .toBe (false);
   expect (X3D .hasOwnProperty ("clear")) .toBe (false);
   expect (X3D .hasOwnProperty ("size")) .toBe (false);
   expect (X3D .hasOwnProperty ("forEach")) .toBe (false);
   expect (X3D .hasOwnProperty ("entries")) .toBe (false);
   expect (X3D .hasOwnProperty ("keys")) .toBe (false);
   expect (X3D .hasOwnProperty ("values")) .toBe (false);
   expect (X3D .hasOwnProperty ("toString")) .toBe (true);
});
