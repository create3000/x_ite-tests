const
   $             = require ("jquery"),
   path          = require ("path"),
   url           = require ("url"),
   child_process = require ("child_process"),
   pixelmatch    = require ("pixelmatch");

const
   X3D     = require ("../X3D"),
   canvas  = X3D .createBrowser (),
   browser = canvas .browser;

$(canvas) .css ("width", 1000) .css ("height", 562);
$("body") .append (canvas);

browser .setBrowserOption ("Mute", true);

test ("media", async () =>
{
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

      const mismatchedPixels = pixelmatch (data1, data2, null, 1000, 562, { threshold: 0.1 });

      URL .revokeObjectURL (url2);

      // Number of Pixels: 562_000
      expect (mismatchedPixels) .toBeLessThan (7_000);
   }
},
40_000);
