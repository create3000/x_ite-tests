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

   test ("length", () =>
   {
      expect (new MFMatrix4 () .length) .toBe (0);

      const m = new MFMatrix4 ();

      m .length = 10;

      expect (m .length) .toBe (10);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFMatrix4 ())) .toBe (true);

      m .length = 20;

      expect (m .length) .toBe (20);

      for (let i = 0; i < 20; ++ i)
         expect (m [i] .equals (new SFMatrix4 ())) .toBe (true);
   });
}
