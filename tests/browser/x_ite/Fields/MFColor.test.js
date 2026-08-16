import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   SFColor = X3D .SFColor,
   MFColor = X3D .MFColor;

test .concurrent ("constructor static methods", () =>
{
   const a = new MFColor (new SFColor (.1,.2,.3), new SFColor (.5,.6,.7));

   expect (MFColor .from (a) .equals (a)) .toBe (true);
});

test .concurrent ("constructor", () =>
{
   expect ((new MFColor ()) [0]) .toBe (undefined);
});

test .concurrent ("get1Value", () =>
{
   const field = new MFColor ();

   expect (field) .toHaveLength (0);

   for (let i = -10; i < 10; ++ i)
   {
      expect (field [i]) .toBe (undefined);
      expect (field) .toHaveLength (0);
   }

   expect (field [field .length]) .toBe (undefined);
   expect (field [-1]) .toBe (undefined);
   expect (field) .toHaveLength (0);

   field .push (new SFColor ());
   field .push (new SFColor ());

   expect (field) .toHaveLength (2);
   expect (field [0]) .toBeInstanceOf (SFColor);
   expect (field [1]) .toBeInstanceOf (SFColor);

   expect (field [field .length]) .toBe (undefined);
   expect (field [-1]) .toBe (undefined);
   expect (field) .toHaveLength (2);

   field [2] = new SFColor ();
   expect (field) .toHaveLength (3);
   expect (field [2]) .toBeInstanceOf (SFColor);
});

test .concurrent ("set1Value", () =>
{
   const field = new MFColor ();

   field [0] = new SFColor (.1,.2,.3);
   field [2] = new SFColor (.5,.6,.7);
   expect (field) .toHaveLength (3);
   expect (field .equals (new MFColor (new SFColor (.1,.2,.3), new SFColor (), new SFColor (.5,.6,.7)))) .toBe (true);
});

test .concurrent ("length", () =>
{
   expect (new MFColor () .length) .toBe (0);
   expect (new MFColor (new SFColor (1,2,3), new SFColor (1,2,3)) .length) .toBe (2);

   const m = new MFColor ();

   m .length = 10;

   expect (m) .toHaveLength (10);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFColor ())) .toBe (true);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 20; ++ i)
      expect (m [i] .equals (new SFColor ())) .toBe (true);

   // Test shrinking the array and then growing it again.

   for (let i = 0; i < 20; ++ i)
      m [i] = new SFColor (2,2,2);

   m .length = 10;

   expect (m) .toHaveLength (10);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFColor (2,2,2))) .toBe (true);

   for (let i = 10; i < 20; ++ i)
      expect (m [i] .equals (new SFColor ())) .toBe (true);
});

test .concurrent ("setValue", () =>
{
   const field = new MFColor ();

   field .setValue ([.1, .2, .3, .4, .5, .6]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFColor (new SFColor (.1, .2, .3), new SFColor (.4, .5, .6)))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFColor ())) .toBe (true);

   field .setValue (new MFColor (new SFColor (.1, .2, .3)));

   expect (field) .toHaveLength (1);
   expect (field .equals (new MFColor (new SFColor (.1, .2, .3)))) .toBe (true);

   field .setValue (new MFColor (new SFColor (.1, .2, .3), new SFColor (.4, .5, .6)));

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFColor (new SFColor (.1, .2, .3), new SFColor (.4, .5, .6)))) .toBe (true);

   field .setValue (new MFColor ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFColor ())) .toBe (true);
});

test .concurrent ("assign", () =>
{
   const
      field = new MFColor (),
      value = new SFColor (.1, .2, .3);

   field .assign (new MFColor (value, value, value, value));

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFColor (value, value, value, value))) .toBe (true);

   field .assign (new MFColor ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFColor ())) .toBe (true);
});

