const
   X3D    = require ("../../X3D"),
   MFTime = X3D .MFTime

test ("constructor", () =>
{
   let field

   expect ((field = new MFTime (), field [0]))                .toBe (-1)
   expect ((field = new MFTime (NaN), field [0]))             .toBe (NaN)
   expect ((field = new MFTime (Infinity), field [0]))        .toBe (Infinity)
   expect ((field = new MFTime (-Infinity), field [0]))       .toBe (-Infinity)
   expect ((field = new MFTime (undefined), field [0]))       .toBe (NaN)
   expect ((field = new MFTime (null), field [0]))            .toBe (0)
   expect ((field = new MFTime ({}), field [0]))              .toBe (NaN)
   expect ((field = new MFTime (""), field [0]))              .toBe (0)
   expect ((field = new MFTime ("123"), field [0]))           .toBe (123)
   expect ((field = new MFTime ("123.456"), field [0]))       .toBe (123.456)
   expect ((field = new MFTime (false), field [0]))           .toBe (0)
   expect ((field = new MFTime (true), field [0]))            .toBe (1)
   expect ((field = new MFTime (123.456), field [0]))         .toBe (123.456)
   expect ((field = new MFTime (123_456_789_012), field [0])) .toBe (123_456_789_012)
   expect ((field = new MFTime (0xffffffff), field [0]))      .toBe (0xffffffff)
   expect ((field = new MFTime (666), field [0]))             .toBe (666)
   expect ((field = new MFTime (-666), field [0]))            .toBe (-666)

   expect ((new MFTime ()) [0]) .toBe (-1);
})

test ("get1Value", () =>
{
   const field = new MFTime ();

   expect (field) .toHaveLength (0);

   for (let i = 0; i < 10; ++ i)
   {
      expect (field [i]) .toBe (-1);
      expect (field) .toHaveLength (i + 1);
   }
});

test ("set1Value", () =>
{
   const field = new MFTime ()

   expect ((field [0] = NaN,             field [0])) .toBe (NaN)
   expect ((field [0] = Infinity,        field [0])) .toBe (Infinity)
   expect ((field [0] = -Infinity,       field [0])) .toBe (-Infinity)
   expect ((field [0] = undefined,       field [0])) .toBe (NaN)
   expect ((field [0] = null,            field [0])) .toBe (0)
   expect ((field [0] = {},              field [0])) .toBe (NaN)
   expect ((field [0] = "",              field [0])) .toBe (0)
   expect ((field [0] = "123",           field [0])) .toBe (123)
   expect ((field [0] = "123.456",       field [0])) .toBe (123.456)
   expect ((field [0] = false,           field [0])) .toBe (0)
   expect ((field [0] = true,            field [0])) .toBe (1)
   expect ((field [0] = 123.456,         field [0])) .toBe (123.456)
   expect ((field [0] = 123_456_789_012, field [0])) .toBe (123_456_789_012)
   expect ((field [0] = 0xffffffff,      field [0])) .toBe (4294967295)
   expect ((field [0] = 666,             field [0])) .toBe (666)
   expect ((field [0] = -666,            field [0])) .toBe (-666)
})

test ("setValue", () =>
{
   const field = new MFTime ()

   field .setValue ([1, 2, 3, 4]);

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFTime (1, 2, 3, 4))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFTime ())) .toBe (true);

   field .setValue (new MFTime (1, 2, 3, 4));

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFTime (1, 2, 3, 4))) .toBe (true);

   field .setValue (new MFTime (5, 6, 7, 8, 9));

   expect (field) .toHaveLength (5);
   expect (field .equals (new MFTime (5, 6, 7, 8, 9))) .toBe (true);

   field .setValue (new MFTime ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFTime ())) .toBe (true);
})

