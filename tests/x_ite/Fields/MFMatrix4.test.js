const X3D  = require ("../../X3D");

const arrays = [
   ["MFMatrix4d", X3D .MFMatrix4d, X3D .SFMatrix4d],
   ["MFMatrix4f", X3D .MFMatrix4f, X3D .SFMatrix4f],
];

const comp = 16;

for (const [typeName, MFMatrix4, SFMatrix4] of arrays)
{
   test ("constructor", () =>
   {
      expect ((new MFMatrix4 ()) [0] .equals (new SFMatrix4 ())) .toBe (true);
      expect ((new MFMatrix4 ()) [0] .equals (new SFMatrix4 (1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1))) .toBe (true);
   });

   test ("get1Value", () =>
   {
      const field = new MFMatrix4 ();

      expect (field) .toHaveLength (0);

      for (let i = 0; i < 10; ++ i)
      {
         expect (field [i] .equals (new SFMatrix4 ())) .toBe (true);
         expect (field) .toHaveLength (i + 1);
      }
   });

   test ("length", () =>
   {
      expect (new MFMatrix4 () .length) .toBe (0);
      expect (new MFMatrix4 (new SFMatrix4 (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16), new SFMatrix4 (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16)) .length) .toBe (2);

      const m = new MFMatrix4 ();

      m .length = 10;

      expect (m) .toHaveLength (10);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFMatrix4 ())) .toBe (true);

      m .length = 20;

      expect (m) .toHaveLength (20);

      for (let i = 0; i < 20; ++ i)
         expect (m [i] .equals (new SFMatrix4 ())) .toBe (true);

      // Test shrinking the array and then growing it again.

      for (let i = 0; i < 20; ++ i)
         m [i] = new SFMatrix4 (2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2);

      m .length = 10;

      expect (m) .toHaveLength (10);

      m .length = 20;

      expect (m) .toHaveLength (20);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFMatrix4 (2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2))) .toBe (true);

      for (let i = 10; i < 20; ++ i)
         expect (m [i] .equals (new SFMatrix4 ())) .toBe (true);
   });
   test ("setValue", () =>
   {
      const field = new MFMatrix4 ();

      field .setValue ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]);

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFMatrix4 (new SFMatrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16), new SFMatrix4 (17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32)))) .toBe (true);

      field .setValue ([ ]);

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFMatrix4 ())) .toBe (true);

      field .setValue (new MFMatrix4 (new SFMatrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)));

      expect (field) .toHaveLength (1);
      expect (field .equals (new MFMatrix4 (new SFMatrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)))) .toBe (true);

      field .setValue (new MFMatrix4 (new SFMatrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16), new SFMatrix4 (17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32)));

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFMatrix4 (new SFMatrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16), new SFMatrix4 (17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32)))) .toBe (true);

      field .setValue (new MFMatrix4 ());

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFMatrix4 ())) .toBe (true);
   });

   test ("assign", () =>
   {
      const
         field = new MFMatrix4 (),
         value = new SFMatrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);

      field .assign (new MFMatrix4 (value, value, value, value));

      expect (field) .toHaveLength (4);
      expect (field .equals (new MFMatrix4 (value, value, value, value))) .toBe (true);

      field .assign (new MFMatrix4 ());

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFMatrix4 ())) .toBe (true);
   });

   test ("fromString", () =>
   {
      const a = new MFMatrix4 ();

      a .fromString ("[1.2 2.3 3.4 4.5 5.6 6.7 7.8 8.9 9 10.1 11.2 12.3 13.4 14.5 15.6 16.7, 2.3 3.4 4.5 5.6 6.7 7.8 8.9 9 10.1 11.2 12.3 13.4 14.5 15.6 16.7 17.8]");

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFMatrix4 (new SFMatrix4 (1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9, 10.1, 11.2, 12.3, 13.4, 14.5, 15.6, 16.7), new SFMatrix4 (2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9, 10.1, 11.2, 12.3, 13.4, 14.5, 15.6, 16.7, 17.8)))) .toBe (true);

      a .fromString ("1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16");

      expect (a) .toHaveLength (1);
      expect (a .equals (new MFMatrix4 (new SFMatrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)))) .toBe (true);

      a .fromString ("[ ]");

      expect (a) .toHaveLength (0);
      expect (a .equals (new MFMatrix4 ())) .toBe (true);
   });

   test ("fromVRMLString", () =>
   {
      const a = new MFMatrix4 ();

      a .fromVRMLString ("[1.2 2.3 3.4 4.5 5.6 6.7 7.8 8.9 9 10.1 11.2 12.3 13.4 14.5 15.6 16.7, 2.3 3.4 4.5 5.6 6.7 7.8 8.9 9 10.1 11.2 12.3 13.4 14.5 15.6 16.7 17.8]");

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFMatrix4 (new SFMatrix4 (1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9, 10.1, 11.2, 12.3, 13.4, 14.5, 15.6, 16.7), new SFMatrix4 (2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 9, 10.1, 11.2, 12.3, 13.4, 14.5, 15.6, 16.7, 17.8)))) .toBe (true);

      a .fromVRMLString ("1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16");

      expect (a) .toHaveLength (1);
      expect (a .equals (new MFMatrix4 (new SFMatrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)))) .toBe (true);

      a .fromVRMLString ("[ ]");

      expect (a) .toHaveLength (0);
      expect (a .equals (new MFMatrix4 ())) .toBe (true);
   });
}
