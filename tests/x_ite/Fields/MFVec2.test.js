const
   X3D     = require ("../../X3D"),
   Browser = X3D .createBrowser () .browser;

const arrays = [
   ["MFVec2d", X3D .MFVec2d, X3D .SFVec2d],
   ["MFVec2f", X3D .MFVec2f, X3D .SFVec2f],
];

const comp = 2;

for (const [typeName, MFVec2, SFVec2] of arrays)
{
   test ("get1Value", () =>
   {
      const field = new MFVec2 ();

      expect (field) .toHaveLength (0);

      for (let i = 0; i < 10; ++ i)
      {
         expect (field [i] .equals (new SFVec2 ())) .toBe (true);
         expect (field) .toHaveLength (i + 1);
      }
   });

   test ("setValue", () =>
   {
      const field = new MFVec2 ();

      field .setValue ([1, 2, 5, 6]);

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6)))) .toBe (true);
      expect (field [0] .equals (new SFVec2 (1, 2))) .toBe (true);
      expect (field [1] .equals (new SFVec2 (5, 6))) .toBe (true);

      field .setValue ([9, 8, 5, 4, 3]);

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec2 (new SFVec2 (9, 8), new SFVec2 (5, 4)))) .toBe (true);
      expect (field [0] .equals (new SFVec2 (9, 8))) .toBe (true);
      expect (field [1] .equals (new SFVec2 (5, 4))) .toBe (true);

      field .setValue ([ ]);

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFVec2 ())) .toBe (true);

      field .setValue (new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6)));

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6)))) .toBe (true);

      field .setValue (new MFVec2 (new SFVec2 (9, 8), new SFVec2 (5, 4)));

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec2 (new SFVec2 (9, 8), new SFVec2 (5, 4)))) .toBe (true);

      field .setValue ((new MFVec2 ()));

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFVec2 ())) .toBe (true);
   });

   test ("assign", () =>
   {
      const field = new MFVec2 ()

      field .assign (new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6)));

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6)))) .toBe (true);

      field .assign (new MFVec2 (new SFVec2 (9, 8), new SFVec2 (5, 4)));

      expect (field) .toHaveLength (2);
      expect (field .equals (new MFVec2 (new SFVec2 (9, 8), new SFVec2 (5, 4)))) .toBe (true);

      field .assign (new MFVec2 ());

      expect (field) .toHaveLength (0);
      expect (field .equals (new MFVec2 ())) .toBe (true);
   })

   test ("shrinkToFit", () =>
   {
      const field = new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6));

      expect (field .shrinkToFit ()) .toHaveLength (4);
      expect (field .shrinkToFit ()) .toBe (field .shrinkToFit ());
   });

   test ("common", () =>
   {
      const field = new MFVec2 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [typeName])
      expect (field .getTypeName ()) .toBe (typeName)
      expect (Object .prototype .toString .call (field)) .toBe (`[object ${typeName}]`)
   })

   test ("copy", () =>
   {
      const
         a = new MFVec2 (new SFVec2 (1, 2),new SFVec2 (5, 6),new SFVec2 (9, 10)),
         b = a .copy ()

      expect (b) .toBeInstanceOf (MFVec2)
      expect (b) .toHaveLength (a .length)
      expect (b .equals (a)) .toBe (true)
      expect (b .getValue ()) .not .toBe (a .getValue ())
   })

   test ("equals", () =>
   {
      const
         a = new MFVec2 (),
         b = new MFVec2 (new SFVec2 (1, 2),new SFVec2 (5, 6)),
         c = new MFVec2 (new SFVec2 (1, 2),new SFVec2 (5, 6))

      expect (a .equals (a)) .toBe (true)
      expect (b .equals (b)) .toBe (true)
      expect (a .equals (b)) .toBe (false)
      expect (b .equals (c)) .toBe (true)
   })

   test ("isDefaultValue", () =>
   {
      const
         a = new MFVec2 (),
         b = new MFVec2 (new SFVec2 ())

      expect (a .isDefaultValue ()) .toBe (true)
      expect (b .isDefaultValue ()) .toBe (false)
   })

   test ("constructor", () =>
   {
      const a = new MFVec2 ()

      expect (a) .toHaveLength (0)
      expect (a [0] .equals (new SFVec2 ())) .toBe (true)
      expect (a) .toHaveLength (1)

      const b = new MFVec2 (new SFVec2 (1, 2),new SFVec2 (2, 3),new SFVec2 (3, 4),new SFVec2 (4, 5),new SFVec2 (5, 6))
      expect (b) .toHaveLength (5)
      expect (b [0] .equals (new SFVec2 (1, 2))) .toBe (true)
      expect (b [1] .equals (new SFVec2 (2, 3))) .toBe (true)
      expect (b [2] .equals (new SFVec2 (3, 4))) .toBe (true)
      expect (b [3] .equals (new SFVec2 (4, 5))) .toBe (true)
      expect (b [4] .equals (new SFVec2 (5, 6))) .toBe (true)

      const c = [... b]
      expect (c) .toHaveLength (5)
      expect (c [0] .equals (new SFVec2 (1, 2))) .toBe (true)
      expect (c [1] .equals (new SFVec2 (2, 3))) .toBe (true)
      expect (c [2] .equals (new SFVec2 (3, 4))) .toBe (true)
      expect (c [3] .equals (new SFVec2 (4, 5))) .toBe (true)
      expect (c [4] .equals (new SFVec2 (5, 6))) .toBe (true)
      for (let i = 0; i < 5; ++ i)
         expect (c [i]) .toBe (b [i])

      const d = new MFVec2 (new SFVec2 (1, 2))
      expect (d) .toHaveLength (1)
      expect (d [0] .equals (new SFVec2 (1, 2))) .toBe (true)
      d [0] .x = 2
      d [0] .y = 3
      d [1] .x = 3
      d [1] .y = 4
      expect (d) .toHaveLength (2)
      expect (d [0] .equals (new SFVec2 (2, 3))) .toBe (true)
      expect (d [1] .equals (new SFVec2 (3, 4))) .toBe (true)

      expect ((new MFVec2 ()) [0] .equals (new SFVec2 (0,0))) .toBe (true);
   })

   test ("basic-functions", () =>
   {
      const a = new MFVec2 (new SFVec2 (1, 2))

      expect (a [0] .x) .toBe (1)
      expect (a [0] .y) .toBe (2)
      a [1] = new SFVec2 (3, 4)
      expect (a [1] .x) .toBe (3)
      expect (a [1] .y) .toBe (4)
      a .push (new SFVec2 (4, 5))
      expect (a .at (-1) .x) .toBe (4)
      expect (a .at (-1) .y) .toBe (5)
      a .unshift (new SFVec2 (5, 6))
      expect (a [0] .x) .toBe (5)
      expect (a [0] .y) .toBe (6)
      expect (a) .toHaveLength (4)
      expect (a .splice (1, 1, new SFVec2 (6, 7))) .toHaveLength (1)
      expect (a [1] .x) .toBe (6)
      expect (a [1] .y) .toBe (7)
      expect (a .splice (1, 1, new SFVec2 (7, 8))) .toHaveLength (1)
      expect (a [1] .x) .toBe (7)
      expect (a [1] .y) .toBe (8)
      expect (a .splice (1, 0, new SFVec2 (8, 9))) .toHaveLength (0)
      expect (a) .toHaveLength (5)
      expect (a [0] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [1] .equals (new SFVec2 (8, 9))) .toBe (true)
      expect (a [2] .equals (new SFVec2 (7, 8))) .toBe (true)
      expect (a [3] .equals (new SFVec2 (3, 4))) .toBe (true)
      expect (a [4] .equals (new SFVec2 (4, 5))) .toBe (true)

      expect (a .fill (new SFVec2 (5, 6))) .toBe (a)
      expect (a) .toHaveLength (5)
      expect (a [0] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [1] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [2] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [3] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [4] .equals (new SFVec2 (5, 6))) .toBe (true)

      expect (a .includes (new SFVec2 (9, 9))) .toBe (false)
      expect (a .indexOf (new SFVec2 (9, 9))) .toBe (-1)
      expect (a .lastIndexOf (new SFVec2 (9, 9))) .toBe (-1)

      expect (a .includes (a [0])) .toBe (true)
      expect (a .indexOf (a [0])) .toBe (0)
      expect (a .lastIndexOf (a .at (-1))) .toBe (a .length - 1)

      a [1] = new SFVec2 (5, 6)
      a [3] = new SFVec2 (5, 6)

      expect (a .includes (a [1])) .toBe (true)
      expect (a .indexOf (a [1])) .toBe (1)
      expect (a .lastIndexOf (a [3])) .toBe (3)

      expect (a .splice (0, 5, new SFVec2 (1, 2),new SFVec2 (2, 3),new SFVec2 (3, 4),new SFVec2 (5, 6),new SFVec2 (5, 6))) .toHaveLength (5)
      expect (a) .toHaveLength (5)
      expect (a [0] .equals (new SFVec2 (1, 2))) .toBe (true)
      expect (a [1] .equals (new SFVec2 (2, 3))) .toBe (true)
      expect (a [2] .equals (new SFVec2 (3, 4))) .toBe (true)
      expect (a [3] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [4] .equals (new SFVec2 (5, 6))) .toBe (true)
   })

   test ("at", () =>
   {
      const
         N = 10,
         a = new MFVec2 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec2 (++n,++n))) .toBe (i + 1)

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec2 (++n,++n)
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
         a = new MFVec2 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec2 (++n,++n))) .toBe (i + 1)

      expect ([... a .entries ()]) .toHaveLength (N)

      for (const [i, value] of a .entries ())
         expect (value) .toBe (a [i])
   })

   test ("fill", () =>
   {
      const a = new MFVec2 ()

      a .length = 6

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec2 (0,0))) .toBe (true)
      expect (a [1] .equals (new SFVec2 (0,0))) .toBe (true)
      expect (a [2] .equals (new SFVec2 (0,0))) .toBe (true)
      expect (a [3] .equals (new SFVec2 (0,0))) .toBe (true)
      expect (a [4] .equals (new SFVec2 (0,0))) .toBe (true)
      expect (a [5] .equals (new SFVec2 (0,0))) .toBe (true)

      expect (a .fill (new SFVec2 (1, 2))) .toBe (a)

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec2 (1, 2))) .toBe (true)
      expect (a [1] .equals (new SFVec2 (1, 2))) .toBe (true)
      expect (a [2] .equals (new SFVec2 (1, 2))) .toBe (true)
      expect (a [3] .equals (new SFVec2 (1, 2))) .toBe (true)
      expect (a [4] .equals (new SFVec2 (1, 2))) .toBe (true)
      expect (a [5] .equals (new SFVec2 (1, 2))) .toBe (true)

      expect (a .fill (new SFVec2 (5, 6))) .toBe (a)

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [1] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [2] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [3] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [4] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [5] .equals (new SFVec2 (5, 6))) .toBe (true)
   })

   test ("filter", () =>
   {
      const
         N = 10,
         a = new MFVec2 ()

      for (let i = 0, n = 0; i < N; ++ i, ++n)
         expect (a .push (new SFVec2 (++n,++n))) .toBe (i + 1)

      const b = a .filter (v => v.x % 2)

      expect (b) .toBeInstanceOf (MFVec2)
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
         a = new MFVec2 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec2 (++n,++n))) .toBe (i + 1)

      const
         b = a .find (v => v .equals (new SFVec2 (1, 2))),
         c = a .find (v => v .equals (new SFVec2 ()))

      expect (b) .toBe (a [0])
      expect (c) .toBe (undefined)
   })

   test ("keys", () =>
   {
      const
         N = 10,
         a = new MFVec2 ()

      a .length = N
      expect (a .keys ()) .toEqual (new Array (N) .keys ())
      a .length = N/2
      expect (a .keys ()) .toEqual (new Array (N/2) .keys ())
   })

   test ("map", () =>
   {
      const
         N = 10,
         a = new MFVec2 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec2 (++n,++n))) .toBe (i + 1)

      expect (a) .toHaveLength (N)

      const b = a .map (v => v)

      expect (b) .toBeInstanceOf (MFVec2)

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
         a = new MFVec2 ()

      expect (a) .toHaveLength (0)

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec2 (++n,++n)
         a .push (v)
         expect (a [i] .equals (v)) .toBe (true)
         expect (a) .toHaveLength (i + 1)
      }

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec2 (++n,++n)
         expect (a [i] .equals (v)) .toBe (true)
      }

      const b = a .slice ()

      for (let j = 0; j < N; ++ j)
      {
         expect (a .pop () .equals (b .pop ())) .toBe (true)
         expect (a) .toHaveLength (N - j - 1)

         for (let i = 0, n = 0; i < a .length; ++ i)
         {
            const v = new SFVec2 (++n,++n)
            expect (a [i] .equals (v)) .toBe (true)
         }
      }
   })

   test ("push", () =>
   {
      const
         N = 1_000,
         a = new MFVec2 ()

      expect (a) .toHaveLength (0)

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec2 (++n,++n)
         expect (a .push (v)) .toBe (i + 1)
         expect (a [i] .equals (v)) .toBe (true)
         expect (a) .toHaveLength (i + 1)
      }

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec2 (++n,++n)
         expect (a [i] .equals (v)) .toBe (true)
      }
   })

   test ("shift", () =>
   {
      const
         N = 10,
         a = new MFVec2 ()

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec2 (++n,++n)
         a .push (v)
         expect (a [i] .equals (v)) .toBe (true)
         expect (a) .toHaveLength (i + 1)
      }

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec2 (++n,++n)
         expect (a [i] .equals (v)) .toBe (true)
      }

      const b = a .slice ()

      for (let j = 0; j < N; ++ j)
      {
         expect (a .shift () .equals (b .shift ())) .toBe (true)
         expect (a) .toHaveLength (N - j - 1)

         for (let i = 0, n = j * comp + comp; i < a .length; ++ i)
         {
            const v = new SFVec2 (++n,++n)
            expect (a [i] .equals (v)) .toBe (true)
         }
      }
   })

   test ("slice", () =>
   {
      const
         N = 10,
         a = new MFVec2 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec2 (++n,++n))) .toBe (i + 1)

      expect (a) .toHaveLength (N)

      const b = a .slice ()

      expect (b) .toHaveLength (N)
      expect (b) .toBeInstanceOf (MFVec2)

      for (let i = 0; i < N; ++ i)
      {
         expect (b [i]) .not .toBe (a [i])
         expect (b [i] .equals (a [i])) .toBe (true)
      }

      const c = a .slice (1, N - 1)

      expect (c) .toHaveLength (N - 2)
      expect (c) .toBeInstanceOf (MFVec2)

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
         a = new MFVec2 ()

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a .push (new SFVec2 (++n,++n))) .toBe (i + 1)

      const
         v0 = a [0] .copy (),
         v1 = a .at (-1) .copy ()

      expect (a) .toHaveLength (N)

      const b = a .splice (1,N-2)

      expect (a) .toHaveLength (2)
      expect (b) .toHaveLength (N-2)
      expect (b) .toBeInstanceOf (MFVec2)
      expect (a [0] .equals (v0)) .toBe (true)
      expect (a [1] .equals (v1)) .toBe (true)

      for (let i = 0, n = comp; i < N-2; ++ i)
         expect (b [i] .equals (new SFVec2 (++n,++n))) .toBe (true)

      const c = a .splice (1,0,...b)

      expect (a) .toHaveLength (N)
      expect (c) .toHaveLength (0)
      expect (c) .toBeInstanceOf (MFVec2)

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a [i] .equals (new SFVec2 (++n,++n))) .toBe (true)

      const d = a .splice (1,N-2,...b)

      expect (a) .toHaveLength (N)
      expect (d) .toHaveLength (N-2)
      expect (d) .toBeInstanceOf (MFVec2)

      for (let i = 0, n = comp; i < N-2; ++ i)
      {
         const v = new SFVec2 (++n,++n)
         expect (d [i] .equals (v)) .toBe (true)
         expect (b [i] .equals (v)) .toBe (true)
         expect (d [i]) .not .toBe (b [i])
      }

      for (let i = 0, n = 0; i < N; ++ i)
         expect (a [i] .equals (new SFVec2 (++n,++n))) .toBe (true)

      const e = new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6), new SFVec2 (9, 10), new SFVec2 (13, 14))

      expect (e .splice (2) .equals (new MFVec2 (new SFVec2 (9, 10), new SFVec2 (13, 14)))) .toBe (true)
      expect (e .equals (new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6)))) .toBe (true)

      expect (e .splice () .equals (new MFVec2 ())) .toBe (true)
      expect (e .equals (new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6)))) .toBe (true)
   })

   test ("sort-reverse", () =>
   {
      const a = new MFVec2 (new SFVec2 (1, 2),
                            new SFVec2 (2, 3),
                            new SFVec2 (3, 4),
                            new SFVec2 (4, 5),
                            new SFVec2 (5, 6),
                            new SFVec2 (6, 7))

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec2 (1, 2))) .toBe (true)
      expect (a [1] .equals (new SFVec2 (2, 3))) .toBe (true)
      expect (a [2] .equals (new SFVec2 (3, 4))) .toBe (true)
      expect (a [3] .equals (new SFVec2 (4, 5))) .toBe (true)
      expect (a [4] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [5] .equals (new SFVec2 (6, 7))) .toBe (true)

      expect (a .reverse ()) .toBe (a)

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec2 (6, 7))) .toBe (true)
      expect (a [1] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [2] .equals (new SFVec2 (4, 5))) .toBe (true)
      expect (a [3] .equals (new SFVec2 (3, 4))) .toBe (true)
      expect (a [4] .equals (new SFVec2 (2, 3))) .toBe (true)
      expect (a [5] .equals (new SFVec2 (1, 2))) .toBe (true)

      expect (a .sort ()) .toBe (a)

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec2 (1, 2))) .toBe (true)
      expect (a [1] .equals (new SFVec2 (2, 3))) .toBe (true)
      expect (a [2] .equals (new SFVec2 (3, 4))) .toBe (true)
      expect (a [3] .equals (new SFVec2 (4, 5))) .toBe (true)
      expect (a [4] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [5] .equals (new SFVec2 (6, 7))) .toBe (true)

      const Algorithm = X3D .Algorithm

      a .sort ((a, b) => Algorithm .cmp (b .y, a .y))

      expect (a) .toHaveLength (6)
      expect (a [0] .equals (new SFVec2 (6, 7))) .toBe (true)
      expect (a [1] .equals (new SFVec2 (5, 6))) .toBe (true)
      expect (a [2] .equals (new SFVec2 (4, 5))) .toBe (true)
      expect (a [3] .equals (new SFVec2 (3, 4))) .toBe (true)
      expect (a [4] .equals (new SFVec2 (2, 3))) .toBe (true)
      expect (a [5] .equals (new SFVec2 (1, 2))) .toBe (true)
   })

   test ("unshift", () =>
   {
      const
         N = 1_000,
         a = new MFVec2 ()

      expect (a) .toHaveLength (0)

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec2 (++n,++n)
         expect (a .unshift (v)) .toBe (i + 1)
         expect (a [0] .equals (v)) .toBe (true)
         expect (a) .toHaveLength (i + 1)
      }

      for (let i = 0, n = 0; i < N; ++ i)
      {
         const v = new SFVec2 (++n,++n)
         expect (a .at (-(i + 1)) .equals (v)) .toBe (true)
      }
   })

   test ("enumerate", () =>
   {
      const properties = [
         0,1,2
      ]

      enumerate (properties, new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6), new SFVec2 (9, 10)));
   })

   test ("enumerate single", () =>
   {
      const properties = [
         "x",
         "y",
      ]

      enumerate (properties, new MFVec2 () [0])
   })

   test ("concat", () =>
   {
      const
         a = new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6)),
         b = a .concat (),
         c = a .concat (new MFVec2 (new SFVec2 (9, 10), new SFVec2 (10, 11))),
         d = a .concat (new MFVec2 (new SFVec2 (9, 10), new SFVec2 (10, 11)), new MFVec2 (new SFVec2 (13, 14), new SFVec2 (16, 17)));

      expect (a) .toHaveLength (2);
      expect (a [0] .equals (new SFVec2 (1, 2))) .toBe (true);
      expect (a [1] .equals (new SFVec2 (5, 6))) .toBe (true);

      expect (b) .toHaveLength (2);
      expect (b [0] .equals (new SFVec2 (1, 2))) .toBe (true);
      expect (b [1] .equals (new SFVec2 (5, 6))) .toBe (true);

      expect (c) .toHaveLength (4);
      expect (c [0] .equals (new SFVec2 (1, 2))) .toBe (true);
      expect (c [1] .equals (new SFVec2 (5, 6))) .toBe (true);
      expect (c [2] .equals (new SFVec2 (9, 10))) .toBe (true);
      expect (c [3] .equals (new SFVec2 (10, 11))) .toBe (true);

      expect (d) .toHaveLength (6);
      expect (d [0] .equals (new SFVec2 (1, 2))) .toBe (true);
      expect (d [1] .equals (new SFVec2 (5, 6))) .toBe (true);
      expect (d [2] .equals (new SFVec2 (9, 10))) .toBe (true);
      expect (d [3] .equals (new SFVec2 (10, 11))) .toBe (true);
      expect (d [4] .equals (new SFVec2 (13, 14))) .toBe (true);
      expect (d [5] .equals (new SFVec2 (16, 17))) .toBe (true);
   });

   test ("flat", () =>
   {
      const
         a = new MFVec2 (),
         b = new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6));

      expect (a .flat ()) .toBeInstanceOf (Array);
      expect (a .flat ()) .toEqual ([ ]);
      expect (b .flat ()) .toBeInstanceOf (Array);
      expect (b .flat ()) .toEqual ([1,2,5,6]);
   });

   test ("flatMap", () =>
   {
      const
         a = new MFVec2 (),
         b = new MFVec2 (new SFVec2 (1, 2), new SFVec2 (5, 6));

      expect (a .flatMap (v => v .multiply (2))) .toBeInstanceOf (Array);
      expect (a .flatMap (v => v .multiply (2))) .toEqual ([ ]);
      expect (b .flatMap (v => v .multiply (2))) .toBeInstanceOf (Array);
      expect (b .flatMap (v => v .multiply (2))) .toEqual ([2,4,10,12]);
   });

   test ("length", () =>
   {
      expect (new MFVec2 () .length) .toBe (0);
      expect (new MFVec2 (new SFVec2 (1,2), new SFVec2 (1,2)) .length) .toBe (2);

      const m = new MFVec2 ();

      m .length = 10;

      expect (m) .toHaveLength (10);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFVec2 ())) .toBe (true);

      m .length = 20;

      expect (m) .toHaveLength (20);

      for (let i = 0; i < 20; ++ i)
         expect (m [i] .equals (new SFVec2 ())) .toBe (true);

      // Test shrinking the array and then growing it again.

      for (let i = 0; i < 20; ++ i)
         m [i] = new SFVec2 (2,2);

      m .length = 10;

      expect (m) .toHaveLength (10);

      m .length = 20;

      expect (m) .toHaveLength (20);

      for (let i = 0; i < 10; ++ i)
         expect (m [i] .equals (new SFVec2 (2,2))) .toBe (true);

      for (let i = 10; i < 20; ++ i)
         expect (m [i] .equals (new SFVec2 ())) .toBe (true);
   });

   test ("fromString", () =>
   {
      const a = new MFVec2 ();

      a .fromString ("[1.2 2.3, 2.3 3.4 ]");

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFVec2 (new SFVec2 (1.2, 2.3), new SFVec2 (2.3, 3.4)))) .toBe (true);

      a .fromString ("1 2");

      expect (a) .toHaveLength (1);
      expect (a .equals (new MFVec2 (new SFVec2 (1, 2)))) .toBe (true);

      a .fromString ("[ ]");

      expect (a) .toHaveLength (0);
      expect (a .equals (new MFVec2 ())) .toBe (true);

      expect (() => a .fromString ("[1 2 3 4 foo 6 7 8]")) .toThrow (Error);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromString ("[1 2, 2 3]", s);

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFVec2 (new SFVec2 (1000, 2000), new SFVec2 (2000, 3000)))) .toBe (true);
   });

   test ("fromVRMLString", () =>
   {
      const a = new MFVec2 ();

      a .fromVRMLString ("[1.2 2.3, 2.3 3.4 ]");

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFVec2 (new SFVec2 (1.2, 2.3), new SFVec2 (2.3, 3.4)))) .toBe (true);

      a .fromVRMLString ("1 2");

      expect (a) .toHaveLength (1);
      expect (a .equals (new MFVec2 (new SFVec2 (1, 2)))) .toBe (true);

      a .fromVRMLString ("[ ]");

      expect (a) .toHaveLength (0);
      expect (a .equals (new MFVec2 ())) .toBe (true);

      expect (() => a .fromVRMLString ("[1 2 3 4 foo 6 7 8]")) .toThrow (Error);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromVRMLString ("[1 2, 2 3]", s);

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFVec2 (new SFVec2 (1000, 2000), new SFVec2 (2000, 3000)))) .toBe (true);
   });

   test ("fromXMLString", () =>
   {
      const a = new MFVec2 ();

      a .fromXMLString ("1.2 2.3, 2.3 3.4 ");

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFVec2 (new SFVec2 (1.2, 2.3), new SFVec2 (2.3, 3.4)))) .toBe (true);

      a .fromXMLString ("1 2");

      expect (a) .toHaveLength (1);
      expect (a .equals (new MFVec2 (new SFVec2 (1, 2)))) .toBe (true);

      expect (() => a .fromXMLString ("")) .toThrow (Error);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromXMLString ("1 2, 2 3", s);

      expect (a) .toHaveLength (2);
      expect (a .equals (new MFVec2 (new SFVec2 (1000, 2000), new SFVec2 (2000, 3000)))) .toBe (true);
   });
}
