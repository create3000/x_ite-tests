import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   Browser      = X3D .createBrowser () .browser,
   MFQuaternion = X3D .MFQuaternion,
   SFQuaternion = X3D .SFQuaternion;

const comp = 4;

test .concurrent ("constructor", () =>
{
   expect ((new MFQuaternion ()) [0]) .toBe (undefined);
});

test .concurrent ("get1Value", () =>
{
   const field = new MFQuaternion ();

   expect (field) .toHaveLength (0);

   for (let i = -10; i < 10; ++ i)
   {
      expect (field [i]) .toBe (undefined);
      expect (field) .toHaveLength (0);
   }

   expect (field [field .length]) .toBe (undefined);
   expect (field [-1]) .toBe (undefined);
   expect (field) .toHaveLength (0);

   field .push (new SFQuaternion ());
   field .push (new SFQuaternion ());

   expect (field) .toHaveLength (2);
   expect (field [0]) .toBeInstanceOf (SFQuaternion);
   expect (field [1]) .toBeInstanceOf (SFQuaternion);

   expect (field [field .length]) .toBe (undefined);
   expect (field [-1]) .toBe (undefined);
   expect (field) .toHaveLength (2);

   field [2] = new SFQuaternion ();
   expect (field) .toHaveLength (3);
   expect (field [2]) .toBeInstanceOf (SFQuaternion);
});

test .concurrent ("length", () =>
{
   expect (new MFQuaternion () .length) .toBe (0);
   expect (new MFQuaternion (new SFQuaternion (1,2,3,4), new SFQuaternion (1,2,3,4)) .length) .toBe (2);

   const m = new MFQuaternion ();

   m .length = 10;

   expect (m) .toHaveLength (10);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFQuaternion ())) .toBe (true);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 20; ++ i)
      expect (m [i] .equals (new SFQuaternion ())) .toBe (true);

   // Test shrinking the array and then growing it again.

   for (let i = 0; i < 20; ++ i)
      m [i] = new SFQuaternion (2,2,2,2);

   m .length = 10;

   expect (m) .toHaveLength (10);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFQuaternion (2,2,2,2))) .toBe (true);

   for (let i = 10; i < 20; ++ i)
      expect (m [i] .equals (new SFQuaternion ())) .toBe (true);
});

test .concurrent ("setValue", () =>
{
   const field = new MFQuaternion ();

   field .setValue ([1, 2, 3, 4, 5, 6, 7, 8]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFQuaternion (new SFQuaternion (1, 2, 3, 4), new SFQuaternion (5, 6, 7, 8)))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFQuaternion ())) .toBe (true);

   field .setValue (new MFQuaternion (new SFQuaternion (1, 2, 3, 4)));

   expect (field) .toHaveLength (1);
   expect (field .equals (new MFQuaternion (new SFQuaternion (1, 2, 3, 4)))) .toBe (true);

   field .setValue (new MFQuaternion (new SFQuaternion (1, 2, 3, 4), new SFQuaternion (5, 6, 7, 8)));

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFQuaternion (new SFQuaternion (1, 2, 3, 4), new SFQuaternion (5, 6, 7, 8)))) .toBe (true);

   field .setValue (new MFQuaternion ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFQuaternion ())) .toBe (true);
});

test .concurrent ("assign", () =>
{
   const
      field = new MFQuaternion (),
      value = new SFQuaternion (1, 2, 3, 4);

   field .assign (new MFQuaternion (value, value, value, value));

   expect (field) .toHaveLength (4);
   expect (field .equals (new MFQuaternion (value, value, value, value))) .toBe (true);

   field .assign (new MFQuaternion ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFQuaternion ())) .toBe (true);
});

