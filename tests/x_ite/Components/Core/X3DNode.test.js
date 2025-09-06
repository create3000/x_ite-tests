const X3D     = require ("../../../X3D.js");
const canvas  = X3D .createBrowser ();
const browser = canvas .browser;
const scene   = browser .currentScene;

const path = require ("path");

test ("documentation", () =>
{
   expect (sh `perl "${path .resolve (__dirname, "documentation.pl")}"`) .toBe ("Test done.\n");
})

test ("X3DUOM", () =>
{
   expect (sh `node "${path .resolve (__dirname, "x3duom.js")}"`)
      .toBe (sh `cat "${path .resolve (__dirname, "x3duom.txt")}"`);
})

function sh (strings, ... values)
{
   const { execSync } = require ("child_process");

   return execSync (String .raw ({ raw: strings }, ... values), { encoding: "utf8", maxBuffer: Infinity });
}

test ("nodes", async () =>
{
   await browser .loadComponents (browser .getProfile ("Full"));

   for (const ConcreteNode of browser .concreteNodes)
      expect (new ConcreteNode (scene)) .toBeInstanceOf (ConcreteNode);

   for (const ConcreteNode of browser .concreteNodes)
      expect (scene .createNode (ConcreteNode .typeName) .getNodeTypeName ()) .toBe (ConcreteNode .typeName);

   scene .dispose ();
   browser .dispose ();
});
