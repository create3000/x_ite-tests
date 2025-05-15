const
   X3D        = require ("../../X3D"),
   Browser    = X3D .createBrowser () .browser,
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
   expect (new MFRotation (new SFRotation (1,2,3,4), new SFRotation (1,2,3,4)) .length) .toBe (2);

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

test ("fromString", () =>
{
   const a = new MFRotation ();

   a .fromString ("[1.2 2.3 3.4 4.5, 2.3 3.4 4.5 5.6 ]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFRotation (new SFRotation (1.2, 2.3, 3.4, 4.5), new SFRotation (2.3, 3.4, 4.5, 5.6)))) .toBe (true);

   a .fromString ("1 2 3 4");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFRotation (new SFRotation (1, 2, 3, 4)))) .toBe (true);

   a .fromString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFRotation ())) .toBe (true);
   const s = Browser .currentScene;

   s .updateUnit ("angle", "degree", Math .PI / 180);
   a .setUnit ("angle");

   a .fromString ("[1 2 3 90, 2 3 4 180]", s);

   expect (a) .toHaveLength (2);

   expect (a [0] .x) .toBe (1);
   expect (a [0] .y) .toBe (2);
   expect (a [0] .z) .toBe (3);
   expect (a [0] .angle) .toBeCloseTo (Math .PI / 2);

   expect (a [1] .x) .toBe (2);
   expect (a [1] .y) .toBe (3);
   expect (a [1] .z) .toBe (4);
   expect (a [1] .angle) .toBeCloseTo (Math .PI);
});

test ("fromVRMLString", () =>
{
   const a = new MFRotation ();

   a .fromVRMLString ("[1.2 2.3 3.4 4.5, 2.3 3.4 4.5 5.6 ]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFRotation (new SFRotation (1.2, 2.3, 3.4, 4.5), new SFRotation (2.3, 3.4, 4.5, 5.6)))) .toBe (true);

   a .fromVRMLString ("1 2 3 4");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFRotation (new SFRotation (1, 2, 3, 4)))) .toBe (true);

   a .fromVRMLString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFRotation ())) .toBe (true);

   const s = Browser .currentScene;

   s .updateUnit ("angle", "degree", Math .PI / 180);
   a .setUnit ("angle");

   a .fromVRMLString ("[1 2 3 90, 2 3 4 180]", s);

   expect (a) .toHaveLength (2);

   expect (a [0] .x) .toBe (1);
   expect (a [0] .y) .toBe (2);
   expect (a [0] .z) .toBe (3);
   expect (a [0] .angle) .toBeCloseTo (Math .PI / 2);

   expect (a [1] .x) .toBe (2);
   expect (a [1] .y) .toBe (3);
   expect (a [1] .z) .toBe (4);
   expect (a [1] .angle) .toBeCloseTo (Math .PI);
});
