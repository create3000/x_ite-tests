const
   X3D     = require ("../../../X3D"),
   Browser = X3D .createBrowser () .browser;

Browser .setBrowserOption ("AutoUpdate", false);
Browser .beginUpdate ();

test ("events", () => new Promise (async (resolve, reject) =>
{
   const
      scene     = await Browser .createScene (Browser .getProfile ("Interactive")),
      timer     = scene .createNode ("TimeSensor"),
      numCycles = 4;

   let
      cycles      = 0,
      fraction    = 0,
      elapsedTime = -1,
      time        = -1;

   timer .addFieldCallback ("test", "isActive", value =>
   {
      try
      {
         if (value)
         {
            expect (cycles) .toBe (0);
            expect (fraction) .toBe (0);
            expect (elapsedTime) .toBe (-1);
            expect (time) .toBe (-1);
         }
         else
         {
            expect (cycles) .toBe (numCycles);
            expect (elapsedTime) .toBeGreaterThan (0);
            expect (time) .toBeGreaterThan (0);
            expect (time) .toBeLessThanOrEqual (Browser .getCurrentTime ());
            resolve ();
         }
      }
      catch (error)
      {
         reject (error);
      }
   });

   timer .addFieldCallback ("test", "cycleTime", value =>
   {
      try
      {
         ++ cycles;

         if (cycles === 1)
            expect (fraction) .toBe (0);
         else
            expect (fraction) .toBeGreaterThan (0.6);

         expect (elapsedTime) .toBeGreaterThanOrEqual (0);
         expect (time) .toBe (Browser .getCurrentTime ());

         if (cycles < numCycles)
            return;

         timer .stopTime = Date .now () / 1_000;
      }
      catch (error)
      {
         reject (error);
      }
   });

   timer .addFieldCallback ("test", "fraction_changed", value =>
   {
      fraction = value;
   });

   timer .addFieldCallback ("test", "elapsedTime", value =>
   {
      try
      {
         expect (value) .toBeGreaterThanOrEqual (0);
         expect (value) .toBeGreaterThanOrEqual (elapsedTime);

         elapsedTime = value;
      }
      catch (error)
      {
         reject (error);
      }
   });

   timer .addFieldCallback ("test", "time", value =>
   {
      try
      {
         expect (value) .toBeGreaterThanOrEqual (0);
         expect (value) .toBeGreaterThanOrEqual (time);

         time = value;
      }
      catch (error)
      {
         reject (error);
      }
   });

   timer .cycleInterval = 1 / 3;
   timer .loop          = true;
   timer .startTime     = Date .now () / 1_000;
}),
2_000);

test ("timeOut 1s", () => new Promise (async (resolve, reject) =>
{
   const
      scene    = await Browser .createScene (Browser .getProfile ("Interactive")),
      timer    = scene .createNode ("TimeSensor"),
      duration = 1,
      t0       = Date .now () / 1_000;

   timer .startTime = t0 + duration;

   timer .addFieldCallback ("test", "isActive", value =>
   {
      try
      {
         if (!value)
            return;

         timer .stopTime = Date .now () / 1_000;

         expect (Date .now () / 1_000 >= t0 + duration) .toBe (true);
         resolve ();
      }
      catch (error)
      {
         reject (error);
      }
   });
}),
2_000);
