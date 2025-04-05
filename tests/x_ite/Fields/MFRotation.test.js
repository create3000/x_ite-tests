const
   X3D        = require ("../../X3D"),
   MFRotation = X3D .MFRotation,
   SFRotation = X3D .SFRotation;

const comp = 4;

test ("constructor", () =>
{
   expect ((new MFRotation ()) [0] .equals (new SFRotation ())) .toBe (true);
   expect ((new MFRotation ()) [0] .equals (new SFRotation (0,0,1,0))) .toBe (true);
   expect ((new MFRotation ()) [0] .toString ()) .toBe ("0 0 1 0");
});

test ("get1Value", () =>
{
   const field = new MFRotation ();

   expect (field) .toHaveLength (0);

   for (let i = 0; i < 10; ++ i)
   {
      expect (field [i] .equals (new SFRotation ())) .toBe (true);
      expect (field) .toHaveLength (i + 1);
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

test ("setValue", () =>
{
   const field = new MFRotation ();

   field .setValue ([1, 2, 3, 4, 5, 6, 7, 8]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFRotation (new SFRotation (1, 2, 3, 4), new SFRotation (5, 6, 7, 8)))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFRotation ())) .toBe (true);

   field .setValue (new MFRotation (new SFRotation (1, 2, 3, 4)));

   expect (field) .toHaveLength (1);
   expect (field .equals (new MFRotation (new SFRotation (1, 2, 3, 4)))) .toBe (true);

   field .setValue (new MFRotation (new SFRotation (1, 2, 3, 4), new SFRotation (5, 6, 7, 8)));

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFRotation (new SFRotation (1, 2, 3, 4), new SFRotation (5, 6, 7, 8)))) .toBe (true);

   field .setValue (new MFRotation ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFRotation ())) .toBe (true);
});

test ("assign", () =>
{
   const
      field = new MFRotation (),
      value = new SFRotation (1, 2, 3, 4);

   field .assign (new MFRotation (value, value, value, value));

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFRotation (value, value, value, value))) .toBe (true);

   field .assign (new MFRotation ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFRotation ())) .toBe (true);
});
