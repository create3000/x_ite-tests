const
   X3D    = require ("../../X3D"),
   MFBool = X3D .MFBool

test ("constructor", () =>
{
   let field

   expect ((field = new MFBool (), field [0]))                .toBe (false)
   expect ((field = new MFBool (NaN), field [0]))             .toBe (false)
   expect ((field = new MFBool (Infinity), field [0]))        .toBe (true)
   expect ((field = new MFBool (-Infinity), field [0]))       .toBe (true)
   expect ((field = new MFBool (undefined), field [0]))       .toBe (false)
   expect ((field = new MFBool (null), field [0]))            .toBe (false)
   expect ((field = new MFBool ({}), field [0]))              .toBe (true)
   expect ((field = new MFBool (""), field [0]))              .toBe (false)
   expect ((field = new MFBool ("123"), field [0]))           .toBe (true)
   expect ((field = new MFBool ("123.456"), field [0]))       .toBe (true)
   expect ((field = new MFBool (false), field [0]))           .toBe (false)
   expect ((field = new MFBool (true), field [0]))            .toBe (true)
   expect ((field = new MFBool (123.456), field [0]))         .toBe (true)
   expect ((field = new MFBool (123_456_789_012), field [0])) .toBe (true)
   expect ((field = new MFBool (0xffffffff), field [0]))      .toBe (true)
   expect ((field = new MFBool (666), field [0]))             .toBe (true)
   expect ((field = new MFBool (-666), field [0]))            .toBe (true)

   expect ((new MFBool ()) [0]) .toBe (false);
})

test ("get1Value", () =>
{
   const field = new MFBool ();

   expect (field) .toHaveLength (0);

   for (let i = 0; i < 10; ++ i)
   {
      expect (field [i]) .toBe (false);
      expect (field) .toHaveLength (i + 1);
   }
});

test ("set1Value", () =>
{
   const field = new MFBool ()

   expect ((field [0] = NaN,             field [0])) .toBe (false)
   expect ((field [0] = Infinity,        field [0])) .toBe (true)
   expect ((field [0] = -Infinity,       field [0])) .toBe (true)
   expect ((field [0] = undefined,       field [0])) .toBe (false)
   expect ((field [0] = null,            field [0])) .toBe (false)
   expect ((field [0] = {},              field [0])) .toBe (true)
   expect ((field [0] = "",              field [0])) .toBe (false)
   expect ((field [0] = "123",           field [0])) .toBe (true)
   expect ((field [0] = "123.456",       field [0])) .toBe (true)
   expect ((field [0] = false,           field [0])) .toBe (false)
   expect ((field [0] = true,            field [0])) .toBe (true)
   expect ((field [0] = 123.456,         field [0])) .toBe (true)
   expect ((field [0] = 123_456_789_012, field [0])) .toBe (true)
   expect ((field [0] = 0xffffffff,      field [0])) .toBe (true)
   expect ((field [0] = 666,             field [0])) .toBe (true)
   expect ((field [0] = -666,            field [0])) .toBe (true)
})

test ("setValue", () =>
{
   const field = new MFBool ()

   field .setValue ([true, false, true, false]);

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFBool (true, false, true, false))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFBool ())) .toBe (true);

   field .setValue (new MFBool (true, false, true, false));

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFBool (true, false, true, false))) .toBe (true);

   field .setValue (new MFBool (true, false, true, false, true, false, true, false));

   expect (field) .toHaveLength (8);
   expect (field .equals (new MFBool (true, false, true, false, true, false, true, false))) .toBe (true);

   field .setValue (new MFBool ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFBool ())) .toBe (true);
})

test ("assign", () =>
{
   const field = new MFBool ()

   field .assign (new MFBool (true, false, true, false));

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFBool (true, false, true, false))) .toBe (true);

   field .assign (new MFBool ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFBool ())) .toBe (true);
})

