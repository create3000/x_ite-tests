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
      expect (field [0] .equals (new SFMatrix4 ())) .toBe (true);
      expect (field) .toHaveLength (1);
   });

   test ("length", () =>
   {
      expect (new MFMatrix4 () .length) .toBe (0);

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
}
