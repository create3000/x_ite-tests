const
   X3D     = require ("../../../X3D"),
   Browser = X3D .createBrowser () .browser;

Browser .setBrowserOption ("AutoUpdate", false);
Browser .beginUpdate ();

test ("timeOut 1s", () => new Promise (async resolve =>
{
   const
      scene    = await Browser .createScene (Browser .getProfile ("Interactive")),
      timer    = scene .createNode ("TimeSensor"),
      duration = 1,
      t0       = Date .now () / 1000;

   timer .startTime = t0 + duration;

   timer .addFieldCallback ("test", "isActive", value =>
   {
      if (!value)
         return;

      timer .stopTime = Date .now () / 1000;

      expect (Date .now () / 1000 >= t0 + duration) .toBe (true);
      resolve ();
   });
}));
