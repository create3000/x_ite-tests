const
   X3D        = require ("../../X3D"),
   FileLoader = X3D .require ("x_ite/InputOutput/FileLoader")

test ("data-url", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   const vertex = `#version 300 es
// Some percent % signs can cause to 100% an error.

void
main ()
{
   int i = 23 % 2; // Maybe as modulo.
}
`;

   new FileLoader (Browser .getWorld ()) .loadDocument (new X3D .MFString (encodeURI (`data:x-shader/x-vertex,${vertex}`)), function (data)
   {
      try
      {
         expect (data) .toBe (vertex)
         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   });
}))

test .each ([
   ["ecmascript:"],
   ["javascript:"],
   ["vrmlscript:"],
])
("ecmascript-url", (protocol) => new Promise ((resolve, reject) =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   const text = `
// Some percent % signs can cause to 100% an error.

function test ()
{
   let i = 23 % 2; // Maybe as modulo.
}
`;

   new FileLoader (Browser .getWorld ()) .loadDocument (new X3D .MFString (`${protocol}${text}`), function (data)
   {
      try
      {
         expect (data) .toBe (text)
         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   });
}))
