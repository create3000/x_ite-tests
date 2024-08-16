const
   X3D  = require ("../../X3D"),
   Lock = X3D .Lock;

const sleep = ms => new Promise (resolve => setTimeout (resolve, ms));

test ("acquire", async () =>
{
   const r = [ ];

   function a (ms, v, t)
   {
      return Lock .acquire ("acquire", async () =>
      {
         r .push (v);

         await sleep (ms);

         r .push (v);

         if (t)
            throw new Error ();

         return v;
      });
   }

   const t = [ ];
   const c = [ ];
   const f = [ ];

   await Promise .all ([
      a (200, 111) .then (v => t .push (v)) .finally (() => f .push (111)),
      a (100, 222, true) .catch (e => c .push (e)) .finally (() => f .push (222)),
      a (200, 333) .then (v => t .push (v)) .finally (() => f .push (333)),
      a (100, 444) .then (v => t .push (v)) .finally (() => f .push (444)),
      a (200, 555, true) .catch (e => c .push (e)).finally (() => f .push (555)),
      a (100, 666) .then (v => t .push (v)) .finally (() => f .push (666)),
   ]);

   expect (r) .toEqual ([111, 111, 222, 222, 333, 333, 444, 444, 555, 555, 666, 666]);
   expect (t) .toEqual ([111, 333, 444, 666]);
   expect (c [0]) .toBeInstanceOf (Error);
   expect (c [1]) .toBeInstanceOf (Error);
   expect (f) .toEqual ([111, 222, 333, 444, 555, 666]);
});
