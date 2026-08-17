import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const MFImage = X3D .MFImage;
const MFInt32 = X3D .MFInt32;
const SFImage = X3D .SFImage;

test .concurrent ("constructor static methods", () =>
{
   const a = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (MFImage .from (a) .equals (a)) .toBe (true);
   expect (MFImage .fromArray (a .flat ()) .equals (a)) .toBe (true);
});

test .concurrent ("constructor", () =>
{
   const a = new MFImage ();

   expect (a) .toHaveLength (0);
   expect (a [0]) .toBe (undefined);
   expect (a) .toHaveLength (0);

   const b = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));
   expect (b) .toHaveLength (2);
   expect (b [0] .equals (new SFImage (1,2,3,new MFInt32(0xa,0xb)))) .toBe (true);
   expect (b [1] .equals (new SFImage (2,1,4,new MFInt32(0xc,0xd)))) .toBe (true);

   const c = [... b];
   expect (c) .toHaveLength (2);
   expect (c [0] .equals (new SFImage (1,2,3,new MFInt32(0xa,0xb)))) .toBe (true);
   expect (c [1] .equals (new SFImage (2,1,4,new MFInt32(0xc,0xd)))) .toBe (true);
   for (let i = 0; i < 2; ++ i)
      expect (c [i]) .toBe (b [i]);

   const d = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)));
   expect (d) .toHaveLength (1);
   expect (d [0] .equals (new SFImage (1,2,3,new MFInt32(0xa,0xb)))) .toBe (true);
   d [0] .width  = 2;
   d [0] .height = 2;
   d [0] .comp   = 3;
   d [0] .array  = new MFInt32 (1,2,3,4);
   d .length = 2;
   d [1] .width  = 3;
   d [1] .height = 3;
   d [1] .comp   = 3;
   d [1] .array  = new MFInt32 (1,2,3,4,5,6,7,8,9);
   expect (d) .toHaveLength (2);
   expect (d [0] .equals (new SFImage (2,2,3,new MFInt32(1,2,3,4)))) .toBe (true);
   expect (d [1] .equals (new SFImage (3,3,3,new MFInt32(1,2,3,4,5,6,7,8,9)))) .toBe (true);

   expect ((new MFImage ()) [0]) .toBe (undefined);
});

test .concurrent ("get1Value", () =>
{
   const field = new MFImage ();

   expect (field) .toHaveLength (0);

   for (let i = -10; i < 10; ++ i)
   {
      expect (field [i]) .toBe (undefined);
      expect (field) .toHaveLength (0);
   }

   expect (field [field .length]) .toBe (undefined);
   expect (field [-1]) .toBe (undefined);
   expect (field) .toHaveLength (0);

   field .push (new SFImage ());
   field .push (new SFImage ());

   expect (field) .toHaveLength (2);
   expect (field [0]) .toBeInstanceOf (SFImage);
   expect (field [1]) .toBeInstanceOf (SFImage);

   expect (field [field .length]) .toBe (undefined);
   expect (field [-1]) .toBe (undefined);
   expect (field) .toHaveLength (2);

   field [2] = new SFImage ();
   expect (field) .toHaveLength (3);
   expect (field [2]) .toBeInstanceOf (SFImage);
});

test .concurrent ("set1Value", () =>
{
   const field = new MFImage ();

   field [0] = new SFImage (1,2,3,new MFInt32(0xa,0xb));
   field [2] = new SFImage (2,1,4,new MFInt32(0xc,0xd));
   expect (field) .toHaveLength (3);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage(), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);
});

