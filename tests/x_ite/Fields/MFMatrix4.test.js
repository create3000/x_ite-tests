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
   })
}