test ("shrinkToFit", () =>
{
   const field = new MFBool (true, false, true, false);

   expect (field .shrinkToFit ()) .toHaveLength (4);
   expect (field .shrinkToFit ()) .toBe (field .shrinkToFit ());
});

test ("common", () =>
{
   const field = new MFBool ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFBool)
   expect (field .getTypeName ()) .toBe ("MFBool")
   expect (Object .prototype .toString .call (field)) .toBe ("[object MFBool]")
})

test ("copy", () =>
{
   const
      a = new MFBool (true,false,true),
      b = a .copy ()

   expect (b) .toBeInstanceOf (MFBool)
   expect (b) .toHaveLength (a .length)
   expect (b .equals (a)) .toBe (true)
   expect (b .getValue ()) .not .toBe (a .getValue ())
})

test ("equals", () =>
{
   const
      a = new MFBool (),
      b = new MFBool (true, false),
      c = new MFBool (true, false)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
   expect (b .equals (c)) .toBe (true)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFBool (),
      b = new MFBool (true)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("constructor", () =>
{
   const a = new MFBool ()

   expect (a) .toHaveLength (0)
   expect (a [0]) .toBe (false)
   expect (a) .toHaveLength (1)

   const b = new MFBool (true,false,true,false,true)
   expect (b) .toHaveLength (5)
   expect (b [0]) .toBe (true)
   expect (b [1]) .toBe (false)
   expect (b [2]) .toBe (true)
   expect (b [3]) .toBe (false)
   expect (b [4]) .toBe (true)

   const c = [... b]
   expect (c) .toHaveLength (5)
   expect (c [0]) .toBe (true)
   expect (c [1]) .toBe (false)
   expect (c [2]) .toBe (true)
   expect (c [3]) .toBe (false)
   expect (c [4]) .toBe (true)
})

test ("special-values", () =>
{
   const a = new MFBool (Infinity)

   expect (a [0]) .toBe (true)
   a [1] = Infinity
   expect (a [1]) .toBe (true)
   a .push (Infinity)
   expect (a .at (-1)) .toBe (true)
   a .unshift (Infinity)
   expect (a [0]) .toBe (true)
   expect (a) .toHaveLength (4)
   expect (a .splice (1, 1, Infinity)) .toHaveLength (1)
   expect (a) .toHaveLength (4)
   expect (a [1]) .toBe (true)
   expect (a .splice (1, 1, 0)) .toHaveLength (1)
   expect (a [1]) .toBe (false)
   expect (a .splice (1, 0, NaN)) .toHaveLength (0)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (true)

   expect (a .fill (NaN)) .toBe (a)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (false)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (false)
   expect (a [4]) .toBe (false)

   expect (a .includes (true)) .toBe (false)
   expect (a .indexOf (true)) .toBe (-1)
   expect (a .lastIndexOf (true)) .toBe (-1)

   expect (a .fill (Infinity)) .toBe (a)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (true)
   expect (a [2]) .toBe (true)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (true)

   expect (a .includes (true)) .toBe (true)
   expect (a .indexOf (true)) .toBe (0)
   expect (a .lastIndexOf (true)) .toBe (a .length - 1)

   a [1] = false
   a [3] = false

   expect (a .includes (false)) .toBe (true)
   expect (a .indexOf (false)) .toBe (1)
   expect (a .lastIndexOf (false)) .toBe (3)

   expect (a .splice (0, 5, Infinity, Infinity, Infinity, Infinity, Infinity)) .toHaveLength (5)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (true)
   expect (a [2]) .toBe (true)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (true)
})

test ("at", () =>
{
   const
      N = 10,
      a = new MFBool ()

   for (let i = 0, n = false; i < N; ++ i)
      expect (a .push (n=!n)) .toBe (i + 1)

   for (let i = 0, n = false; i < N; ++ i)
   {
      const v = n=!n
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
      a = new MFBool ()

   for (let i = 0, n = false; i < N; ++ i)
      expect (a .push (n=!n)) .toBe (i + 1)

   expect ([... a .entries ()]) .toHaveLength (N)

   for (const [i, value] of a .entries ())
      expect (value) .toBe (a [i])
})

test ("fill", () =>
{
   const a = new MFBool (false, false, false, false, false, false)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (false)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (false)
   expect (a [4]) .toBe (false)
   expect (a [5]) .toBe (false)

   expect (a .fill (true)) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (true)
   expect (a [2]) .toBe (true)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (true)
   expect (a [5]) .toBe (true)

   expect (a .fill (false)) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (false)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (false)
   expect (a [4]) .toBe (false)
   expect (a [5]) .toBe (false)
})

test ("filter", () =>
{
   const
      N = 10,
      a = new MFBool ()

   for (let i = 0, n = false; i < N; ++ i)
      expect (a .push (n=!n)) .toBe (i + 1)

   const b = a .filter (v => v % 2)

   expect (b) .toBeInstanceOf (MFBool)
   expect (b) .toHaveLength (N / 2)

   for (let i = 0; i < N / 2; ++ i)
      expect (b [i]) .toBe (a [i * 2])
})

test ("keys", () =>
{
   const
      N = 10,
      a = new MFBool ()

   a .length = N
   expect (a .keys ()) .toEqual (new Array (N) .keys ())
   a .length = N/2
   expect (a .keys ()) .toEqual (new Array (N/2) .keys ())
})

test ("map", () =>
{
   const
      N = 10,
      a = new MFBool ()

   for (let i = 0, n = false; i < N; ++ i)
      a .push ((n=!n))

   expect (a) .toHaveLength (N)

   const b = a .map (v => v)

   expect (b) .toBeInstanceOf (MFBool)

   for (let i = 0; i < N; ++ i)
      expect (b [i]) .toBe (a [i])
})

test ("pop", () =>
{
   const
      N = 10,
      a = new MFBool ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = false; i < N; ++ i)
   {
      const v = (n=!n)
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = false; i < N; ++ i)
   {
      const v = (n=!n)
      expect (a [i]) .toBe (v)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      expect (a .pop ()) .toBe (b .pop ())
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = false; i < a .length; ++ i)
      {
         const v = (n=!n)
         expect (a [i]) .toBe (v)
      }
   }
})

test ("push", () =>
{
   const
      N = 1_000,
      a = new MFBool ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = false; i < N; ++ i)
   {
      const v = (n=!n)
      expect (a .push (v)) .toBe (i + 1)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = false; i < N; ++ i)
   {
      const v = (n=!n)
      expect (a [i]) .toBe (v)
   }
})

