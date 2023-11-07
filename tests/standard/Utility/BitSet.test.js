const X3D = require ("../../X3D");

test ("constructor", () =>
{
   const b1 = new X3D .BitSet ();

   expect (b1 .valueOf ()) .toBe (0);

   const b2 = new X3D .BitSet (0b10101010);

   expect (b2 .valueOf ()) .toBe (0b10101010);
});

test ("clear", () =>
{
   const b = new X3D .BitSet (0xffffffff);

   expect (b .valueOf ()) .toBe (0xffffffff);

   b .clear ();

   expect (b .valueOf ()) .toBe (0);
});

test ("set", () =>
{
   const b = new X3D .BitSet ();

   for (let i = 0; i < 32; ++ i)
      b .set (i, true);

   expect (b .valueOf ()) .toBe (0xffffffff);

   for (let i = 0; i < 32; ++ i)
      b .set (i, false);

   expect (b .valueOf ()) .toBe (0);

   for (let i = 0; i < 32; i += 2)
      b .set (i, true);

   expect (b .valueOf ()) .toBe (0x55555555);

   for (let i = 0; i < 32; i += 2)
      b .set (i, false);

   expect (b .valueOf ()) .toBe (0);
});

test ("add", () =>
{
   const b = new X3D .BitSet ();

   b .add (0, 0x5);

   expect (b .valueOf ()) .toBe (0x5);

   b .add (4, 0x5);

   expect (b .valueOf ()) .toBe (0x55);

   b .add (8, 0x5);

   expect (b .valueOf ()) .toBe (0x555);

   b .add (12, 0x5);

   expect (b .valueOf ()) .toBe (0x5555);

   b .add (16, 0x5);

   expect (b .valueOf ()) .toBe (0x55555);

   b .add (20, 0x5);

   expect (b .valueOf ()) .toBe (0x555555);

   b .add (24, 0x5);

   expect (b .valueOf ()) .toBe (0x5555555);

   b .add (28, 0x5);

   expect (b .valueOf ()) .toBe (0x55555555);
});

test ("remove", () =>
{
   const b = new X3D .BitSet (0x55555555);

   expect (b .valueOf ()) .toBe (0x55555555);

   b .remove (0, 0x5);

   expect (b .valueOf ()) .toBe (0x55555550);

   b .remove (4, 0x5);

   expect (b .valueOf ()) .toBe (0x55555500);

   b .remove (8, 0x5);

   expect (b .valueOf ()) .toBe (0x55555000);

   b .remove (12, 0x5);

   expect (b .valueOf ()) .toBe (0x55550000);

   b .remove (16, 0x5);

   expect (b .valueOf ()) .toBe (0x55500000);

   b .remove (20, 0x5);

   expect (b .valueOf ()) .toBe (0x55000000);

   b .remove (24, 0x5);

   expect (b .valueOf ()) .toBe (0x50000000);

   b .remove (28, 0x5);

   expect (b .valueOf ()) .toBe (0);
});
