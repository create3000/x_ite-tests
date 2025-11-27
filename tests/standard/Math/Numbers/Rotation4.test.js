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
      [0.6346706144505964, 0.7117169013315232, 0.30108514329331515, 0.4371694024469455],
      [0.9269196125089479, 0.35497918830185443, 0.12169555381696655, 0.8128001689511338],
      [0.49674272932212954, 0.796404988497921, 0.34494311873295525, 0.1378663038552657],
      [0.33567270736452215, 0.6944056705110456, 0.6364939892038887, 0.41246115733750555],
      [0.7355926595331982, 0.3080092839360338, 0.6033520698979096, 0.45588991333414497],
      [0.7138351401044702, 0.3962771167344202, 0.5774113260966471, 0.21849243127959286],
      [0.3964520144287578, 0.8491122329502127, 0.3490475843057525, 0.4544683958427815],
      [0.15117175185342782, 0.7229576282451453, 0.6741508504806026, 0.4995661339502322],
      [0.17100359428405904, 0.22544427634080044, 0.9591311948879082, 0.7404643983975924],
      [0.43200984708332424, 0.6682294626902657, 0.6056706012476767, 0.7983171638876843],
      [0.7468356267899108, 0.020536732852016324, 0.6646914992393438, 0.09622911598861252],
      [0.937168349509306, 0.2935501960540072, 0.1885305467945635, 0.7844242622232498],
      [0.9079870065172715, 0.007048045908338237, 0.4189390421584972, 0.5146314798048193],
      [0.3460679394816531, 0.8489553033380475, 0.3993893766703414, 0.6076564186467546],
      [0.19437842271608494, 0.6239302680193932, 0.7569201076941023, 0.3072843873481036],
      [0.06659548940890576, 0.3606469913458224, 0.9303218735596803, 0.828251894427756],
      [0.7817088139187809, 0.5245082088694702, 0.3373758572723205, 0.8852395304773498],
      [0.23535582998598695, 0.5567261913859467, 0.7966577565783532, 0.12905937373564338],
      [0.21939956656000711, 0.7182268948312249, 0.660313529873783, 0.5645824363769553],
      [0.46195793837372184, 0.593080317103659, 0.65943202882308, 0.9243523556507737],
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