test ("assign", () =>
{
   const field = new MFTime ()

   field .assign (new MFTime (1, 2, 3, 4));

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFTime (1, 2, 3, 4))) .toBe (true);

   field .assign (new MFTime (5, 6, 7, 8));

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFTime (5, 6, 7, 8))) .toBe (true);

   field .assign (new MFTime ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFTime ())) .toBe (true);
})

test ("shrinkToFit", () =>
{
   const field = new MFTime (5, 6, 7, 8);

   expect (field .shrinkToFit ()) .toHaveLength (4);
   expect (field .shrinkToFit ()) .toBe (field .shrinkToFit ());
});

test ("common", () =>
{
   const field = new MFTime ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFTime)
   expect (field .getTypeName ()) .toBe ("MFTime")
   expect (Object .prototype .toString .call (field)) .toBe ("[object MFTime]")
})

test ("copy", () =>
{
   const
      a = new MFTime (1,2,3),
      b = a .copy ()

   expect (b) .toBeInstanceOf (MFTime)
   expect (b) .toHaveLength (a .length)
   expect (b .equals (a)) .toBe (true)
   expect (b .getValue ()) .not .toBe (a .getValue ())
})

test ("equals", () =>
{
   const
      a = new MFTime (),
      b = new MFTime (1, 2),
      c = new MFTime (1, 2)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
   expect (b .equals (c)) .toBe (true)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFTime (),
      b = new MFTime (true)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("constructor", () =>
{
   const a = new MFTime ()

   expect (a) .toHaveLength (0)
   expect (a [0]) .toBe (-1)
   expect (a) .toHaveLength (1)

   const b = new MFTime (1,2,3,4,5)
   expect (b) .toHaveLength (5)
   expect (b [0]) .toBe (1)
   expect (b [1]) .toBe (2)
   expect (b [2]) .toBe (3)
   expect (b [3]) .toBe (4)
   expect (b [4]) .toBe (5)

   const c = [... b]
   expect (c) .toHaveLength (5)
   expect (c [0]) .toBe (1)
   expect (c [1]) .toBe (2)
   expect (c [2]) .toBe (3)
   expect (c [3]) .toBe (4)
   expect (c [4]) .toBe (5)
})

test ("basic-functions", () =>
{
   const a = new MFTime (Infinity)

   expect (a [0]) .toBe (Infinity)
   a [1] = Infinity
   expect (a [1]) .toBe (Infinity)
   a .push (Infinity)
   expect (a .at (-1)) .toBe (Infinity)
   a .unshift (Infinity)
   expect (a [0]) .toBe (Infinity)
   expect (a) .toHaveLength (4)
   expect (a .splice (1, 1, Infinity)) .toHaveLength (1)
   expect (a) .toHaveLength (4)
   expect (a [1]) .toBe (Infinity)
   expect (a .splice (1, 1, NaN)) .toHaveLength (1)
   expect (a [1]) .toBe (NaN)
   expect (a .splice (1, 0, NaN)) .toHaveLength (0)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (Infinity)
   expect (a [1]) .toBe (NaN)
   expect (a [2]) .toBe (NaN)
   expect (a [3]) .toBe (Infinity)
   expect (a [4]) .toBe (Infinity)

   expect (a .fill (NaN)) .toBe (a)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (NaN)
   expect (a [1]) .toBe (NaN)
   expect (a [2]) .toBe (NaN)
   expect (a [3]) .toBe (NaN)
   expect (a [4]) .toBe (NaN)

   expect (a .includes (123)) .toBe (false)
   expect (a .indexOf (123)) .toBe (-1)
   expect (a .lastIndexOf (123)) .toBe (-1)

   expect (a .fill (Infinity)) .toBe (a)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (Infinity)
   expect (a [1]) .toBe (Infinity)
   expect (a [2]) .toBe (Infinity)
   expect (a [3]) .toBe (Infinity)
   expect (a [4]) .toBe (Infinity)

   expect (a .includes (Infinity)) .toBe (true)
   expect (a .indexOf (Infinity)) .toBe (0)
   expect (a .lastIndexOf (Infinity)) .toBe (a .length - 1)

   a [1] = 1
   a [3] = 1

   expect (a .includes (1)) .toBe (true)
   expect (a .indexOf (1)) .toBe (1)
   expect (a .lastIndexOf (1)) .toBe (3)

   expect (a .splice (0, 5, Infinity, Infinity, Infinity, Infinity, Infinity)) .toHaveLength (5)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (Infinity)
   expect (a [1]) .toBe (Infinity)
   expect (a [2]) .toBe (Infinity)
   expect (a [3]) .toBe (Infinity)
   expect (a [4]) .toBe (Infinity)
})

test ("at", () =>
{
   const
      N = 10,
      a = new MFTime ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a .at (i)) .toBe (a [i])
      expect (a .at (i)) .toBe (v)
      expect (a .at (i - N)) .toBe (a [i])
      expect (a .at (i - N)) .toBe (v)
   }
})