test .concurrent ("setValue", () =>
{
   const field = new MFImage ();

   field .setValue ([1,2,3,0xa,0xb,2,1,4,0xc,0xd]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);
   expect (field [0] .equals (new SFImage (1,2,3,new MFInt32(0xa,0xb)))) .toBe (true);
   expect (field [1] .equals (new SFImage (2,1,4,new MFInt32(0xc,0xd)))) .toBe (true);

   field .setValue ([2,1,4,0xc,0xd,1,2,3,0xa,0xb]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (2,1,4,new MFInt32(0xc,0xd)), new SFImage (1,2,3,new MFInt32(0xa,0xb))))) .toBe (true);
   expect (field [0] .equals (new SFImage (2,1,4,new MFInt32(0xc,0xd)))) .toBe (true);
   expect (field [1] .equals (new SFImage (1,2,3,new MFInt32(0xa,0xb)))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFImage ())) .toBe (true);

   field .setValue ([1,2,3,0xa,0xb,2,1,4,0xc,0xd]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);

   field .setValue ([2,1,4,0xc,0xd,1,2,3,0xa,0xb]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (2,1,4,new MFInt32(0xc,0xd)), new SFImage (1,2,3,new MFInt32(0xa,0xb))))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFImage ())) .toBe (true);

   field .setValue ([new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);
});

test .concurrent ("assign", () =>
{
   const field = new MFImage ();

   field .assign (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))));

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);

   field .assign (new MFImage (new SFImage (1,2,3,new MFInt32(1,2)), new SFImage (2,1,4,new MFInt32(2,3))));

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(1,2)), new SFImage (2,1,4,new MFInt32(2,3))))) .toBe (true);

   field .assign (new MFImage ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFImage ())) .toBe (true);
});

test .concurrent ("shrinkToFit", () =>
{
   const field = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (field .shrinkToFit ()) .toHaveLength (2);
   expect (field) .toHaveLength (2);
   expect (field .shrinkToFit ()) .toBe (field .shrinkToFit ());

   field .length = 1;
   expect (field .shrinkToFit ()) .toHaveLength (1);
   expect (field) .toHaveLength (1);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb))))) .toBe (true);

   field .length = 2;
   expect (field .shrinkToFit ()) .toHaveLength (2);
   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)),new SFImage()))) .toBe (true);
});

test .concurrent ("common", () =>
{
   const field = new MFImage ();

   expect (field .getType ()) .toBe (X3D .X3DConstants ["MFImage"]);
   expect (field .getTypeName ()) .toBe ("MFImage");
   expect (Object .prototype .toString .call (field)) .toBe (`[object ${"MFImage"}]`);
});

test .concurrent ("copy", () =>
{
   const
      a = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))),
      b = a .copy ();

   expect (b) .toBeInstanceOf (MFImage);
   expect (b) .toHaveLength (a .length);
   expect (b .equals (a)) .toBe (true);
   expect (b .getValue ()) .not .toBe (a .getValue ());
});

test .concurrent ("equals", () =>
{
   const
      a = new MFImage (),
      b = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))),
      c = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (a .equals (a)) .toBe (true);
   expect (b .equals (b)) .toBe (true);
   expect (a .equals (b)) .toBe (false);
   expect (b .equals (c)) .toBe (true);
});

test .concurrent ("isDefaultValue", () =>
{
   const
      a = new MFImage (),
      b = new MFImage (new SFImage ());

   expect (a .isDefaultValue ()) .toBe (true);
   expect (b .isDefaultValue ()) .toBe (false);
});

test .concurrent ("flat", () =>
{
   const
      a = new MFImage (),
      b = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (a .flat ()) .toBeInstanceOf (Array);
   expect (a .flat ()) .toEqual ([ ]);
   expect (b .flat ()) .toBeInstanceOf (Array);
   expect (b .flat ()) .toEqual ([1,2,3,0xa,0xb,2,1,4,0xc,0xd]);
});

test .concurrent ("flatMap", () =>
{
   const
      a = new MFImage (),
      b = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (a .flatMap (v => [... v])) .toBeInstanceOf (Array);
   expect (a .flatMap (v => [... v])) .toEqual ([ ]);
   expect (b .flatMap (v => [... v])) .toBeInstanceOf (Array);
   expect (b .flatMap (v => [... v])) .toEqual ([1,2,3,0xa,0xb,2,1,4,0xc,0xd]);
});
