import { expect, test } from "vitest";
import X3D              from "../../../X3D.js";

const Browser = X3D .createBrowser () .browser;

Browser .setBrowserOption ("AutoUpdate", false);
Browser .beginUpdate ();

test .concurrent ("events", () => new Promise (async (resolve, reject) =>
{
   const
      scene     = await Browser .createScene (Browser .getProfile ("Interactive")),
      timer     = scene .createNode ("TimeSensor"),
      numCycles = 4;

   let
      cycles            = 0,
      cycleComplete     = 0,
      cycleCompleteTime = 0,
      cycleCount        = 0,
      cycleCounts       = [ ],
      fraction          = -1,
      elapsedTime       = -1,
      time              = -1;

   timer .addFieldCallback ("test", "isActive", value =>
   {
      try
      {
         if (value)
         {
            expect (cycles) .toBe (0);
            expect (fraction) .toBe (-1);
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
         expect (time)        .toBe (value);
         expect (elapsedTime) .toBeGreaterThanOrEqual (0);

         expect (cycleComplete)     .toBe (cycles);
         expect (cycleCompleteTime) .toBe (cycles);
         expect (cycleCount)        .toBe (cycles);

         ++ cycles;

         if (cycles === 1)
            expect (fraction) .toBe (-1);
         else
            expect (fraction) .toBeGreaterThan (0.6);

         expect (elapsedTime) .toBeGreaterThanOrEqual (0);
         expect (time) .toBe (Browser .getCurrentTime ());

         if (cycles < numCycles)
            return;

         expect (cycleComplete)     .toBe (numCycles - 1);
         expect (cycleCompleteTime) .toBe (numCycles - 1);
         expect (cycleCount)        .toBe (numCycles - 1);

         expect (cycleCounts) .toEqual ([... Array (numCycles) .keys ()]);

         timer .stopTime = Date .now () / 1_000;
      }
      catch (error)
      {
         reject (error);
      }
   });

   timer .addFieldCallback ("test", "cycleComplete", () =>
   {
      ++ cycleComplete;

      expect (cycleComplete) .toBe (cycleCount);
      expect (cycleComplete) .toBe (cycles);
   });

   timer .addFieldCallback ("test", "cycleCompleteTime", () =>
   {
      ++ cycleCompleteTime;

      expect (cycleCompleteTime) .toBe (cycleCount);
      expect (cycleCompleteTime) .toBe (cycles);
   });

   timer .addFieldCallback ("test", "cycleCount", value =>
   {
      if (value === 0)
      {
         expect (cycleComplete)     .toBe (0);
         expect (cycleCompleteTime) .toBe (0);
      }
      else
      {
         // event comes before cycleComplete and cycleCompleteTime
         expect (value) .toBe (cycleComplete + 1);
         expect (value) .toBe (cycleCompleteTime + 1);
      }

      cycleCount = value;

      cycleCounts .push (value);
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

test .concurrent ("timeOut 1s", () => new Promise (async (resolve, reject) =>
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