test ("entries", () =>
{
   const
      N = 10,
      a = new MFTime ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   expect ([... a .entries ()]) .toHaveLength (N)

   for (const [i, value] of a .entries ())
      expect (value) .toBe (a [i])
})

test ("fill", () =>
{
   const a = new MFTime (0, 0, 0, 0, 0, 0)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (0)
   expect (a [1]) .toBe (0)
   expect (a [2]) .toBe (0)
   expect (a [3]) .toBe (0)
   expect (a [4]) .toBe (0)
   expect (a [5]) .toBe (0)

   expect (a .fill (1)) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (1)
   expect (a [2]) .toBe (1)
   expect (a [3]) .toBe (1)
   expect (a [4]) .toBe (1)
   expect (a [5]) .toBe (1)

   expect (a .fill (2)) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (2)
   expect (a [1]) .toBe (2)
   expect (a [2]) .toBe (2)
   expect (a [3]) .toBe (2)
   expect (a [4]) .toBe (2)
   expect (a [5]) .toBe (2)
})

test ("filter", () =>
{
   const
      N = 10,
      a = new MFTime ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   const b = a .filter (v => v % 2)

   expect (b) .toBeInstanceOf (MFTime)
   expect (b) .toHaveLength (N / 2)

   for (let i = 0; i < N / 2; ++ i)
      expect (b [i]) .toBe (a [i * 2])
})

test ("keys", () =>
{
   const
      N = 10,
      a = new MFTime ()

   a .length = N
   expect (a .keys ()) .toEqual (new Array (N) .keys ())
   a .length = N/2
   expect (a .keys ()) .toEqual (new Array (N/2) .keys ())
})

test ("map", () =>
{
   const
      N = 10,
      a = new MFTime ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   expect (a) .toHaveLength (N)

   const b = a .map (v => v)

   expect (b) .toBeInstanceOf (MFTime)

   for (let i = 0; i < N; ++ i)
      expect (b [i]) .toBe (a [i])
})

test ("pop", () =>
{
   const
      N = 10,
      a = new MFTime ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a [i]) .toBe (v)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      expect (a .pop ()) .toBe (b .pop ())
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = 0; i < a .length; ++ i)
      {
         const v = ++n
         expect (a [i]) .toBe (v)
      }
   }
})

test ("push", () =>
{
   const
      N = 1_000,
      a = new MFTime ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a .push (v)) .toBe (i + 1)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a [i]) .toBe (v)
   }
})

test ("shift", () =>
{
   const
      N = 10,
      a = new MFTime ()

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a [i]) .toBe (v)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      expect (a .shift ()) .toBe (b .shift ())
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = j + 1; i < a .length; ++ i)
      {
         const v = ++n
         expect (a [i]) .toBe (v)
      }
   }
})

