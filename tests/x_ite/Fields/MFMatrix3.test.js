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
   })
}
