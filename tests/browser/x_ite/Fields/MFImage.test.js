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
