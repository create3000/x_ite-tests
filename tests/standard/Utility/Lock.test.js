const
   X3D  = require ("../../X3D"),
   Lock = X3D .Lock;

const sleep = ms => new Promise (resolve => setTimeout (resolve, ms));

test ("constructor", async () =>
{
   const r = [ ];

   function f (ms, v)
   {
      return Lock .acquire ("Lock.test 1", async () =>
      {
         r .push (v);

         await sleep (ms);

         r .push (v);

         return v;
      });
   }

   await Promise .all ([
      f (200, 111) .then (v => expect (v) .toBe (111)),
      f (100, 222) .then (v => expect (v) .toBe (222)),
      f (200, 333) .then (v => expect (v) .toBe (333)),
      f (100, 444) .then (v => expect (v) .toBe (444)),
   ]);

   expect (r) .toEqual ([111, 111, 222, 222, 333, 333, 444, 444]);
});
