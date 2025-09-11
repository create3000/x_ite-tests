const
   X3D     = require ("../../../X3D"),
   Browser = X3D .createBrowser () .browser;

Browser .setBrowserOption ("AutoUpdate", false);
Browser .beginUpdate ();

test ("cycleTime", () => new Promise (async resolve =>
{
   const
      scene = await Browser .createScene (Browser .getProfile ("Interactive")),
      timer = scene .createNode ("TimeSensor");

   let
      fraction = 0,
      cycles   = 0;

   timer .addFieldCallback ("test", "cycleTime", value =>
   {
      ++ cycles;

      if (cycles === 1)
         expect (fraction) .toBe (0);
      else
         expect (fraction) .toBeGreaterThan (0.6);

      if (cycles > 3)
         resolve ();
   });

   timer .addFieldCallback ("test", "fraction_changed", value =>
   {
      fraction = value;
   });

   timer .cycleInterval = 0.25;
   timer .loop          = true;
   timer .startTime     = Date .now () / 1000;
}),
2000);

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
