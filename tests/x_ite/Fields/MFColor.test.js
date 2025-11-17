const
   X3D     = require ("../../X3D"),
   SFColor = X3D .SFColor,
   MFColor = X3D .MFColor;

const comp = 3;

test ("constructor", () =>
{
   expect ((new MFColor ()) [0] .equals (new SFColor ())) .toBe (true);
});

test ("get1Value", () =>
{
   const field = new MFColor ();

   expect (field) .toHaveLength (0);

   for (let i = 0; i < 10; ++ i)
   {
      expect (field [i] .equals (new SFColor ())) .toBe (true);
      expect (field) .toHaveLength (i + 1);
   }
});

test ("length", () =>
{
   expect (new MFColor () .length) .toBe (0);
   expect (new MFColor (new SFColor (1,2,3), new SFColor (1,2,3)) .length) .toBe (2);

   const m = new MFColor ();

   m .length = 10;

   expect (m) .toHaveLength (10);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFColor ())) .toBe (true);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 20; ++ i)
      expect (m [i] .equals (new SFColor ())) .toBe (true);

   // Test shrinking the array and then growing it again.

   for (let i = 0; i < 20; ++ i)
      m [i] = new SFColor (2,2,2);

   m .length = 10;

   expect (m) .toHaveLength (10);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFColor (2,2,2))) .toBe (true);

   for (let i = 10; i < 20; ++ i)
      expect (m [i] .equals (new SFColor ())) .toBe (true);
});

test ("setValue", () =>
{
   const field = new MFColor ();

   field .setValue ([1, 2, 3, 10, 11, 12]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFColor (new SFColor (1, 2, 3), new SFColor (10, 11, 12)))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFColor ())) .toBe (true);

   field .setValue (new MFColor (new SFColor (1, 2, 3)));

   expect (field) .toHaveLength (1);
   expect (field .equals (new MFColor (new SFColor (1, 2, 3)))) .toBe (true);

   field .setValue (new MFColor (new SFColor (1, 2, 3), new SFColor (10, 11, 12)));

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFColor (new SFColor (1, 2, 3), new SFColor (10, 11, 12)))) .toBe (true);

   field .setValue (new MFColor ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFColor ())) .toBe (true);
});

test ("assign", () =>
{
   const
      field = new MFColor (),
      value = new SFColor (1, 2, 3);

   field .assign (new MFColor (value, value, value, value));

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFColor (value, value, value, value))) .toBe (true);

   field .assign (new MFColor ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFColor ())) .toBe (true);
});

test ("fromString", () =>
{
   const a = new MFColor ();

   a .fromString ("[1.2 2.3 3.4, 2.3 3.4 4.5]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFColor (new SFColor (1.2, 2.3, 3.4), new SFColor (2.3, 3.4, 4.5)))) .toBe (true);

   a .fromString ("1 2 3");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFColor (new SFColor (1, 2, 3)))) .toBe (true);

   a .fromString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFColor ())) .toBe (true);

   expect (() => a .fromString ("[1.2 2.3 3.4, 2.3 --- 4.5]")) .toThrow (Error);
});

test ("fromVRMLString", () =>
{
   const a = new MFColor ();

   a .fromVRMLString ("[1.2 2.3 3.4, 2.3 3.4 4.5]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFColor (new SFColor (1.2, 2.3, 3.4), new SFColor (2.3, 3.4, 4.5)))) .toBe (true);

   a .fromVRMLString ("1 2 3 4 5 6 7 8 9");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFColor (new SFColor (1, 2, 3)))) .toBe (true);

   a .fromVRMLString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFColor ())) .toBe (true);

   expect (() => a .fromVRMLString ("[1.2 2.3 3.4, 2.3 --- 4.5]")) .toThrow (Error);
});

test ("fromXMLString", () =>
{
   const a = new MFColor ();

   a .fromXMLString ("1.2 2.3 3.4, 2.3 3.4 4.5");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFColor (new SFColor (1.2, 2.3, 3.4), new SFColor (2.3, 3.4, 4.5)))) .toBe (true);

   a .fromXMLString ("1 2 3");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFColor (new SFColor (1, 2, 3)))) .toBe (true);

   expect (() => a .fromXMLString ("")) .toThrow (Error);
});

test ("enumerate", () =>
{
   enumerate (["0", "1", "2"], new MFColor (new SFColor (), new SFColor (), new SFColor ()));
});

test ("toString", () =>
{
   const a = new MFColor ();
   const b = new MFColor (new SFColor (1,2,3));
   const c = new MFColor (new SFColor (1,2,3), new SFColor (5,6,7));

   expect (a .toString ({ style: "CLEAN" })) .toBe ("[]");
   expect (b .toString ({ style: "CLEAN" })) .toBe ("1 2 3");
   expect (c .toString ({ style: "CLEAN" })) .toBe ("[1 2 3 5 6 7]");
});
