const
   X3D     = require ("../../../X3D"),
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("constructor", async () =>
{
   await Browser .loadComponents (Browser .getComponent ("Geospatial"));
   const Spheroid3 = X3D .Spheroid3;

   const s1 = new Spheroid3 ();

   expect (s1 .semiMajorAxis) .toBe (1);
   expect (s1 .semiMinorAxis) .toBe (1);

   const s2 = new Spheroid3 (123, 456);

   expect (s2 .semiMajorAxis) .toBe (123);
   expect (s2 .semiMinorAxis) .toBe (456);

   const s3 = new Spheroid3 (123456, 300, true);

   expect (s3 .semiMajorAxis) .toBe (123456);
   expect (s3 .semiMinorAxis) .toBeCloseTo (123044.48);
});

test ("copy", async () =>
{
   await Browser .loadComponents (Browser .getComponent ("Geospatial"));
   const Spheroid3 = X3D .Spheroid3;

   const s1 = new Spheroid3 (123, 456);
   const s2 = s1 .copy ();

   expect (s2 .semiMajorAxis) .toBe (123);
   expect (s2 .semiMinorAxis) .toBe (456);
});

test ("assign", async () =>
{
   await Browser .loadComponents (Browser .getComponent ("Geospatial"));
   const Spheroid3 = X3D .Spheroid3;

   const s1 = new Spheroid3 (123, 456);
   const s2 = new Spheroid3 ();

   s2 .assign (s1);

   expect (s2 .semiMajorAxis) .toBe (123);
   expect (s2 .semiMinorAxis) .toBe (456);
});

test ("equals", async () =>
{
   await Browser .loadComponents (Browser .getComponent ("Geospatial"));
   const Spheroid3 = X3D .Spheroid3;

   const s1 = new Spheroid3 (123, 456);
   const s2 = new Spheroid3 ();
   const s3 = new Spheroid3 (123, 456);
   const s4 = new Spheroid3 ();

   expect (s3 .semiMajorAxis) .toBe (s1 .semiMajorAxis);
   expect (s3 .semiMinorAxis) .toBe (s1 .semiMinorAxis);
   expect (s3 .equals (s1)) .toBe (true);

   expect (s4 .semiMajorAxis) .toBe (s2 .semiMajorAxis);
   expect (s4 .semiMinorAxis) .toBe (s2 .semiMinorAxis);
   expect (s4 .equals (s2)) .toBe (true);

   expect (s3 .semiMajorAxis) .not .toBe (s2 .semiMajorAxis);
   expect (s3 .semiMinorAxis) .not .toBe (s2 .semiMinorAxis);
   expect (s3 .equals (s2)) .not .toBe (true);

   expect (s4 .semiMajorAxis) .not .toBe (s3 .semiMajorAxis);
   expect (s4 .semiMinorAxis) .not .toBe (s3 .semiMinorAxis);
   expect (s4 .equals (s3)) .not .toBe (true);
});

test ("set", async () =>
{
   await Browser .loadComponents (Browser .getComponent ("Geospatial"));
   const Spheroid3 = X3D .Spheroid3;

   const s1 = new Spheroid3 (123, 456);

   s1 .set ();

   expect (s1 .semiMajorAxis) .toBe (1);
   expect (s1 .semiMinorAxis) .toBe (1);

   const s2 = new Spheroid3 ();

   s2 .set (123, 456);

   expect (s2 .semiMajorAxis) .toBe (123);
   expect (s2 .semiMinorAxis) .toBe (456);

   const s3 = new Spheroid3 ();

   s3 .set (123456, 300, true);

   expect (s3 .semiMajorAxis) .toBe (123456);
   expect (s3 .semiMinorAxis) .toBeCloseTo (123044.48);

});

test ("toString", async () =>
{
   await Browser .loadComponents (Browser .getComponent ("Geospatial"));
   const Spheroid3 = X3D .Spheroid3;

   const s1 = new Spheroid3 ();

   expect (typeof s1 .toString ()) .toBe ("string");
   expect (s1 .toString () .length > 0) .toBe (true);
});
