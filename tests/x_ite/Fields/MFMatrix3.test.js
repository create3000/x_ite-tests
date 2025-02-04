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

   test ("length", () =>
   {
      expect (new MFMatrix3 () .length) .toBe (0);

      const m = new MFMatrix3 ();

      m .length = 10;

      expect (m .length) .toBe (10);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFMatrix3 ())) .toBe (true);

      m .length = 20;

      expect (m .length) .toBe (20);

      for (let i = 0; i < 20; ++ i)
         expect (m [i] .equals (new SFMatrix3 ())) .toBe (true);

      // Test shrinking the array and then growing it again.

      for (let i = 0; i < 20; ++ i)
         m [i] = new SFMatrix3 (2,2,2,2,2,2,2,2,2);

      m .length = 10;

      expect (m .length) .toBe (10);

      m .length = 20;

      expect (m .length) .toBe (20);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFMatrix3 (2,2,2,2,2,2,2,2,2))) .toBe (true);

      for (let i = 10; i < 20; ++ i)
         expect (m [i] .equals (new SFMatrix3 ())) .toBe (true);
   });
}
