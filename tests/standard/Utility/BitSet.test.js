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

   b .add (0, 0xa);

   expect (b .valueOf ()) .toBe (0x0000000a);

   b .add (4, 0xb);

   expect (b .valueOf ()) .toBe (0x000000ba);

   b .add (8, 0xc);

   expect (b .valueOf ()) .toBe (0x00000cba);

   b .add (12, 0xd);

   expect (b .valueOf ()) .toBe (0x0000dcba);

   b .add (16, 0xe);

   expect (b .valueOf ()) .toBe (0x000edcba);

   b .add (20, 0xf);

   expect (b .valueOf ()) .toBe (0x00fedcba);

   b .add (24, 0x9);

   expect (b .valueOf ()) .toBe (0x09fedcba);

   b .add (28, 0x8);

   expect (b .valueOf ()) .toBe (0x89fedcba);
});

test ("remove", () =>
{
   const b = new X3D .BitSet (0xabcdef98);

   expect (b .valueOf ()) .toBe (0xabcdef98);

   b .remove (0, 0x8);

   expect (b .valueOf ()) .toBe (0xabcdef90);

   b .remove (4, 0x9);

   expect (b .valueOf ()) .toBe (0xabcdef00);

   b .remove (8, 0xf);

   expect (b .valueOf ()) .toBe (0xabcde000);

   b .remove (12, 0xe);

   expect (b .valueOf ()) .toBe (0xabcd0000);

   b .remove (16, 0xd);

   expect (b .valueOf ()) .toBe (0xabc00000);

   b .remove (20, 0xc);

   expect (b .valueOf ()) .toBe (0xab000000);

   b .remove (24, 0xb);

   expect (b .valueOf ()) .toBe (0xa0000000);

   b .remove (28, 0xa);

   expect (b .valueOf ()) .toBe (0);
});
