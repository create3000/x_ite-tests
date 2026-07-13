const
   $             = require ("jquery"),
   path          = require ("path"),
   url           = require ("url"),
   child_process = require ("child_process"),
   fs            = require ("fs"),
   pixelmatch    = require ("pixelmatch"),
   { PNG }       = require ("pngjs");

const
   X3D     = require ("../X3D"),
   canvas  = X3D .createBrowser (),
   browser = canvas .browser;

const
   width  = 1000,
   height = 562;

const
   threshold           = 0.1,
   maxMismatchedPixels = 7_000;

$(canvas) .css ("width", width) .css ("height", height);
$("body") .append (canvas);

browser .setBrowserOption ("Mute", true);

test ("media", async () =>
{
   const media = require ("../../../media/docs/examples/config.json");

   for (const example of media)
   {
      if (!example .test)
         continue;

      const { name, component } = example;

      const fileURL = url .pathToFileURL (path .resolve (__dirname, `../../../media/docs/examples/${component}/${name}/${name}.x3d`));

      await browser .loadURL (new X3D .MFString (fileURL));
      await browser .nextFrame ();

      const blob1 = await new Promise (resolve =>
      {
         canvas .toBlob (blob => resolve (blob), "image/png", 1);
      });

      const blob2 = await run ("magick", ["PNG:-", "AVIF:-"], blob1);
      const url2  = URL .createObjectURL (blob2);
      const avif  = path .resolve (__dirname, `../../../media/docs/examples/${component}/${name}/screenshot.avif`);

      const img1 = await loadImage (avif);
      const img2 = await loadImage (url2);

      const data1 = readPixels (img1);
      const data2 = readPixels (img2);

      const diff = new PNG ({ width, height });

      const mismatchedPixels = pixelmatch (data1, data2, diff .data, width, height, { threshold });

      URL .revokeObjectURL (url2);

      console .log (`{component} ${name}`);

      if (mismatchedPixels >= maxMismatchedPixels)
      {
         fs .writeFileSync (path .resolve (__dirname, "image.png"), Buffer .from (await blob2 .arrayBuffer ()));

         const out = fs .createWriteStream (path .resolve (__dirname, "diff.png"));

         const finished = new Promise ((resolve, reject) =>
         {
            out .on ("finish", () => resolve ()) .on ("error", error => reject (error));
         });

         diff .pack () .pipe (out);

         await finished;
      }

      // Number of Pixels: 562_000
      expect (mismatchedPixels) .toBeLessThan (maxMismatchedPixels);
   }
},
70_000);

function loadImage (url)
{
   return new Promise ((resolve, reject) =>
   {
      const image = new Image ();

      image .onload = () => resolve (image);

      image .onerror =
      image .onabort = event => reject (new Error (`Couldn't load image '${url}': ${event .type}.`));

      image .src = url;
   });
}

function readPixels (image)
{
   const
      gl          = browser .getContext (),
      texture     = gl .createTexture (),
      framebuffer = gl .createFramebuffer (),
      width       = image .width,
      height      = image .height,
      data        = new Uint8Array (width * height * 4);

   // Create texture.

   gl .bindTexture (gl .TEXTURE_2D, texture);
   gl .pixelStorei (gl .UNPACK_COLORSPACE_CONVERSION_WEBGL, gl .NONE);
   gl .texImage2D  (gl .TEXTURE_2D, 0, gl .RGBA, width, height, 0, gl .RGBA, gl .UNSIGNED_BYTE, image);
   gl .pixelStorei (gl .UNPACK_COLORSPACE_CONVERSION_WEBGL, gl .BROWSER_DEFAULT_WEBGL);

   // Read pixels from framebuffer.

   gl .bindFramebuffer (gl .FRAMEBUFFER, framebuffer);
   gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, texture, 0);
   gl .readPixels (0, 0, width, height, gl .RGBA, gl .UNSIGNED_BYTE, data);

   // Clean up.

   gl .deleteFramebuffer (framebuffer);
   gl .deleteTexture (texture);

   return data;
}

async function run (command, args = [ ], stdinBlob = null)
{
   return new Promise ((resolve, reject) =>
   {
      const child = child_process .spawn (command, args);

      const stdoutChunks = [];
      const stderrChunks = [];

      child.stdout.on("data", chunk => stdoutChunks .push (chunk));

      child .stderr .on( "data", chunk => stderrChunks .push (chunk));

      child .on ("error", reject);

      child .on ("close", () => resolve (new Blob (stdoutChunks)));

      (async () =>
      {
         const buffer = Buffer .from (await stdinBlob .arrayBuffer ());

         child.stdin .end (buffer);
      })()
      .catch (reject);
   });
}