test ("shift", () =>
{
   const
      N = 10,
      a = new MFBool ()

   for (let i = 0, n = false; i < N; ++ i)
   {
      const v = (n=!n)
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = false; i < N; ++ i)
   {
      const v = (n=!n)
      expect (a [i]) .toBe (v)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      expect (a .shift ()) .toBe (b .shift ())
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = !(j%2); i < a .length; ++ i)
      {
         const v = (n=!n)
         expect (a [i]) .toBe (v)
      }
   }
})

test ("slice", () =>
{
   const
      N = 10,
      a = new MFBool ()

   for (let i = 0, n = false; i < N; ++ i)
      a .push ((n=!n))

   expect (a) .toHaveLength (N)

   const b = a .slice ()

   expect (b) .toHaveLength (N)
   expect (b) .toBeInstanceOf (MFBool)

   for (let i = 0; i < N; ++ i)
      expect (b [i]) .toBe (a [i])

   const c = a .slice (1, N - 1)

   expect (c) .toHaveLength (N - 2)
   expect (c) .toBeInstanceOf (MFBool)

   for (let i = 0, j = 1; i < N - 2; ++ i, ++ j)
      expect (c [i]) .toBe (a [j])
})

test ("splice", () =>
{
   const
      N = 10,
      a = new MFBool ()

   for (let i = 0, n = false; i < N; ++ i)
      expect (a .push (n=!n)) .toBe (i + 1)

   const
      v0 = a [0],
      v1 = a .at (-1)

   expect (a) .toHaveLength (N)

   const b = a .splice (1,N-2)

   expect (a) .toHaveLength (2)
   expect (b) .toHaveLength (N-2)
   expect (b) .toBeInstanceOf (MFBool)
   expect (a [0]) .toBe (v0)
   expect (a [1]) .toBe (v1)

   for (let i = 0, n = true; i < N-2; ++ i)
      expect (b [i]) .toBe (n=!n)

   const c = a .splice (1,0,...b)

   expect (a) .toHaveLength (N)
   expect (c) .toHaveLength (0)
   expect (c) .toBeInstanceOf (MFBool)

   for (let i = 0, n = false; i < N; ++ i)
      expect (a [i]) .toBe (n=!n)

   const d = a .splice (1,N-2,...b)

   expect (a) .toHaveLength (N)
   expect (d) .toHaveLength (N-2)
   expect (d) .toBeInstanceOf (MFBool)

   for (let i = 0, n = true; i < N-2; ++ i)
   {
      const v = n=!n
      expect (d [i]) .toBe (v)
      expect (b [i]) .toBe (v)
   }

   for (let i = 0, n = false; i < N; ++ i)
      expect (a [i]) .toBe (n=!n)

   const e = new MFBool (true, false, true, false)

   expect (e .splice (2) .equals (new MFBool (true, false))) .toBe (true)
   expect (e .equals (new MFBool (true, false))) .toBe (true)

   expect (e .splice () .equals (new MFBool ())) .toBe (true)
   expect (e .equals (new MFBool (true, false))) .toBe (true)
})