test ("slice", () =>
{
   const
      N = 10,
      a = new MFTime ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   expect (a) .toHaveLength (N)

   const b = a .slice ()

   expect (b) .toHaveLength (N)
   expect (b) .toBeInstanceOf (MFTime)

   for (let i = 0; i < N; ++ i)
      expect (b [i]) .toBe (a [i])

   const c = a .slice (1, N - 1)

   expect (c) .toHaveLength (N - 2)
   expect (c) .toBeInstanceOf (MFTime)

   for (let i = 0, j = 1; i < N - 2; ++ i, ++ j)
      expect (c [i]) .toBe (a [j])
})

test ("splice", () =>
{
   const
      N = 10,
      a = new MFTime ();

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1);

   const
      v0 = a [0],
      v1 = a .at (-1);

   expect (a) .toHaveLength (N);

   const b = a .splice (1,N-2);

   expect (a) .toHaveLength (2);
   expect (b) .toHaveLength (N-2);
   expect (b) .toBeInstanceOf (MFTime);
   expect (a [0]) .toBe (v0);
   expect (a [1]) .toBe (v1);

   for (let i = 0, n = 1; i < N-2; ++ i)
      expect (b [i]) .toBe (++n);

   const c = a .splice (1,0,...b);

   expect (a) .toHaveLength (N);
   expect (c) .toHaveLength (0);
   expect (c) .toBeInstanceOf (MFTime);

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a [i]) .toBe (++n);

   const d = a .splice (1,N-2,...b);

   expect (a) .toHaveLength (N);
   expect (d) .toHaveLength (N-2);
   expect (d) .toBeInstanceOf (MFTime);

   for (let i = 0, n = 1; i < N-2; ++ i)
   {
      const v = ++n;
      expect (d [i]) .toBe (v);
      expect (b [i]) .toBe (v);
   }

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a [i]) .toBe (++n);

   const e = new MFTime (1, 2, 3, 4);

   expect (e .splice (2) .equals (new MFTime (3, 4))) .toBe (true);
   expect (e .equals (new MFTime (1, 2))) .toBe (true);

   expect (e .splice () .equals (new MFTime ())) .toBe (true);
   expect (e .equals (new MFTime (1, 2))) .toBe (true);

   const n = new MFTime (1, 2, 3, 4);

   expect (n .splice (-2) .equals (new MFTime (3, 4))) .toBe (true);
   expect (n .equals (new MFTime (1, 2))) .toBe (true);
});

test ("sort-reverse", () =>
{
   const a = new MFTime (1, 2, 3, 4, 5, 6)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (2)
   expect (a [2]) .toBe (3)
   expect (a [3]) .toBe (4)
   expect (a [4]) .toBe (5)
   expect (a [5]) .toBe (6)

   expect (a .reverse ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (6)
   expect (a [1]) .toBe (5)
   expect (a [2]) .toBe (4)
   expect (a [3]) .toBe (3)
   expect (a [4]) .toBe (2)
   expect (a [5]) .toBe (1)

   expect (a .sort ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (2)
   expect (a [2]) .toBe (3)
   expect (a [3]) .toBe (4)
   expect (a [4]) .toBe (5)
   expect (a [5]) .toBe (6)

   const Algorithm = X3D .Algorithm

   expect (a .sort ((a, b) => Algorithm .cmp (b, a))) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (6)
   expect (a [1]) .toBe (5)
   expect (a [2]) .toBe (4)
   expect (a [3]) .toBe (3)
   expect (a [4]) .toBe (2)
   expect (a [5]) .toBe (1)
})

test ("unshift", () =>
{
   const
      N = 1_000,
      a = new MFTime ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a .unshift (v)) .toBe (i + 1)
      expect (a [0]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a .at (-(i + 1))) .toBe (v)
   }
})

