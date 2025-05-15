const X3D  = require ("../../X3D");

const arrays = [
   ["MFMatrix3d", X3D .MFMatrix3d, X3D .SFMatrix3d],
   ["MFMatrix3f", X3D .MFMatrix3f, X3D .SFMatrix3f],
];

const comp = 9;

for (const [typeName, MFMatrix3, SFMatrix3] of arrays)
{
   test ("constructor", () =>
   {
      expect ((new MFMatrix3 ()) [0] .equals (new SFMatrix3 ())) .toBe (true);
      expect ((new MFMatrix3 ()) [0] .equals (new SFMatrix3 (1,0,0,0,1,0,0,0,1))) .toBe (true);
   });

   test ("get1Value", () =>
   {
      const field = new MFMatrix3 ();

      expect (field) .toHaveLength (0);

      for (let i = 0; i < 10; ++ i)
      {
         expect (field [i] .equals (new SFMatrix3 ())) .toBe (true);
         expect (field) .toHaveLength (i + 1);
      }
   });

   test ("length", () =>
   {
      expect (new MFMatrix3 () .length) .toBe (0);
      expect (new MFMatrix3 (new SFMatrix3 (1,2,3,4,5,6,7,8,9), new SFMatrix3 (1,2,3,4,5,6,7,8,9)) .length) .toBe (2);

      const m = new MFMatrix3 ();

      m .length = 10;

      expect (m) .toHaveLength (10);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFMatrix3 ())) .toBe (true);

      m .length = 20;

      expect (m) .toHaveLength (20);

      for (let i = 0; i < 20; ++ i)
         expect (m [i] .equals (new SFMatrix3 ())) .toBe (true);

      // Test shrinking the array and then growing it again.

      for (let i = 0; i < 20; ++ i)
         m [i] = new SFMatrix3 (2,2,2,2,2,2,2,2,2);

      m .length = 10;

      expect (m) .toHaveLength (10);

      m .length = 20;

      expect (m) .toHaveLength (20);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFMatrix3 (2,2,2,2,2,2,2,2,2))) .toBe (true);

      for (let i = 10; i < 20; ++ i)
         expect (m [i] .equals (new SFMatrix3 ())) .toBe (true);
   });

   test ("setValue", () =>
   {
      const field = new MFMatrix3 ();

      field .setValue ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFMatrix3 (new SFMatrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9), new SFMatrix3 (10, 11, 12, 13, 14, 15, 16, 17, 18)))) .toBe (true);

      field .setValue ([ ]);

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFMatrix3 ())) .toBe (true);

      field .setValue (new MFMatrix3 (new SFMatrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9)));

      expect (field) .toHaveLength (1);
      expect (field .equals (new MFMatrix3 (new SFMatrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9)))) .toBe (true);

      field .setValue (new MFMatrix3 (new SFMatrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9), new SFMatrix3 (10, 11, 12, 13, 14, 15, 16, 17, 18)));

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFMatrix3 (new SFMatrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9), new SFMatrix3 (10, 11, 12, 13, 14, 15, 16, 17, 18)))) .toBe (true);

      field .setValue (new MFMatrix3 ());

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFMatrix3 ())) .toBe (true);
   });

   test ("assign", () =>
   {
      const
         field = new MFMatrix3 (),
         value = new SFMatrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9);

      field .assign (new MFMatrix3 (value, value, value, value));

      expect (field) .toHaveLength (4);
      expect (field .equals (new MFMatrix3 (value, value, value, value))) .toBe (true);

      field .assign (new MFMatrix3 ());

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFMatrix3 ())) .toBe (true);
   });

   test ("fromString", () =>
   {
      const a = new MFMatrix3 ();

      a .fromString ("[1.2 2.3 3.4 4.5 5.6 6.7 7.8 8.9 9, 2.3 3.4 4.5 5.6 6.7 7.8 8.9 9 1.2]");

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFMatrix3 (new SFMatrix3 (1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9), new SFMatrix3 (2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9, 1.2)))) .toBe (true);

      a .fromString ("1 2 3 4 5 6 7 8 9");

      expect (a) .toHaveLength (1);
      expect (a .equals (new MFMatrix3 (new SFMatrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9)))) .toBe (true);

      a .fromString ("[ ]");

      expect (a) .toHaveLength (0);
      expect (a .equals (new MFMatrix3 ())) .toBe (true);

      expect (() => a .fromString ("[1 2 3 4 foo 6 7 8 9]")) .toThrow (Error);
   });

   test ("fromVRMLString", () =>
   {
      const a = new MFMatrix3 ();

      a .fromVRMLString ("[1.2 2.3 3.4 4.5 5.6 6.7 7.8 8.9 9, 2.3 3.4 4.5 5.6 6.7 7.8 8.9 9 1.2]");

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFMatrix3 (new SFMatrix3 (1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9), new SFMatrix3 (2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9, 1.2)))) .toBe (true);

      a .fromVRMLString ("1 2 3 4 5 6 7 8 9");

      expect (a) .toHaveLength (1);
      expect (a .equals (new MFMatrix3 (new SFMatrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9)))) .toBe (true);

      a .fromVRMLString ("[ ]");

      expect (a) .toHaveLength (0);
      expect (a .equals (new MFMatrix3 ())) .toBe (true);

      expect (() => a .fromVRMLString ("[1 2 3 4 foo 6 7 8 9]")) .toThrow (Error);
   });

   test ("fromXMLString", () =>
   {
      const a = new MFMatrix3 ();

      a .fromXMLString ("1.2 2.3 3.4 4.5 5.6 6.7 7.8 8.9 9, 2.3 3.4 4.5 5.6 6.7 7.8 8.9 9 1.2");

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFMatrix3 (new SFMatrix3 (1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9), new SFMatrix3 (2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9, 1.2)))) .toBe (true);

      a .fromXMLString ("1 2 3 4 5 6 7 8 9");

      expect (a) .toHaveLength (1);
      expect (a .equals (new MFMatrix3 (new SFMatrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9)))) .toBe (true);

      expect (() => a .fromXMLString ("")) .toThrow (Error);
   });
}
