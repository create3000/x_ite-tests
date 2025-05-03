const
   X3D     = require ("../../../X3D"),
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   Vector2 = X3D .Vector2;

test ("area", async () =>
{
   await Browser .loadComponents (Browser .getComponent ("NURBS"));
   const Triangle2 = X3D .Triangle2;

   const a = new Vector2 ();
   const b = new Vector2 (1, 0);
   const c = new Vector2 (0, 1);

   expect (Triangle2 .area (a, b, c)) .toBeCloseTo (0.5);
});

test ("isPointInTriangle", async () =>
{
   await Browser .loadComponents (Browser .getComponent ("NURBS"));
   const Triangle2 = X3D .Triangle2;

   const a = new Vector2 ();
   const b = new Vector2 (1, 0);
   const c = new Vector2 (0, 1);

   const p1 = new Vector2 (0.25, 0.25);
   const p2 = new Vector2 (1, 1);
   const p3 = new Vector2 (-1, 1);
   const p4 = new Vector2 (-1, -1);
   const p5 = new Vector2 (1, -1);

   expect (Triangle2 .isPointInTriangle (p1, a, b, c)) .toBe (true);
   expect (Triangle2 .isPointInTriangle (p2, a, b, c)) .toBe (false);
   expect (Triangle2 .isPointInTriangle (p3, a, b, c)) .toBe (false);
   expect (Triangle2 .isPointInTriangle (p4, a, b, c)) .toBe (false);
   expect (Triangle2 .isPointInTriangle (p5, a, b, c)) .toBe (false);
});

test ("toBarycentric", async () =>
{
   await Browser .loadComponents (Browser .getComponent ("NURBS"));
   const Triangle2 = X3D .Triangle2;

   const a = new Vector2 ();
   const b = new Vector2 (1, 0);
   const c = new Vector2 (0, 1);

   const p1 = new Vector2 (0, 0);
   const p2 = new Vector2 (1, 0);
   const p3 = new Vector2 (0, 1);
   const p4 = new Vector2 (0.25, 0.25);

   expect (Triangle2 .toBarycentric (p1, a, b, c)) .toEqual ({ u: 1, v: 0, t: 0 });
   expect (Triangle2 .toBarycentric (p2, a, b, c)) .toEqual ({ u: 0, v: 1, t: 0 });
   expect (Triangle2 .toBarycentric (p3, a, b, c)) .toEqual ({ u: 0, v: 0, t: 1 });
   expect (Triangle2 .toBarycentric (p4, a, b, c)) .toEqual ({ u: 0.5, v: 0.25, t: 0.25 });
});
