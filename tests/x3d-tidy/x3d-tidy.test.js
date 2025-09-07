const path = require ("node:path");
const fs   = require ("node:fs");
const { exec } = require ("node:child_process");
const { sh } = require ("shell-tools")
const X3D = require ("../X3D")

test ("help", () => new Promise ((resolve, reject) =>
{
   exec ("npx --yes x3d-tidy -h", (error, stdout, stderr) =>
   {
      if (error)
      {
         reject (error .message);
         return;
      }

      // if (stderr)
      // {
      //    reject (stderr);
      //    return;
      // }

      expect (stdout) .toMatch (/x3d-tidy \[options\]/);
      resolve ();
   });
}));

test ("error", () => new Promise ((resolve, reject) =>
{
   exec ("npx --yes x3d-tidy -i does/not/exist -o does/not/exist", (error, stdout, stderr) =>
   {
      if (stderr ?? error)
      {
         expect (stderr ?? error) .toMatch (/Couldn't load X3D file./);
         resolve ();
         return;
      }

      reject ("there should be no stdout");
   });
}));

test ("nodes", async () =>
{
   const canvas  = X3D .createBrowser ();
   const browser = canvas .browser;
   const scene   = await browser .createScene (browser .getProfile ("Full"), browser .getComponent ("X_ITE"));
   const file    = path .join (__dirname, "files", "nodes.x3dv");

   for (const ConcreteNode of browser .concreteNodes)
      scene .rootNodes .push (scene .createNode (ConcreteNode .typeName));

   fs .writeFileSync (file, scene .toVRMLString ());

   scene .dispose ();
   browser .dispose ();

   // Test

  const output = sh (`npx --yes x3d-tidy -i ${file} -o .x3dv`);

   expect (output .split ("\n") .length) .toBe (568);
});