test ("sort-reverse", () =>
{
   const a = new MFBool (true, false, true, false, true, false)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (true)
   expect (a [3]) .toBe (false)
   expect (a [4]) .toBe (true)
   expect (a [5]) .toBe (false)

   expect (a .reverse ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (false)
   expect (a [1]) .toBe (true)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (false)
   expect (a [5]) .toBe (true)

   expect (a .sort ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (false)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (true)
   expect (a [5]) .toBe (true)

   const Algorithm = X3D .Algorithm

   expect (a .sort ((a, b) => Algorithm .cmp (b, a))) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (true)
   expect (a [2]) .toBe (true)
   expect (a [3]) .toBe (false)
   expect (a [4]) .toBe (false)
   expect (a [5]) .toBe (false)
})

test ("unshift", () =>
{
   const
      N = 1_000,
      a = new MFBool ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = false; i < N; ++ i)
   {
      const v = n=!n
      expect (a .unshift (v)) .toBe (i + 1)
      expect (a [0]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = false; i < N; ++ i)
   {
      const v = n=!n
      expect (a .at (-(i + 1))) .toBe (v)
   }
})

test ("concat", () =>
{
   const
      a = new MFBool (true, true),
      b = a .concat (),
      c = a .concat (new MFBool (false, false)),
      d = a .concat (new MFBool (false, false), new MFBool (true, true));

   expect (a) .toHaveLength (2);
   expect (a [0]) .toBe (true);
   expect (a [1]) .toBe (true);

   expect (b) .toHaveLength (2);
   expect (b [0]) .toBe (true);
   expect (b [1]) .toBe (true);

   expect (c) .toHaveLength (4);
   expect (c [0]) .toBe (true);
   expect (c [1]) .toBe (true);
   expect (c [2]) .toBe (false);
   expect (c [3]) .toBe (false);

   expect (d) .toHaveLength (6);
   expect (d [0]) .toBe (true);
   expect (d [1]) .toBe (true);
   expect (d [2]) .toBe (false);
   expect (d [3]) .toBe (false);
   expect (d [4]) .toBe (true);
   expect (d [5]) .toBe (true);
});

test ("flat", () =>
{
   const
      a = new MFBool (),
      b = new MFBool (true, true, false, false);

   expect (a .flat ()) .toBeInstanceOf (Array);
   expect (a .flat ()) .toEqual ([ ]);
   expect (b .flat ()) .toBeInstanceOf (Array);
   expect (b .flat ()) .toEqual ([true, true, false, false]);
});

test ("flatMap", () =>
{
   const
      a = new MFBool (),
      b = new MFBool (true, true, false, false);

   expect (a .flatMap (v => !v)) .toBeInstanceOf (Array);
   expect (a .flatMap (v => !v)) .toEqual ([ ]);
   expect (b .flatMap (v => !v)) .toBeInstanceOf (Array);
   expect (b .flatMap (v => !v)) .toEqual ([false, false, true, true]);
});

test ("length", () =>
{
   expect (new MFBool () .length) .toBe (0);
   expect (new MFBool (true, false, true) .length) .toBe (3);

   const m = new MFBool ();

   m .length = 10;

   expect (m) .toHaveLength (10);

   for (let i = 0; i < 10; ++ i)
      expect (m [i]) .toBe (false);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 20; ++ i)
      expect (m [i]) .toBe (false);

   // Test shrinking the array and then growing it again.

   for (let i = 0; i < 20; ++ i)
      m [i] = true;

   m .length = 10;

   expect (m) .toHaveLength (10);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 10; ++ i)
      expect (m [i]) .toBe (true);

   for (let i = 10; i < 20; ++ i)
      expect (m [i]) .toBe (false);
});

