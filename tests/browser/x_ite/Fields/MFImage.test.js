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
