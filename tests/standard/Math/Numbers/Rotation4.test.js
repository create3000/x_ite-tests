const
   X3D       = require ("../../../X3D"),
   Rotation4 = X3D .Rotation4,
   Matrix4   = X3D .Matrix4,
   Vector3   = X3D .Vector3

test ("constants", () =>
{
   expect (Rotation4 .IDENTITY .equals (new Rotation4 ())) .toBe (true);
});

test ("constructor", () =>
{
   const r1 = new Rotation4 (1,2,3,4)

   expect (r1 .x) .toBe (1)
   expect (r1 .y) .toBe (2)
   expect (r1 .z) .toBe (3)
   expect (r1 .angle) .toBe (4)
   expect (r1 [0]) .toBe (1)
   expect (r1 [1]) .toBe (2)
   expect (r1 [2]) .toBe (3)
   expect (r1 [3]) .toBe (4)
   expect (r1) .toHaveLength (4)
   expect ([... r1]) .toEqual ([1,2,3,4])

   r1 .x = 5
   r1 .y = 6
   r1 .z = 7
   r1 .angle = 8

   expect (r1 .x) .toBe (5)
   expect (r1 .y) .toBe (6)
   expect (r1 .z) .toBe (7)
   expect (r1 .angle) .toBe (8)
   expect (r1 [0]) .toBe (5)
   expect (r1 [1]) .toBe (6)
   expect (r1 [2]) .toBe (7)
   expect (r1 [3]) .toBe (8)
   expect (r1) .toHaveLength (4)
   expect ([... r1]) .toEqual ([5,6,7,8])

   const r2 = new Rotation4 ()

   expect (r2 .x) .toBe (0)
   expect (r2 .y) .toBe (0)
   expect (r2 .z) .toBe (1)
   expect (r2 .angle) .toBe (0)
   expect (r2 [0]) .toBe (0)
   expect (r2 [1]) .toBe (0)
   expect (r2 [2]) .toBe (1)
   expect (r2 [3]) .toBe (0)
   expect (r2) .toHaveLength (4)
   expect ([... r2]) .toEqual ([0,0,1,0])
})

test ("enumerate", () =>
{
   const properties = [
      "x",
      "y",
      "z",
      "angle",
   ];

   enumerate (properties, new Rotation4 ());
   enumerate (properties, new Rotation4 (1, 2, 3, 4));
});

test ("copy", () =>
{
   const v1 = new Rotation4 (1,2,3,4)

   expect ([... v1 .copy ()]) .toEqual ([1,2,3,4])
})

test ("assign", () =>
{
   const
      v1 = new Rotation4 (0, 0, 0, 0),
      v2 = new Rotation4 (1,2,3,4)

   expect ([... v1 .assign (v2)]) .toEqual ([1,2,3,4])
})

test ("set", () =>
{
   const v1 = new Rotation4 (0, 0, 0, 0)

   expect ([... v1 .set (1,2,3,4)]) .toEqual ([1,2,3,4])
   expect ([... v1 .set ()]) .toEqual ([0,0,1,0])
})

test ("equals", () =>
{
   const
      a = new Rotation4 (1,2,3,4),
      b = new Rotation4 (1,2,3,4)

   expect (a .equals (b)) .toBe (true)

   for (let i = 0; i < a .length; ++ i)
   {
      const c = a .copy ()

      c [i] = 0

      expect (a .equals (c)) .toBe (false)
   }
})

test ("inverse", () =>
{
   const
      r1 = new Rotation4 (2,3,4,5) .inverse (),
      r2 = r1 .copy () .inverse (),
      r3 = r2 .copy () .inverse ()

   expect (r1 [0]) .toBe (-r2 [0])
   expect (r1 [1]) .toBe (-r2 [1])
   expect (r1 [2]) .toBe (-r2 [2])
   expect (r1 [3]) .toBe (r2 [3])

   expect (r1 [0]) .not .toBe (r2 [0])
   expect (r1 [1]) .not .toBe (r2 [1])
   expect (r1 [2]) .not .toBe (r2 [2])
   expect (r1 [3]) .toBe (r2 [3])

   expect (r1 [0]) .toBe (r3 [0])
   expect (r1 [1]) .toBe (r3 [1])
   expect (r1 [2]) .toBe (r3 [2])
   expect (r1 [3]) .toBe (r3 [3])
})

