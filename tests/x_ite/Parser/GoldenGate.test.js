const X3D = require ("../../X3D")

test ("add/removeParser", () =>
{
   const originalParsers = X3D .GoldenGate .Parser .slice ();

   const newParsers = [function () { }, function () { }];

   X3D .GoldenGate .addParser (... newParsers);

   expect (X3D .GoldenGate .Parser) .toHaveLength (originalParsers .length + 2);

   X3D .GoldenGate .removeParser (... newParsers);

   expect (X3D .GoldenGate .Parser) .toHaveLength (originalParsers .length);
   expect (X3D .GoldenGate .Parser) .toEqual (originalParsers);
})
