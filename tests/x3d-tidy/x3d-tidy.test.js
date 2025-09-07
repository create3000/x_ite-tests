const path = require ("path");
const { exec } = require ("child_process");
const { sh } = require ("shell-tools")

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

test ("nodes", () =>
{
   const file   = path .join (__dirname, "files", "nodes.x3dv");
   const output = sh (`npx --yes x3d-tidy -i ${file} -o .x3dv`);

   expect (output .split ("\n") .length) .toBe (532);
});