test ("multVecRot", () =>
{
   const
      r1 = new Rotation4 (0,0,1, Math.PI / 4),
      v1 = r1 .multVecRot (new Vector3 (1, 0, 0)),
      m1 = new Matrix4 () .rotate (r1),
      w1 = m1 .multVecMatrix (new Vector3 (1, 0, 0))

   expect (v1 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v1 [1]) .toBeCloseTo (Math .SQRT1_2)
   expect (v1 [2]) .toBeCloseTo (0)
   expect (v1 [0]) .toBeCloseTo (w1 [0])
   expect (v1 [1]) .toBeCloseTo (w1 [1])
   expect (v1 [2]) .toBeCloseTo (w1 [2])

   const
      r2 = new Rotation4 (0,1,0, Math.PI / 4),
      v2 = r2 .multVecRot (new Vector3 (1, 0, 0)),
      m2 = new Matrix4 () .rotate (r2),
      w2 = m2 .multVecMatrix (new Vector3 (1, 0, 0))

   expect (v2 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v2 [1]) .toBeCloseTo (0)
   expect (v2 [2]) .toBeCloseTo (-Math .SQRT1_2)
   expect (v2 [0]) .toBeCloseTo (w2 [0])
   expect (v2 [1]) .toBeCloseTo (w2 [1])
   expect (v2 [2]) .toBeCloseTo (w2 [2])

   const
      r3 = new Rotation4 (1,0,0, Math.PI / 4),
      v3 = r3 .multVecRot (new Vector3 (0, 0, 1)),
      m3 = new Matrix4 () .rotate (r3),
      w3 = m3 .multVecMatrix (new Vector3 (0, 0, 1))

   expect (v3 [0]) .toBeCloseTo (0)
   expect (v3 [1]) .toBeCloseTo (-Math .SQRT1_2)
   expect (v3 [2]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [0]) .toBeCloseTo (w3 [0])
   expect (v3 [1]) .toBeCloseTo (w3 [1])
   expect (v3 [2]) .toBeCloseTo (w3 [2])

   const
      r4 = new Rotation4 (1,2,3,4),
      v4 = r4 .multVecRot (new Vector3 (2,3,4)),
      m4 = new Matrix4 () .rotate (r4),
      w4 = m4 .multVecMatrix (new Vector3 (2,3,4))

   expect (v4 [0]) .toBeCloseTo (w4 [0])
   expect (v4 [1]) .toBeCloseTo (w4 [1])
   expect (v4 [2]) .toBeCloseTo (w4 [2])

   const
      r5 = new Rotation4 (2,5,3,4),
      v5 = r5 .multVecRot (new Vector3 (2,4,3)),
      m5 = new Matrix4 () .rotate (r5),
      w5 = m5 .multVecMatrix (new Vector3 (2,4,3))

   expect (v5 [0]) .toBeCloseTo (w5 [0])
   expect (v5 [1]) .toBeCloseTo (w5 [1])
   expect (v5 [2]) .toBeCloseTo (w5 [2])
})

test ("multRotVec", () =>
{
   const
      r1 = new Rotation4 (0,0,1, Math.PI / 4),
      v1 = r1 .multRotVec (new Vector3 (1, 0, 0)),
      m1 = new Matrix4 () .rotate (r1),
      w1 = m1 .multMatrixVec (new Vector3 (1, 0, 0))

   expect (v1 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v1 [1]) .toBeCloseTo (-Math .SQRT1_2)
   expect (v1 [2]) .toBeCloseTo (0)
   expect (v1 [0]) .toBeCloseTo (w1 [0])
   expect (v1 [1]) .toBeCloseTo (w1 [1])
   expect (v1 [2]) .toBeCloseTo (w1 [2])

   const
      r2 = new Rotation4 (0,1,0, Math.PI / 4),
      v2 = r2 .multRotVec (new Vector3 (1, 0, 0)),
      m2 = new Matrix4 () .rotate (r2),
      w2 = m2 .multMatrixVec (new Vector3 (1, 0, 0))

   expect (v2 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v2 [1]) .toBeCloseTo (0)
   expect (v2 [2]) .toBeCloseTo (Math .SQRT1_2)
   expect (v2 [0]) .toBeCloseTo (w2 [0])
   expect (v2 [1]) .toBeCloseTo (w2 [1])
   expect (v2 [2]) .toBeCloseTo (w2 [2])

   const
      r3 = new Rotation4 (1,0,0, Math.PI / 4),
      v3 = r3 .multRotVec (new Vector3 (0, 0, 1)),
      m3 = new Matrix4 () .rotate (r3),
      w3 = m3 .multMatrixVec (new Vector3 (0, 0, 1))

   expect (v3 [0]) .toBeCloseTo (0)
   expect (v3 [1]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [2]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [0]) .toBeCloseTo (w3 [0])
   expect (v3 [1]) .toBeCloseTo (w3 [1])
   expect (v3 [2]) .toBeCloseTo (w3 [2])

   const
      r4 = new Rotation4 (1,2,3,4),
      v4 = r4 .multRotVec (new Vector3 (2,3,4)),
      m4 = new Matrix4 () .rotate (r4),
      w4 = m4 .multMatrixVec (new Vector3 (2,3,4))

   expect (v4 [0]) .toBeCloseTo (w4 [0])
   expect (v4 [1]) .toBeCloseTo (w4 [1])
   expect (v4 [2]) .toBeCloseTo (w4 [2])

   const
      r5 = new Rotation4 (2,5,3,4),
      v5 = r5 .multRotVec (new Vector3 (2,4,3)),
      m5 = new Matrix4 () .rotate (r5),
      w5 = m5 .multMatrixVec (new Vector3 (2,4,3))

   expect (v5 [0]) .toBeCloseTo (w5 [0])
   expect (v5 [1]) .toBeCloseTo (w5 [1])
   expect (v5 [2]) .toBeCloseTo (w5 [2])
})

