const
   X3D        = require ("../../X3D"),
   MFRotation = X3D .MFRotation,
   SFRotation = X3D .SFRotation;

const comp = 4;

test ("constructor", () =>
{
   expect ((new MFRotation ()) [0]) .toBe (undefined);
});

test ("get1Value", () =>
{
   const field = new MFRotation ();

   expect (field) .toHaveLength (0);

   for (let i = 0; i < 10; ++ i)
   {
      expect (field [i]) .toBe (undefined);
      expect (field) .toHaveLength (0);
   }
});

test ("length", () =>
{
   expect (new MFRotation () .length) .toBe (0);

   const m = new MFRotation ();

   m .length = 10;

   expect (m) .toHaveLength (10);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFRotation ())) .toBe (true);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 20; ++ i)
      expect (m [i] .equals (new SFRotation ())) .toBe (true);

   // Test shrinking the array and then growing it again.

   for (let i = 0; i < 20; ++ i)
      m [i] = new SFRotation (2,2,2,2);

   m .length = 10;

   expect (m) .toHaveLength (10);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFRotation (2,2,2,2))) .toBe (true);

   for (let i = 10; i < 20; ++ i)
      expect (m [i] .equals (new SFRotation ())) .toBe (true);
});