test .concurrent ("shrinkToFit", () =>
{
   const field = new MFColor (new SFColor (.1, .2, .3), new SFColor (.5, .6, .7));

   expect (field .shrinkToFit ()) .toHaveLength (6);
   expect (field) .toHaveLength (2);
   expect (field .shrinkToFit ()) .toBe (field .shrinkToFit ());

   field .length = 1;
   expect (field .shrinkToFit ()) .toHaveLength (3);
   expect (field) .toHaveLength (1);
   expect (field .equals (new MFColor (new SFColor (.1, .2, .3))));

   field .length = 2;
   expect (field .shrinkToFit ()) .toHaveLength (6);
   expect (field) .toHaveLength (2);
   expect (field .equals (new MFColor (new SFColor (.1, .2, .3), new SFColor ())));
});

test .concurrent ("fromString", () =>
{
   const a = new MFColor ();

   a .fromString ("[.2 .3 .4, .3 .4 .5]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFColor (new SFColor (.2, .3, .4), new SFColor (.3, .4, .5)))) .toBe (true);

   a .fromString (".1 .2 .3");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFColor (new SFColor (.1, .2, .3)))) .toBe (true);

   a .fromString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFColor ())) .toBe (true);

   expect (() => a .fromString ("[1.2 2.3 3.4, 2.3 --- 4.5]")) .toThrow (Error);
});

test .concurrent ("fromVRMLString", () =>
{
   const a = new MFColor ();

   a .fromVRMLString ("[.2 .3 .4, .3 .4 .5]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFColor (new SFColor (.2, .3, .4), new SFColor (.3, .4, .5)))) .toBe (true);

   a .fromVRMLString (".1 .2 .3 .4 .5 .6 .7 .8 .9");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFColor (new SFColor (.1, .2, .3)))) .toBe (true);

   a .fromVRMLString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFColor ())) .toBe (true);

   expect (() => a .fromVRMLString ("[1.2 2.3 3.4, 2.3 --- 4.5]")) .toThrow (Error);
});

test .concurrent ("fromXMLString", () =>
{
   const a = new MFColor ();

   a .fromXMLString ("0.2 0.3 0.4, 0.3 0.4 0.5");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFColor (new SFColor (0.2, 0.3, 0.4), new SFColor (0.3, 0.4, 0.5)))) .toBe (true);

   a .fromXMLString (".1 .2 .3");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFColor (new SFColor (.1, .2, .3)))) .toBe (true);

   expect (() => a .fromXMLString ("")) .toThrow (Error);
});

test .concurrent ("enumerate", () =>
{
   const a = new MFColor (new SFColor (), new SFColor (), new SFColor ());

   expect (a) .toBe (a);

   enumerate (["0", "1", "2"], a);

   expect (Reflect .ownKeys (a) .includes ("length")) .toBe (true);
   expect (a) .toHaveLength (3);
   expect (Object .keys (a)) .toEqual (Array .from (Array (a .length) .keys (), String));
   expect (Array .from (a .keys ())) .toEqual (Array .from (Array (a .length) .keys ()));

   const s = Symbol ();

   a [s]     = "symbol";
   a ["abc"] = "string";

   expect (a [s])     .toBe ("symbol");
   expect (a ["abc"]) .toBe ("string");

   expect (Reflect .ownKeys (a) .includes (s))     .toBe (true);
   expect (Reflect .ownKeys (a) .includes ("abc")) .toBe (true);

   expect ("length" in a) .toBe (true);
   expect (s in a) .toBe (true);
   expect ("abc" in a) .toBe (true);

   expect (Object .keys (a) .includes ("0")) .toBe (true);
   expect (Object .keys (a) .includes ("length")) .toBe (false);
   expect (Object .keys (a) .includes (s)) .toBe (false);
   expect (Object .keys (a) .includes ("abc")) .toBe (true);

   expect (Object .keys (a)) .toEqual (Array .from (Array (a .length) .keys (), String) .concat ("abc"));
});

test .concurrent ("toString", () =>
{
   const a = new MFColor ();
   const b = new MFColor (new SFColor (.1,.2,.3));
   const c = new MFColor (new SFColor (.1,.2,.3), new SFColor (.5,.6,.7));

   expect (a .toString ({ style: "CLEAN" })) .toBe ("[]");
   expect (b .toString ({ style: "CLEAN" })) .toBe ("0.1 0.2 0.3");
   expect (c .toString ({ style: "CLEAN" })) .toBe ("[0.1 0.2 0.3 0.5 0.6 0.7]");
});