test ("fromString", () =>
{
   const a = new MFBool ();

   a .fromString ("[true false true false true true false false]");

   expect (a) .toHaveLength (8);
   expect (a .equals (new MFBool (true, false, true, false, true, true, false, false))) .toBe (true);

   a .fromString ("false");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFBool (false))) .toBe (true);

   a .fromString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFBool ())) .toBe (true);

   a .fromString ("[TRUE FALSE TRUE FALSE TRUE TRUE FALSE FALSE]");

   expect (a) .toHaveLength (8);
   expect (a .equals (new MFBool (true, false, true, false, true, true, false, false))) .toBe (true);

   expect (() => a .fromString ("[TRUE foo]")) .toThrow (Error);
});

test ("fromVRMLString", () =>
{
   const a = new MFBool ();

   a .fromVRMLString ("[true false true false true true false false]");

   expect (a) .toHaveLength (8);
   expect (a .equals (new MFBool (true, false, true, false, true, true, false, false))) .toBe (true);

   a .fromVRMLString ("false");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFBool (false))) .toBe (true);

   a .fromVRMLString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFBool ())) .toBe (true);

   a .fromVRMLString ("[TRUE FALSE TRUE FALSE TRUE TRUE FALSE FALSE]");

   expect (a) .toHaveLength (8);
   expect (a .equals (new MFBool (true, false, true, false, true, true, false, false))) .toBe (true);

   expect (() => a .fromVRMLString ("[TRUE foo]")) .toThrow (Error);
});

test ("fromXMLString", () =>
{
   const a = new MFBool ();

   a .fromXMLString ("true false true false true true false false");

   expect (a) .toHaveLength (8);
   expect (a .equals (new MFBool (true, false, true, false, true, true, false, false))) .toBe (true);

   a .fromXMLString ("false");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFBool (false))) .toBe (true);

   expect (() => a .fromXMLString ("")) .toThrow (Error);

   a .fromXMLString ("TRUE FALSE TRUE FALSE TRUE TRUE FALSE FALSE");

   expect (a) .toHaveLength (8);
   expect (a .equals (new MFBool (true, false, true, false, true, true, false, false))) .toBe (true);
});