test ("multLeft", () =>
{
   const
      r  = new Rotation4 (),
      r1 = new Rotation4 (1,2,3,4),
      m1 = new Matrix4 () .rotate (r1),
      r2 = new Rotation4 (2,3,4,5),
      m2 = new Matrix4 () .rotate (r2)

   r1 .multLeft (r2)
   m1 .multLeft (m2)
   m1 .get (null, r)

   if (r1 .getQuaternion () .dot (r .getQuaternion ()) < 0)
      r1 .setQuaternion (r1 .getQuaternion () .negate ())

   expect (r1 [0]) .toBeCloseTo (r [0])
   expect (r1 [1]) .toBeCloseTo (r [1])
   expect (r1 [2]) .toBeCloseTo (r [2])
   expect (r1 [3]) .toBeCloseTo (r [3])
})

test ("multRight", () =>
{
   const
      r  = new Rotation4 (),
      r1 = new Rotation4 (1,2,3,4),
      m1 = new Matrix4 () .rotate (r1),
      r2 = new Rotation4 (2,3,4,5),
      m2 = new Matrix4 () .rotate (r2)

   r1 .multRight (r2)
   m1 .multRight (m2)
   m1 .get (null, r)

   if (r1 .getQuaternion () .dot (r .getQuaternion ()) < 0)
      r1 .setQuaternion (r1 .getQuaternion () .negate ())

   expect (r1 [0]) .toBeCloseTo (r [0])
   expect (r1 [1]) .toBeCloseTo (r [1])
   expect (r1 [2]) .toBeCloseTo (r [2])
   expect (r1 [3]) .toBeCloseTo (r [3])
})

test ("getAxis", () =>
{
   const
      r1 = new Rotation4 (1,2,3,4),
      a  = r1 .getAxis ()

   expect (a [0]) .toBeCloseTo (1)
   expect (a [1]) .toBeCloseTo (2)
   expect (a [2]) .toBeCloseTo (3)

   expect (a [0]) .toBeCloseTo (r1 [0])
   expect (a [1]) .toBeCloseTo (r1 [1])
   expect (a [2]) .toBeCloseTo (r1 [2])
})

test ("getMatrix", () =>
{
   const
      r1 = new Rotation4 (1,2,3,4) .normalize (),
      m1 = new Matrix4 () .rotate (r1),
      m2 = r1 .getMatrix (),
      m3 = m1 .submatrix

   expect (m2 [0]) .toBeCloseTo (m3 [0])
   expect (m2 [1]) .toBeCloseTo (m3 [1])
   expect (m2 [2]) .toBeCloseTo (m3 [2])
   expect (m2 [3]) .toBeCloseTo (m3 [3])
   expect (m2 [4]) .toBeCloseTo (m3 [4])
   expect (m2 [5]) .toBeCloseTo (m3 [5])
   expect (m2 [6]) .toBeCloseTo (m3 [6])
   expect (m2 [7]) .toBeCloseTo (m3 [7])
   expect (m2 [8]) .toBeCloseTo (m3 [8])

   const r2 = Rotation4 .fromMatrix (r1 .getMatrix ())

   if (r1 .getQuaternion () .dot (r2 .getQuaternion ()) < 0)
      r2 .setQuaternion (r2 .getQuaternion () .negate ())

   expect (r2 [0]) .toBeCloseTo (r1 [0])
   expect (r2 [1]) .toBeCloseTo (r1 [1])
   expect (r2 [2]) .toBeCloseTo (r1 [2])
   expect (r2 [3]) .toBeCloseTo (r1 [3])
})

