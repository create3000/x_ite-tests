const X3D = require ("../../X3D")

test ("add/removeParser", () =>
{
   const originalParsers = X3D .GoldenGate .getParsers ();

   // Legacy
   expect (X3D .GoldenGate .Parser) .toBe (X3D .GoldenGate .Parser);
   expect (X3D .GoldenGate .Parser) .toEqual (X3D .GoldenGate .getParsers ());

   const newParsers = [function (scene) { }, function (scene) { }];

   X3D .GoldenGate .addParsers (... newParsers);

   expect (X3D .GoldenGate .getParsers ()) .not .toBe (X3D .GoldenGate .getParsers ());
   expect (X3D .GoldenGate .getParsers ()) .toEqual (X3D .GoldenGate .getParsers ());
   expect (X3D .GoldenGate .getParsers ()) .toHaveLength (originalParsers .length + 2);

   X3D .GoldenGate .removeParsers (... newParsers);

   expect (X3D .GoldenGate .getParsers ()) .toHaveLength (originalParsers .length);
   expect (X3D .GoldenGate .getParsers ()) .toEqual (originalParsers);
})
