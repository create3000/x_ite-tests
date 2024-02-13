const { exec } = require ("child_process");

test ("help", () => new Promise ((resolve, reject) =>
{
   exec ("npx --yes x3d-tidy -h", (error, stdout, stderr) =>
   {
      if (error)
      {
         reject (error .message);
         return;
      }

      if (stderr)
      {
         reject (stderr);
         return;
      }

      expect (stdout) .toMatch (/x3d-tidy args/);
      resolve ();
   });
}));

test ("error", () => new Promise ((resolve, reject) =>
{
   exec ("npx --yes x3d-tidy -i does/not/exist -o does/not/exist", (error, stdout, stderr) =>
   {
      if (error)
      {
         reject (error .message);
         return;
      }

      if (stderr)
      {
         expect (stderr) .toMatch (/Couldn't load X3D file./);
         resolve ();
         return;
      }

      reject ("there should be no stdout");
   });
}));