test .concurrent ("fromString", () =>
{
   const a = new MFQuaternion ();

   a .fromString ("[1.2 2.3 3.4 4.5, 2.3 3.4 4.5 5.6 ]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFQuaternion (new SFQuaternion (1.2, 2.3, 3.4, 4.5), new SFQuaternion (2.3, 3.4, 4.5, 5.6)))) .toBe (true);

   a .fromString ("1 2 3 4");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFQuaternion (new SFQuaternion (1, 2, 3, 4)))) .toBe (true);

   a .fromString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFQuaternion ())) .toBe (true);

   expect (() => a .fromString ("[1 2 3 4 foo 6 7 9]")) .toThrow (Error);

   const s = Browser .currentScene;

   a .fromString ("[1 2 3 90, 2 3 4 180]", s);

   expect (a) .toHaveLength (2);

   expect (a [0] .x) .toBe (1);
   expect (a [0] .y) .toBe (2);
   expect (a [0] .z) .toBe (3);
   expect (a [0] .w) .toBe (90);

   expect (a [1] .x) .toBe (2);
   expect (a [1] .y) .toBe (3);
   expect (a [1] .z) .toBe (4);
   expect (a [1] .w) .toBe (180);
});

test .concurrent ("fromVRMLString", () =>
{
   const a = new MFQuaternion ();

   a .fromVRMLString ("[1.2 2.3 3.4 4.5, 2.3 3.4 4.5 5.6 ]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFQuaternion (new SFQuaternion (1.2, 2.3, 3.4, 4.5), new SFQuaternion (2.3, 3.4, 4.5, 5.6)))) .toBe (true);

   a .fromVRMLString ("1 2 3 4");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFQuaternion (new SFQuaternion (1, 2, 3, 4)))) .toBe (true);

   a .fromVRMLString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFQuaternion ())) .toBe (true);

   expect (() => a .fromVRMLString ("[1 2 3 4 foo 6 7 9]")) .toThrow (Error);

   const s = Browser .currentScene;

   a .fromVRMLString ("[1 2 3 90, 2 3 4 180]", s);

   expect (a) .toHaveLength (2);

   expect (a [0] .x) .toBe (1);
   expect (a [0] .y) .toBe (2);
   expect (a [0] .z) .toBe (3);
   expect (a [0] .w) .toBe (90);

   expect (a [1] .x) .toBe (2);
   expect (a [1] .y) .toBe (3);
   expect (a [1] .z) .toBe (4);
   expect (a [1] .w) .toBe (180);
});

test .concurrent ("fromXMLString", () =>
{
   const a = new MFQuaternion ();

   a .fromXMLString ("1.2 2.3 3.4 4.5, 2.3 3.4 4.5 5.6 ");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFQuaternion (new SFQuaternion (1.2, 2.3, 3.4, 4.5), new SFQuaternion (2.3, 3.4, 4.5, 5.6)))) .toBe (true);

   a .fromXMLString ("1 2 3 4");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFQuaternion (new SFQuaternion (1, 2, 3, 4)))) .toBe (true);

   expect (() => a .fromXMLString ("")) .toThrow (Error);

   const s = Browser .currentScene;

   a .fromXMLString ("1 2 3 90, 2 3 4 180", s);

   expect (a) .toHaveLength (2);

   expect (a [0] .x) .toBe (1);
   expect (a [0] .y) .toBe (2);
   expect (a [0] .z) .toBe (3);
   expect (a [0] .w) .toBe (90);

   expect (a [1] .x) .toBe (2);
   expect (a [1] .y) .toBe (3);
   expect (a [1] .z) .toBe (4);
   expect (a [1] .w) .toBe (180);
});

test .concurrent ("enumerate", () =>
{
   enumerate (["0", "1", "2"], new MFQuaternion (new SFQuaternion (), new SFQuaternion (), new SFQuaternion ()));
});

test .concurrent ("toString", () =>
{
   const a = new MFQuaternion ();
   const b = new MFQuaternion (new SFQuaternion (1,2,3,4));
   const c = new MFQuaternion (new SFQuaternion (1,2,3,4), new SFQuaternion (5,6,7,8));

   expect (a .toString ({ style: "CLEAN" })) .toBe ("[]");
   expect (b .toString ({ style: "CLEAN" })) .toBe ("1 2 3 4");
   expect (c .toString ({ style: "CLEAN" })) .toBe ("[1 2 3 4 5 6 7 8]");
});
