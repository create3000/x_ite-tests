const
   X3D  = require ("../../X3D"),
   Lock = X3D .Lock;

const sleep = ms => new Promise (resolve => setTimeout (resolve, ms));

test ("constructor", async () =>
{
   const r = [ ];

   function a (ms, v)
   {
      return Lock .acquire ("Lock.test 1", async () =>
      {
         r .push (v);

         await sleep (ms);

         r .push (v);

         if (v === 222)
            throw new Error ();

         return v;
      });
   }

   const f = [ ];

   await Promise .all ([
      a (200, 111) .then (v => expect (v) .toBe (111)) .finally (() => f .push (111)),
      a (100, 222) .catch (e => expect (e) .toBeInstanceOf (Error)) .finally (() => f .push (222)),
      a (200, 333) .then (v => expect (v) .toBe (333)) .finally (() => f .push (333)),
      a (100, 444) .then (v => expect (v) .toBe (444)) .finally (() => f .push (444)),
   ]);

   expect (r) .toEqual ([111, 111, 222, 222, 333, 333, 444, 444]);
   expect (f) .toEqual ([111, 222, 333, 444]);
});
