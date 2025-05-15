const X3D  = require ("../../X3D");

const arrays = [
   ["MFVec4d", X3D .MFVec4d, X3D .SFVec4d],
   ["MFVec4f", X3D .MFVec4f, X3D .SFVec4f],
];

const comp = 4;

for (const [typeName, MFVec4, SFVec4] of arrays)
{
   test ("get1Value", () =>
   {
      const field = new MFVec4 ();

      expect (field) .toHaveLength (0);

      for (let i = 0; i < 10; ++ i)
      {
         expect (field [i] .equals (new SFVec4 ())) .toBe (true);
         expect (field) .toHaveLength (i + 1);
      }
   });

   test ("setValue", () =>
   {
      const field = new MFVec4 ();

      field .setValue ([1, 2, 3, 4, 5, 6, 7, 8]);

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8)))) .toBe (true);
      expect (field [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true);
      expect (field [1] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true);

      field .setValue ([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec4 (new SFVec4 (9, 8, 7, 6), new SFVec4 (5, 4, 3, 2)))) .toBe (true);
      expect (field [0] .equals (new SFVec4 (9, 8, 7, 6))) .toBe (true);
      expect (field [1] .equals (new SFVec4 (5, 4, 3, 2))) .toBe (true);

      field .setValue ([ ]);

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFVec4 ())) .toBe (true);

      field .setValue (new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8)));

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8)))) .toBe (true);

      field .setValue (new MFVec4 (new SFVec4 (9, 8, 7, 6), new SFVec4 (5, 4, 3, 2)));

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec4 (new SFVec4 (9, 8, 7, 6), new SFVec4 (5, 4, 3, 2)))) .toBe (true);

      field .setValue ((new MFVec4 ()));

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFVec4 ())) .toBe (true);
   });

   test ("assign", () =>
   {
      const field = new MFVec4 ()

      field .assign (new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8)));

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8)))) .toBe (true);

      field .assign (new MFVec4 (new SFVec4 (9, 8, 7, 6), new SFVec4 (5, 4, 3, 2)));

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec4 (new SFVec4 (9, 8, 7, 6), new SFVec4 (5, 4, 3, 2)))) .toBe (true);

      field .assign (new MFVec4 ());

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFVec4 ())) .toBe (true);
   })

   test ("shrinkToFit", () =>
   {
      const field = new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8));

      expect (field .shrinkToFit ()) .toHaveLength (8);
      expect (field .shrinkToFit ()) .toBe (field .shrinkToFit ());
   });

   test ("common", () =>
   {
      const field = new MFVec4 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [typeName])
      expect (field .getTypeName ()) .toBe (typeName)
      expect (Object .prototype .toString .call (field)) .toBe (`[object ${typeName}]`)
   })

   test ("copy", () =>
   {
      const
         a = new MFVec4 (new SFVec4 (1, 2, 3, 4),new SFVec4 (5, 6, 7, 8),new SFVec4 (9, 10, 11, 12)),
         b = a .copy ()

      expect (b) .toBeInstanceOf (MFVec4)
      expect (b) .toHaveLength (a .length)
      expect (b .equals (a)) .toBe (true)
      expect (b .getValue ()) .not .toBe (a .getValue ())
   })

   test ("equals", () =>
   {
      const
         a = new MFVec4 (),
         b = new MFVec4 (new SFVec4 (1, 2, 3, 4),new SFVec4 (5, 6, 7, 8)),
         c = new MFVec4 (new SFVec4 (1, 2, 3, 4),new SFVec4 (5, 6, 7, 8))

      expect (a .equals (a)) .toBe (true)
      expect (b .equals (b)) .toBe (true)
      expect (a .equals (b)) .toBe (false)
      expect (b .equals (c)) .toBe (true)
   })

   test ("isDefaultValue", () =>
   {
      const
         a = new MFVec4 (),
         b = new MFVec4 (new SFVec4 ())

      expect (a .isDefaultValue ()) .toBe (true)
      expect (b .isDefaultValue ()) .toBe (false)
   })

   test ("constructor", () =>
   {
      const a = new MFVec4 ()

      expect (a) .toHaveLength (0)
      expect (a [0] .equals (new SFVec4 ())) .toBe (true)
      expect (a) .toHaveLength (1)

      const b = new MFVec4 (new SFVec4 (1, 2, 3, 4),new SFVec4 (2, 3, 4, 5),new SFVec4 (3, 4, 5, 6),new SFVec4 (4, 5, 6, 7),new SFVec4 (5, 6, 7, 8))
      expect (b) .toHaveLength (5)
      expect (b [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      expect (b [1] .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true)
      expect (b [2] .equals (new SFVec4 (3, 4, 5, 6))) .toBe (true)
      expect (b [3] .equals (new SFVec4 (4, 5, 6, 7))) .toBe (true)
      expect (b [4] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)

      const c = [... b]
      expect (c) .toHaveLength (5)
      expect (c [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      expect (c [1] .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true)
      expect (c [2] .equals (new SFVec4 (3, 4, 5, 6))) .toBe (true)
      expect (c [3] .equals (new SFVec4 (4, 5, 6, 7))) .toBe (true)
      expect (c [4] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      for (let i = 0; i < 5; ++ i)
         expect (c [i]) .toBe (b [i])

      const d = new MFVec4 (new SFVec4 (1, 2, 3, 4))
      expect (d) .toHaveLength (1)
      expect (d [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      d [0] .x = 2
      d [0] .y = 3
      d [0] .z = 4
      d [0] .w = 5
      d [1] .x = 3
      d [1] .y = 4
      d [1] .z = 5
      d [1] .w = 6
      expect (d) .toHaveLength (2)
      expect (d [0] .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true)
      expect (d [1] .equals (new SFVec4 (3, 4, 5, 6))) .toBe (true)

      expect ((new MFVec4 ()) [0] .equals (new SFVec4 (0,0,0,1))) .toBe (true);
   })

   test ("basic-functions", () =>
   {
      const a = new MFVec4 (new SFVec4 (1, 2, 3, 4))

      expect (a [0] .x) .toBe (1)
      expect (a [0] .y) .toBe (2)
      expect (a [0] .z) .toBe (3)
      expect (a [0] .w) .toBe (4)
      a [1] = new SFVec4 (3, 4, 5, 6)
      expect (a [1] .x) .toBe (3)
      expect (a [1] .y) .toBe (4)
      expect (a [1] .z) .toBe (5)
      expect (a [1] .w) .toBe (6)
      a .push (new SFVec4 (4, 5, 6, 7))
      expect (a .at (-1) .x) .toBe (4)
      expect (a .at (-1) .y) .toBe (5)
      expect (a .at (-1) .z) .toBe (6)
      expect (a .at (-1) .w) .toBe (7)
      a .unshift (new SFVec4 (5, 6, 7, 8))
      expect (a [0] .x) .toBe (5)
      expect (a [0] .y) .toBe (6)
      expect (a [0] .z) .toBe (7)
      expect (a [0] .w) .toBe (8)
      expect (a) .toHaveLength (4)
      expect (a .splice (1, 1, new SFVec4 (6, 7, 8, 9))) .toHaveLength (1)
      expect (a [1] .x) .toBe (6)
      expect (a [1] .y) .toBe (7)
      expect (a [1] .z) .toBe (8)
      expect (a [1] .w) .toBe (9)
      expect (a .splice (1, 1, new SFVec4 (7, 8, 9, 10))) .toHaveLength (1)
      expect (a [1] .x) .toBe (7)
      expect (a [1] .y) .toBe (8)
      expect (a [1] .z) .toBe (9)
      expect (a [1] .w) .toBe (10)
      expect (a .splice (1, 0, new SFVec4 (8, 9, 0, 1))) .toHaveLength (0)
      expect (a) .toHaveLength (5)
      expect (a [0] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [1] .equals (new SFVec4 (8, 9, 0, 1))) .toBe (true)
      expect (a [2] .equals (new SFVec4 (7, 8, 9, 10))) .toBe (true)
      expect (a [3] .equals (new SFVec4 (3, 4, 5, 6))) .toBe (true)
      expect (a [4] .equals (new SFVec4 (4, 5, 6, 7))) .toBe (true)

      expect (a .fill (new SFVec4 (5, 6, 7, 8))) .toBe (a)
      expect (a) .toHaveLength (5)
      expect (a [0] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [1] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [2] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [3] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [4] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)

      expect (a .includes (new SFVec4 (9,9,9,9))) .toBe (false)
      expect (a .indexOf (new SFVec4 (9,9,9,9))) .toBe (-1)
      expect (a .lastIndexOf (new SFVec4 (9,9,9,9))) .toBe (-1)

      expect (a .includes (a [0])) .toBe (true)
      expect (a .indexOf (a [0])) .toBe (0)
      expect (a .lastIndexOf (a .at (-1))) .toBe (a .length - 1)

      a [1] = new SFVec4 (5, 6, 7, 8)
      a [3] = new SFVec4 (5, 6, 7, 8)

      expect (a .includes (a [1])) .toBe (true)
      expect (a .indexOf (a [1])) .toBe (1)
      expect (a .lastIndexOf (a [3])) .toBe (3)

      expect (a .splice (0, 5, new SFVec4 (1, 2, 3, 4),new SFVec4 (2, 3, 4, 5),new SFVec4 (3, 4, 5, 6),new SFVec4 (5, 6, 7, 8),new SFVec4 (5, 6, 7, 8))) .toHaveLength (5)
      expect (a) .toHaveLength (5)
      expect (a [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      expect (a [1] .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true)
      expect (a [2] .equals (new SFVec4 (3, 4, 5, 6))) .toBe (true)
      expect (a [3] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [4] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
   })

   test ("at", () =>
   {
      const
         N = 10,
         a = new MFVec4 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec4 (++n,++n,++n,++n))) .toBe (i + 1)

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec4 (++n,++n,++n,++n)
         expect (a .at (i)) .toBe (a [i])
         expect (a .at (i) .equals (v)) .toBe (true)
         expect (a .at (i - N) .equals (a [i])) .toBe (true)
         expect (a .at (i - N) .equals (v)) .toBe (true)
      }
   })

   test ("entries", () =>
   {
      const
         N = 10,
         a = new MFVec4 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec4 (++n,++n,++n,++n))) .toBe (i + 1)

      expect ([... a .entries ()]) .toHaveLength (N)

      for (const [i, value] of a .entries ())
         expect (value) .toBe (a [i])
   })

   test ("fill", () =>
   {
      const a = new MFVec4 ()

      a .length = 6

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec4 (0,0,0,1))) .toBe (true)
      expect (a [1] .equals (new SFVec4 (0,0,0,1))) .toBe (true)
      expect (a [2] .equals (new SFVec4 (0,0,0,1))) .toBe (true)
      expect (a [3] .equals (new SFVec4 (0,0,0,1))) .toBe (true)
      expect (a [4] .equals (new SFVec4 (0,0,0,1))) .toBe (true)
      expect (a [5] .equals (new SFVec4 (0,0,0,1))) .toBe (true)

      expect (a .fill (new SFVec4 (1, 2, 3, 4))) .toBe (a)

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      expect (a [1] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      expect (a [2] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      expect (a [3] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      expect (a [4] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      expect (a [5] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)

      expect (a .fill (new SFVec4 (5, 6, 7, 8))) .toBe (a)

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [1] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [2] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [3] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [4] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [5] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
   })

   test ("filter", () =>
   {
      const
         N = 10,
         a = new MFVec4 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec4 (++n,++n,++n,n))) .toBe (i + 1)

      const b = a .filter (v => v.x % 2)

      expect (b) .toBeInstanceOf (MFVec4)
      expect (b) .toHaveLength (N / 2)

      for (let i = 0; i < N / 2; ++ i)
      {
         expect (b [i]) .not .toBe (a [i * 2])
         expect (b [i] .equals (a [i * 2])) .toBe (true)
      }
   })

   test ("find", () =>
   {
      const
         N = 10,
         a = new MFVec4 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec4 (++n,++n,++n,++n))) .toBe (i + 1)

      const
         b = a .find (v => v .equals (new SFVec4 (1, 2, 3, 4))),
         c = a .find (v => v .equals (new SFVec4 ()))

      expect (b) .toBe (a [0])
      expect (c) .toBe (undefined)
   })

   test ("keys", () =>
   {
      const
         N = 10,
         a = new MFVec4 ()

      a .length = N
      expect (a .keys ()) .toEqual (new Array (N) .keys ())
      a .length = N/2
      expect (a .keys ()) .toEqual (new Array (N/2) .keys ())
   })

   test ("map", () =>
   {
      const
         N = 10,
         a = new MFVec4 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec4 (++n,++n,++n,++n))) .toBe (i + 1)

      expect (a) .toHaveLength (N)

      const b = a .map (v => v)

      expect (b) .toBeInstanceOf (MFVec4)

      for (let i = 0; i < N; ++ i)
      {
         expect (b [i]) .not .toBe (a [i])
         expect (b [i] .equals (a [i])) .toBe (true)
      }
   })

   test ("pop", () =>
   {
      const
         N = 10,
         a = new MFVec4 ()

      expect (a) .toHaveLength (0)

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec4 (++n,++n,++n,++n)
         a .push (v)
         expect (a [i] .equals (v)) .toBe (true)
         expect (a) .toHaveLength (i + 1)
      }

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec4 (++n,++n,++n,++n)
         expect (a [i] .equals (v)) .toBe (true)
      }

      const b = a .slice ()

      for (let j = 0; j < N; ++ j)
      {
         expect (a .pop () .equals (b .pop ())) .toBe (true)
         expect (a) .toHaveLength (N - j - 1)

         for (let i = 0, n = 0; i < a .length; ++ i)
         {
            const v = new SFVec4 (++n,++n,++n,++n)
            expect (a [i] .equals (v)) .toBe (true)
         }
      }
   })

   test ("push", () =>
   {
      const
         N = 1_000,
         a = new MFVec4 ()

      expect (a) .toHaveLength (0)

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec4 (++n,++n,++n,++n)
         expect (a .push (v)) .toBe (i + 1)
         expect (a [i] .equals (v)) .toBe (true)
         expect (a) .toHaveLength (i + 1)
      }

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec4 (++n,++n,++n,++n)
         expect (a [i] .equals (v)) .toBe (true)
      }
   })

   test ("shift", () =>
   {
      const
         N = 10,
         a = new MFVec4 ()

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec4 (++n,++n,++n,++n)
         a .push (v)
         expect (a [i] .equals (v)) .toBe (true)
         expect (a) .toHaveLength (i + 1)
      }

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec4 (++n,++n,++n,++n)
         expect (a [i] .equals (v)) .toBe (true)
      }

      const b = a .slice ()

      for (let j = 0; j < N; ++ j)
      {
         expect (a .shift () .equals (b .shift ())) .toBe (true)
         expect (a) .toHaveLength (N - j - 1)

         for (let i = 0, n = j * comp + comp; i < a .length; ++ i)
         {
            const v = new SFVec4 (++n,++n,++n,++n)
            expect (a [i] .equals (v)) .toBe (true)
         }
      }
   })

   test ("slice", () =>
   {
      const
         N = 10,
         a = new MFVec4 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec4 (++n,++n,++n,++n))) .toBe (i + 1)

      expect (a) .toHaveLength (N)

      const b = a .slice ()

      expect (b) .toHaveLength (N)
      expect (b) .toBeInstanceOf (MFVec4)

      for (let i = 0; i < N; ++ i)
      {
         expect (b [i]) .not .toBe (a [i])
         expect (b [i] .equals (a [i])) .toBe (true)
      }

      const c = a .slice (1, N - 1)

      expect (c) .toHaveLength (N - 2)
      expect (c) .toBeInstanceOf (MFVec4)

      for (let i = 0, j = 1; i < N - 2; ++ i, ++ j)
      {
         expect (c [i]) .not .toBe (a [j])
         expect (c [i] .equals (a [j])) .toBe (true)
      }
   })

   test ("splice", () =>
   {
      const
         N = 10,
         a = new MFVec4 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec4 (++n,++n,++n,++n))) .toBe (i + 1)

      const
         v0 = a [0] .copy (),
         v1 = a .at (-1) .copy ()

      expect (a) .toHaveLength (N)

      const b = a .splice (1,N-2)

      expect (a) .toHaveLength (2)
      expect (b) .toHaveLength (N-2)
      expect (b) .toBeInstanceOf (MFVec4)
      expect (a [0] .equals (v0)) .toBe (true)
      expect (a [1] .equals (v1)) .toBe (true)

      for (let i = 0, n = comp; i < N-2; ++ i)
         expect (b [i] .equals (new SFVec4 (++n,++n,++n,++n))) .toBe (true)

      const c = a .splice (1,0,...b)

      expect (a) .toHaveLength (N)
      expect (c) .toHaveLength (0)
      expect (c) .toBeInstanceOf (MFVec4)

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a [i] .equals (new SFVec4 (++n,++n,++n,++n))) .toBe (true)

      const d = a .splice (1,N-2,...b)

      expect (a) .toHaveLength (N)
      expect (d) .toHaveLength (N-2)
      expect (d) .toBeInstanceOf (MFVec4)

      for (let i = 0, n = comp; i < N-2; ++ i)
      {
         const v = new SFVec4 (++n,++n,++n,++n)
         expect (d [i] .equals (v)) .toBe (true)
         expect (b [i] .equals (v)) .toBe (true)
         expect (d [i]) .not .toBe (b [i])
      }

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a [i] .equals (new SFVec4 (++n,++n,++n,++n))) .toBe (true)

      const e = new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8), new SFVec4 (9, 10, 11, 12), new SFVec4 (13, 14, 15, 16))

      expect (e .splice (2) .equals (new MFVec4 (new SFVec4 (9, 10, 11, 12), new SFVec4 (13, 14, 15, 16)))) .toBe (true)
      expect (e .equals (new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8)))) .toBe (true)

      expect (e .splice () .equals (new MFVec4 ())) .toBe (true)
      expect (e .equals (new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8)))) .toBe (true)
   })

   test ("sort-reverse", () =>
   {
      const a = new MFVec4 (new SFVec4 (1, 2, 3, 4),
                            new SFVec4 (2, 3, 4, 5),
                            new SFVec4 (3, 4, 5, 6),
                            new SFVec4 (4, 5, 6, 7),
                            new SFVec4 (5, 6, 7, 8),
                            new SFVec4 (6, 7, 8, 9))

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      expect (a [1] .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true)
      expect (a [2] .equals (new SFVec4 (3, 4, 5, 6))) .toBe (true)
      expect (a [3] .equals (new SFVec4 (4, 5, 6, 7))) .toBe (true)
      expect (a [4] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [5] .equals (new SFVec4 (6, 7, 8, 9))) .toBe (true)

      expect (a .reverse ()) .toBe (a)

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec4 (6, 7, 8, 9))) .toBe (true)
      expect (a [1] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [2] .equals (new SFVec4 (4, 5, 6, 7))) .toBe (true)
      expect (a [3] .equals (new SFVec4 (3, 4, 5, 6))) .toBe (true)
      expect (a [4] .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true)
      expect (a [5] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)

      expect (a .sort ()) .toBe (a)

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
      expect (a [1] .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true)
      expect (a [2] .equals (new SFVec4 (3, 4, 5, 6))) .toBe (true)
      expect (a [3] .equals (new SFVec4 (4, 5, 6, 7))) .toBe (true)
      expect (a [4] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [5] .equals (new SFVec4 (6, 7, 8, 9))) .toBe (true)

      const Algorithm = X3D .Algorithm

      a .sort ((a, b) => Algorithm .cmp (b .z, a .z))

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec4 (6, 7, 8, 9))) .toBe (true)
      expect (a [1] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true)
      expect (a [2] .equals (new SFVec4 (4, 5, 6, 7))) .toBe (true)
      expect (a [3] .equals (new SFVec4 (3, 4, 5, 6))) .toBe (true)
      expect (a [4] .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true)
      expect (a [5] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true)
   })

   test ("unshift", () =>
   {
      const
         N = 1_000,
         a = new MFVec4 ()

      expect (a) .toHaveLength (0)

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec4 (++n,++n,++n,++n)
         expect (a .unshift (v)) .toBe (i + 1)
         expect (a [0] .equals (v)) .toBe (true)
         expect (a) .toHaveLength (i + 1)
      }

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec4 (++n,++n,++n,++n)
         expect (a .at (-(i + 1)) .equals (v)) .toBe (true)
      }
   })

   test ("enumerate", () =>
   {
      const properties = [
         0,1,2
      ]

      enumerate (properties, new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8), new SFVec4 (9, 10, 11, 12)));
   })

   test ("enumerate single", () =>
   {
      const properties = [
         "x",
         "y",
         "z",
         "w",
      ]

      enumerate (properties, new MFVec4 () [0])
   })

   test ("concat", () =>
   {
      const
         a = new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8)),
         b = a .concat (),
         c = a .concat (new MFVec4 (new SFVec4 (9, 10, 11, 12), new SFVec4 (10, 11, 12, 13))),
         d = a .concat (new MFVec4 (new SFVec4 (9, 10, 11, 12), new SFVec4 (10, 11, 12, 13)), new MFVec4 (new SFVec4 (13, 14, 15, 16), new SFVec4 (16, 17, 18, 19)));

      expect (a) .toHaveLength (2);
      expect (a [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true);
      expect (a [1] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true);

      expect (b) .toHaveLength (2);
      expect (b [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true);
      expect (b [1] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true);

      expect (c) .toHaveLength (4);
      expect (c [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true);
      expect (c [1] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true);
      expect (c [2] .equals (new SFVec4 (9, 10, 11, 12))) .toBe (true);
      expect (c [3] .equals (new SFVec4 (10, 11, 12, 13))) .toBe (true);

      expect (d) .toHaveLength (6);
      expect (d [0] .equals (new SFVec4 (1, 2, 3, 4))) .toBe (true);
      expect (d [1] .equals (new SFVec4 (5, 6, 7, 8))) .toBe (true);
      expect (d [2] .equals (new SFVec4 (9, 10, 11, 12))) .toBe (true);
      expect (d [3] .equals (new SFVec4 (10, 11, 12, 13))) .toBe (true);
      expect (d [4] .equals (new SFVec4 (13, 14, 15, 16))) .toBe (true);
      expect (d [5] .equals (new SFVec4 (16, 17, 18, 19))) .toBe (true);
   });

   test ("flat", () =>
   {
      const
         a = new MFVec4 (),
         b = new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8));

      expect (a .flat ()) .toBeInstanceOf (Array);
      expect (a .flat ()) .toEqual ([ ]);
      expect (b .flat ()) .toBeInstanceOf (Array);
      expect (b .flat ()) .toEqual ([1,2,3,4,5,6,7,8]);
   });

   test ("flatMap", () =>
   {
      const
         a = new MFVec4 (),
         b = new MFVec4 (new SFVec4 (1, 2, 3, 4), new SFVec4 (5, 6, 7, 8));

      expect (a .flatMap (v => v .multiply (2))) .toBeInstanceOf (Array);
      expect (a .flatMap (v => v .multiply (2))) .toEqual ([ ]);
      expect (b .flatMap (v => v .multiply (2))) .toBeInstanceOf (Array);
      expect (b .flatMap (v => v .multiply (2))) .toEqual ([2,4,6,8,10,12,14,16]);
   });

   test ("length", () =>
   {
      expect (new MFVec4 () .length) .toBe (0);
      expect (new MFVec4 (new SFVec4 (1,2,3,4), new SFVec4 (1,2,3,4)) .length) .toBe (2);

      const m = new MFVec4 ();

      m .length = 10;

      expect (m) .toHaveLength (10);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFVec4 ())) .toBe (true);

      m .length = 20;

      expect (m) .toHaveLength (20);

      for (let i = 0; i < 20; ++ i)
         expect (m [i] .equals (new SFVec4 ())) .toBe (true);

      // Test shrinking the array and then growing it again.

      for (let i = 0; i < 20; ++ i)
         m [i] = new SFVec4 (2,2,2,2);

      m .length = 10;

      expect (m) .toHaveLength (10);

      m .length = 20;

      expect (m) .toHaveLength (20);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFVec4 (2,2,2,2))) .toBe (true);

      for (let i = 10; i < 20; ++ i)
         expect (m [i] .equals (new SFVec4 ())) .toBe (true);
   });

   test ("fromString", () =>
   {
      const a = new MFVec4 ();

      a .fromString ("[1.2 2.3 3.4 4.5, 2.3 3.4 4.5 5.6 ]");

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFVec4 (new SFVec4 (1.2, 2.3, 3.4, 4.5), new SFVec4 (2.3, 3.4, 4.5, 5.6)))) .toBe (true);

      a .fromString ("1 2 3 4");

      expect (a) .toHaveLength (1);
      expect (a .equals (new MFVec4 (new SFVec4 (1, 2, 3, 4)))) .toBe (true);

      a .fromString ("[ ]");

      expect (a) .toHaveLength (0);
      expect (a .equals (new MFVec4 ())) .toBe (true);
   });

   test ("fromVRMLString", () =>
   {
      const a = new MFVec4 ();

      a .fromVRMLString ("[1.2 2.3 3.4 4.5, 2.3 3.4 4.5 5.6 ]");

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFVec4 (new SFVec4 (1.2, 2.3, 3.4, 4.5), new SFVec4 (2.3, 3.4, 4.5, 5.6)))) .toBe (true);

      a .fromVRMLString ("1 2 3 4");

      expect (a) .toHaveLength (1);
      expect (a .equals (new MFVec4 (new SFVec4 (1, 2, 3, 4)))) .toBe (true);

      a .fromVRMLString ("[ ]");

      expect (a) .toHaveLength (0);
      expect (a .equals (new MFVec4 ())) .toBe (true);
   });
}