test ("getEuler", () =>
{
   const r1 = Rotation4 .fromEuler (2,3,4)

   expect (r1 [0]) .toBeCloseTo (0.7422674);
   expect (r1 [1]) .toBeCloseTo (-0.4441315);
   expect (r1 [2]) .toBeCloseTo (-0.5017831);
   expect (r1 [3]) .toBeCloseTo (4.9281641);

   const orders = ["XYZ", "ZYX", "YXZ", "ZXY", "YZX", "XZY"];

   for (const order of orders)
   {
      const r2 = Rotation4 .fromEuler (... r1 .getEuler ([ ], order), order);

      if (r2 .getQuaternion () .dot (r1 .getQuaternion ()) < 0)
         r2 .setQuaternion (r2 .getQuaternion () .negate ());

      expect (r2 [0]) .toBeCloseTo (r1 [0]);
      expect (r2 [1]) .toBeCloseTo (r1 [1]);
      expect (r2 [2]) .toBeCloseTo (r1 [2]);
      expect (r2 [3]) .toBeCloseTo (r1 [3]);
   }

   const values = [
      [0, 0, 1, 0],
      [0.44720762479784, 0.894425200759102, -0.00298338253357574, 0.0149168684118014],
      [0.447126737240141, 0.894398236684653, -0.0113787108376555, 0.0568910989945798],
      [0.446815605756353, 0.894294494960484, -0.0243550967139299, 0.121751416393342],
      [0.446080627132915, 0.894049269187898, -0.041085013828535, 0.205309630972523],
      [0.444735209063286, 0.893599791226277, -0.0607454273159173, 0.303354583226473],
      [0.442635492800882, 0.89289682225691, -0.0825171819467308, 0.41165422929258],
      [0.439707459124293, 0.891913501902089, -0.10558245836886, 0.525966928137495],
      [0.43596648678529, 0.890652036782098, -0.129120764309974, 0.642060392576937],
      [0.431530002012405, 0.889148594762981, -0.152304411604497, 0.755734925852453],
      [0.426622977790632, 0.887476311995174, -0.174294665634087, 0.862846293701439],
      [0.421574960019093, 0.885745729289622, -0.194239687319804, 0.959322778242641],
      [0.416806357720547, 0.884101421451545, -0.211275026330821, 1.04117070572966],
      [0.412801327179008, 0.882713288098179, -0.224526869871183, 1.10446332329146],
      [0.410065066245376, 0.881761179155419, -0.233117704989602, 1.14530974488236],
      [0.409064926172233, 0.881412416655378, -0.236173745241573, 1.15980417704942],
      [0.410065066245376, 0.881761179155419, -0.233117704989602, 1.14530974488236],
      [0.412801327179008, 0.882713288098179, -0.224526869871183, 1.10446332329146],
      [0.416806357720547, 0.884101421451545, -0.211275026330821, 1.04117070572966],
      [0.421574960019093, 0.885745729289622, -0.194239687319804, 0.959322778242641],
      [0.426622977790632, 0.887476311995174, -0.174294665634087, 0.862846293701439],
      [0.431530002012404, 0.889148594762981, -0.152304411604497, 0.755734925852453],
      [0.43596648678529, 0.890652036782099, -0.129120764309974, 0.642060392576937],
      [0.439707459124293, 0.891913501902089, -0.10558245836886, 0.525966928137495],
      [0.442635492800883, 0.892896822256913, -0.082517181946731, 0.411654229292579],
      [0.444735209063285, 0.893599791226277, -0.0607454273159171, 0.303354583226473],
      [0.446080627132915, 0.894049269187898, -0.041085013828535, 0.205309630972523],
      [0.446815605756353, 0.894294494960484, -0.0243550967139299, 0.121751416393342],
      [0.447126737240136, 0.894398236684654, -0.0113787108376554, 0.0568910989945798],
      [0.447207624797823, 0.894425200759118, -0.00298338253357567, 0.0149168684118014],
   ];

   for (const order of orders)
   {
      for (const v of values)
      {
         const r = new Rotation4 (... v);
         const e = r .getEuler ([ ], order);

         r .setEuler (... e, order);

         expect (v [0]) .toBeCloseTo (r [0]);
         expect (v [1]) .toBeCloseTo (r [1]);
         expect (v [2]) .toBeCloseTo (r [2]);
         expect (v [3]) .toBeCloseTo (r [3]);
      }
   }
})

test ("toString", () =>
{
   const r = new Rotation4 (3, 4, 5, 6)

   expect (r .toString ()) .toBe ([... r] .join (" "))
})
