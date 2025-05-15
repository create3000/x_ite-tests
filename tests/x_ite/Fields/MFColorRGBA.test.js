const
   X3D         = require ("../../X3D"),
   SFColorRGBA = X3D .SFColorRGBA,
   MFColorRGBA = X3D .MFColorRGBA;

const comp = 4;

test ("constructor", () =>
{
   expect ((new MFColorRGBA ()) [0] .equals (new SFColorRGBA ())) .toBe (true);
});

test ("get1Value", () =>
{
   const field = new MFColorRGBA ();

   expect (field) .toHaveLength (0);

   for (let i = 0; i < 10; ++ i)
   {
      expect (field [i] .equals (new SFColorRGBA ())) .toBe (true);
      expect (field) .toHaveLength (i + 1);
   }
});

test ("length", () =>
{
   expect (new MFColorRGBA () .length) .toBe (0);
   expect (new MFColorRGBA (new SFColorRGBA (1,2,3,4), new SFColorRGBA (1,2,3,4)) .length) .toBe (2);

   const m = new MFColorRGBA ();

   m .length = 10;

   expect (m) .toHaveLength (10);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFColorRGBA ())) .toBe (true);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 20; ++ i)
      expect (m [i] .equals (new SFColorRGBA ())) .toBe (true);

   // Test shrinking the array and then growing it again.

   for (let i = 0; i < 20; ++ i)
      m [i] = new SFColorRGBA (2,2,2,2);

   m .length = 10;

   expect (m) .toHaveLength (10);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFColorRGBA (2,2,2,2))) .toBe (true);

   for (let i = 10; i < 20; ++ i)
      expect (m [i] .equals (new SFColorRGBA ())) .toBe (true);
});

test ("setValue", () =>
{
   const field = new MFColorRGBA ();

   field .setValue ([1, 2, 3, 4,  10, 11, 12, 13]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFColorRGBA (new SFColorRGBA (1, 2, 3, 4), new SFColorRGBA (10, 11, 12, 13)))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFColorRGBA ())) .toBe (true);

   field .setValue (new MFColorRGBA (new SFColorRGBA (1, 2, 3, 4)));

   expect (field) .toHaveLength (1);
   expect (field .equals (new MFColorRGBA (new SFColorRGBA (1, 2, 3, 4)))) .toBe (true);

   field .setValue (new MFColorRGBA (new SFColorRGBA (1, 2, 3, 4), new SFColorRGBA (10, 11, 12, 13)));

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFColorRGBA (new SFColorRGBA (1, 2, 3, 4), new SFColorRGBA (10, 11, 12, 13)))) .toBe (true);

   field .setValue (new MFColorRGBA ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFColorRGBA ())) .toBe (true);
});

test ("assign", () =>
{
   const
      field = new MFColorRGBA (),
      value = new SFColorRGBA (1, 2, 3, 4);

   field .assign (new MFColorRGBA (value, value, value, value));

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFColorRGBA (value, value, value, value))) .toBe (true);

   field .assign (new MFColorRGBA ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFColorRGBA ())) .toBe (true);
});

test ("fromString", () =>
{
   const a = new MFColorRGBA ();

   a .fromString ("[1.2 2.3 3.4 4.5, 2.3 3.4 4.5 5.6]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFColorRGBA (new SFColorRGBA (1.2, 2.3, 3.4, 4.5), new SFColorRGBA (2.3, 3.4, 4.5, 5.6)))) .toBe (true);

   a .fromString ("1 2 3 4");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFColorRGBA (new SFColorRGBA (1, 2, 3, 4)))) .toBe (true);

   a .fromString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFColorRGBA ())) .toBe (true);
});

test ("fromVRMLString", () =>
{
   const a = new MFColorRGBA ();

   a .fromVRMLString ("[1.2 2.3 3.4 4.5, 2.3 3.4 4.5 5.6]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFColorRGBA (new SFColorRGBA (1.2, 2.3, 3.4, 4.5), new SFColorRGBA (2.3, 3.4, 4.5, 5.6)))) .toBe (true);

   a .fromVRMLString ("1 2 3 4");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFColorRGBA (new SFColorRGBA (1, 2, 3, 4)))) .toBe (true);

   a .fromVRMLString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFColorRGBA ())) .toBe (true);
});

test ("fromXMLString", () =>
{
   const a = new MFColorRGBA ();

   a .fromXMLString ("1.2 2.3 3.4 4.5, 2.3 3.4 4.5 5.6");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFColorRGBA (new SFColorRGBA (1.2, 2.3, 3.4, 4.5), new SFColorRGBA (2.3, 3.4, 4.5, 5.6)))) .toBe (true);

   a .fromXMLString ("1 2 3 4");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFColorRGBA (new SFColorRGBA (1, 2, 3, 4)))) .toBe (true);

   expect (() => a .fromXMLString ("")) .toThrow (Error);
});