test ("concat", () =>
{
   const
      a = new MFTime (111, 222),
      b = a .concat (),
      c = a .concat (new MFTime (333, 444)),
      d = a .concat (new MFTime (333, 444), new MFTime (555, 666));

   expect (a) .toHaveLength (2);
   expect (a [0]) .toBe (111);
   expect (a [1]) .toBe (222);

   expect (b) .toHaveLength (2);
   expect (b [0]) .toBe (111);
   expect (b [1]) .toBe (222);

   expect (c) .toHaveLength (4);
   expect (c [0]) .toBe (111);
   expect (c [1]) .toBe (222);
   expect (c [2]) .toBe (333);
   expect (c [3]) .toBe (444);

   expect (d) .toHaveLength (6);
   expect (d [0]) .toBe (111);
   expect (d [1]) .toBe (222);
   expect (d [2]) .toBe (333);
   expect (d [3]) .toBe (444);
   expect (d [4]) .toBe (555);
   expect (d [5]) .toBe (666);
});

test ("flat", () =>
{
   const
      a = new MFTime (),
      b = new MFTime (1.1, 2.2, 3.3, 4.4);

   expect (a .flat ()) .toBeInstanceOf (Array);
   expect (a .flat ()) .toEqual ([ ]);
   expect (b .flat ()) .toBeInstanceOf (Array);
   expect (b .flat ()) .toEqual ([1.1, 2.2, 3.3, 4.4]);
});

test ("length", () =>
{
   expect (new MFTime () .length) .toBe (0);
   expect (new MFTime (1, 2, 3) .length) .toBe (3);

   const m = new MFTime ();

   m .length = 10;

   expect (m) .toHaveLength (10);

   for (let i = 0; i < 10; ++ i)
      expect (m [i]) .toBe (-1);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 20; ++ i)
      expect (m [i]) .toBe (-1);

   // Test shrinking the array and then growing it again.

   for (let i = 0; i < 20; ++ i)
      m [i] = 2;

   m .length = 10;

   expect (m) .toHaveLength (10);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 10; ++ i)
      expect (m [i]) .toBe (2);

   for (let i = 10; i < 20; ++ i)
      expect (m [i]) .toBe (-1);
});

test ("fromString", () =>
{
   const a = new MFTime ();

   a .fromString ("[1.2 2.3 3.4 4.5 5.6 6.7 7.8 9]");

   expect (a) .toHaveLength (8);
   expect (a .equals (new MFTime (1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 9))) .toBe (true);

   a .fromString ("123.456");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFTime (123.456))) .toBe (true);

   a .fromString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFTime ())) .toBe (true);

   expect (() => a .fromString ("[1.2 2.3 3.4 4.5 foo 6.7 7.8 9]")) .toThrow (Error);
});

test ("fromVRMLString", () =>
{
   const a = new MFTime ();

   a .fromVRMLString ("[1.2 2.3 3.4 4.5 5.6 6.7 7.8 9]");

   expect (a) .toHaveLength (8);
   expect (a .equals (new MFTime (1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 9))) .toBe (true);

   a .fromVRMLString ("123.456");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFTime (123.456))) .toBe (true);

   a .fromVRMLString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFTime ())) .toBe (true);

   expect (() => a .fromVRMLString ("[1.2 2.3 3.4 4.5 foo 6.7 7.8 9]")) .toThrow (Error);
});

test ("fromXMLString", () =>
{
   const a = new MFTime ();

   a .fromXMLString ("1.2 2.3 3.4 4.5 5.6 6.7 7.8 9");

   expect (a) .toHaveLength (8);
   expect (a .equals (new MFTime (1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 9))) .toBe (true);

   a .fromXMLString ("123.456");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFTime (123.456))) .toBe (true);

   expect (() => a .fromXMLString ("")) .toThrow (Error);
});

test ("enumerate", () =>
{
   enumerate (["0", "1", "2"], new MFTime (1,2,3));
});

test ("toString", () =>
{
   const a = new MFTime ();
   const b = new MFTime (1);
   const c = new MFTime (1, 2);

   expect (a .toString ({ style: "CLEAN" })) .toBe ("[]");
   expect (b .toString ({ style: "CLEAN" })) .toBe ("1");
   expect (c .toString ({ style: "CLEAN" })) .toBe ("[1 2]");
});
