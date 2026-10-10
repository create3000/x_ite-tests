import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

test .concurrent ("add/removeParser", () =>
{
   const originalParsers = X3D .GoldenGate .getParsers ();

   const newParsers = [function (scene) { }, function (scene) { }];

   X3D .GoldenGate .addParsers (... newParsers);

   expect (X3D .GoldenGate .getParsers ()) .not .toBe (X3D .GoldenGate .getParsers ());
   expect (X3D .GoldenGate .getParsers ()) .toEqual (X3D .GoldenGate .getParsers ());
   expect (X3D .GoldenGate .getParsers ()) .toHaveLength (originalParsers .length + 2);

   X3D .GoldenGate .removeParsers (... newParsers);

   expect (X3D .GoldenGate .getParsers ()) .toHaveLength (originalParsers .length);
   expect (X3D .GoldenGate .getParsers ()) .toEqual (originalParsers);
});

test ("only XML input is passed to DOMParser", async () =>
{
   const
      canvas          = X3D .createBrowser (),
      Browser         = canvas .browser,
      parseFromString = DOMParser .prototype .parseFromString,
      inputs          = [ ];

   DOMParser .prototype .parseFromString = function (string, type)
   {
      inputs .push (string);

      return parseFromString .call (this, string, type);
   };

   try
   {
      const
         vrml97  = `#VRML V2.0 utf8\nShape { geometry Box { } }`,
         classic = `#X3D V4.0 utf8\nPROFILE Interchange\nShape { geometry Box { } }`,
         json    = `{ "X3D": { "@profile": "Interchange", "@version": "4.0", "Scene": { "-children": [ { "Shape": { "-geometry": { "Box": { } } } } ] } } }`,
         xml     = `\n  <X3D profile="Interchange" version="4.0"><Scene><Shape><Box/></Shape></Scene></X3D>`,
         inline  = `#VRML V2.0 utf8\nInline { url "data:model/vrml,${encodeURIComponent (vrml97)}" }`;

      expect ((await Browser .createX3DFromString (vrml97))  .encoding) .toBe ("VRML");
      expect ((await Browser .createX3DFromString (classic)) .encoding) .toBe ("VRML");
      expect ((await Browser .createX3DFromString (json))    .encoding) .toBe ("JSON");
      expect ((await Browser .createX3DFromString (xml))     .encoding) .toBe ("XML");

      const node = (await Browser .createX3DFromString (inline)) .rootNodes [0] .getValue ();

      for (let i = 0; i < 100 && node .checkLoadState () !== X3D .X3DConstants .COMPLETE_STATE; ++ i)
         await sleep (20);

      expect (node .checkLoadState ()) .toBe (X3D .X3DConstants .COMPLETE_STATE);

      await expect (Browser .createX3DFromString (`#VRML V2.0 utf8\nShape {`)) .rejects .toThrow ();
      await expect (Browser .createX3DFromString (`not a scene`)) .rejects .toThrow ();
   }
   finally
   {
      DOMParser .prototype .parseFromString = parseFromString;
   }

   for (const input of inputs)
      expect (input) .toMatch (/^\s*</);

   expect (inputs) .toContain (`\n  <X3D profile="Interchange" version="4.0"><Scene><Shape><Box/></Shape></Scene></X3D>`);
});
