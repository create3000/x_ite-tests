const { exec } = require ("child_process")

test ("help", () => new Promise ((resolve, reject) =>
{
   exec ("npx x3d-tidy -h", (error, stdout, stderr) =>
   {
      if (error)
      {
         reject (error .message)
         return
      }

      if (stderr)
      {
         reject (stderr)
         return
      }

      expect (stdout) .toMatch (/x3d-tidy/)
      resolve ()
   });
}))
