import { expect, test } from "vitest";

const path               = require ("node:path");
const fs                 = require ("node:fs");
const { exec }           = require ("node:child_process");
const { readFile }       = require ("node:fs/promises");
const { sh, systemSync } = require ("shell-tools");

systemSync (`npx --yes x3d-tidy -v`);

test .concurrent ("help", () => new Promise ((resolve, reject) =>
{
   exec ("npx x3d-tidy -h", (error, stdout, stderr) =>
   {
      try
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
      }
      catch (error)
      {
         reject (error);
      }
   });
}),
20_000);

test .concurrent ("error", () => new Promise ((resolve, reject) =>
{
   exec ("npx x3d-tidy -i does/not/exist -o does/not/exist", (error, stdout, stderr) =>
   {
      try
      {
         if (stderr ?? error)
         {
            expect (stderr ?? error) .toMatch (/Couldn't load X3D file./);
            resolve ();
            return;
         }

         reject ("there should be no stdout");
      }
      catch (error)
      {
         reject (error);
      }
   });
}),
10_000);

test .concurrent ("nodes", async () =>
{
//    // Create test file.

//    const canvas  = X3D .createBrowser ();
//    const browser = canvas .browser;
//    const scene   = await browser .createScene (browser .getProfile ("Full"), browser .getComponent ("X_ITE"));
//    const file    = path .join (__dirname, "files", "nodes.x3dv");

//    for (const ConcreteNode of browser .concreteNodes)
//       scene .rootNodes .push (scene .createNode (ConcreteNode .typeName));

//    const data = scene .toVRMLString () .replace (/\s+X_ITE\s+V[\d\.]+/, "");

//    if (data !== await readFile (file))
//       fs .writeFileSync (file, data);

//    // Test

   const file   = path .join (__dirname, "files", "nodes.x3dv");
   const output = sh (`npx x3d-tidy -i ${file} -o .x3dv`);

   expect (output .split ("\n") .length) .toBe (578);
});
