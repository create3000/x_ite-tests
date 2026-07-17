import { expect, test } from "vitest";
import X3D              from "../X3D.js";
import pixelmatch       from "https://cdn.jsdelivr.net/npm/pixelmatch@7.2.0/index.min.js";

const
   width  = 1000,
   height = 562;

const
   threshold           = 0.1,
   maxMismatchedPixels = 18_000;

const
   body    = document .querySelector ("body"),
   canvas  = X3D .createBrowser (),
   browser = canvas .browser;

const style = {
   width: `${width}px`,
   height: `${height}px`,
   transform: "scale(0.8)",
   transformOrigin: "top left",
};

Object .assign (canvas .style, style);
body .appendChild (canvas);
browser .setBrowserOption ("SplashScreen", false);
browser .setBrowserOption ("Mute", true);

test .concurrent ("media", async () =>
{
   const media = JSON .parse (await get ("https://weiputer/media/docs/examples/config.json"));

   for (const example of media)
   {
      if (!example .test)
         continue;

      const { name, component } = example;

      console .log (component, name);

      const fileURL = new URL (`https://weiputer/media/docs/examples/${component}/${name}/${name}.x3d`);

      await browser .loadURL (new X3D .MFString (fileURL));
      await browser .nextFrame ();

      const blob2 = await new Promise (resolve => canvas .toBlob (resolve, "image/png"));
      const url2  = URL .createObjectURL (blob2);
      const url1  = new URL (`https://weiputer/media/docs/examples/${component}/${name}/screenshot.avif`);

      const img1 = await loadImage (url1);
      const img2 = await loadImage (url2);

      const data1 = readPixels (img1);
      const data2 = readPixels (img2);
      const diff  = new Uint8Array (data1 .length);

      const mismatchedPixels = pixelmatch (data1, data2, diff, width, height, { threshold });

      if (mismatchedPixels >= maxMismatchedPixels)
      {
         console .log (mismatchedPixels);

         const
            canvas  = X3D .createBrowser (),
            browser = canvas .browser;

         Object .assign (canvas .style, style);
         body .appendChild (canvas);
         browser .setBrowserOption ("SplashScreen", false);

         const scene = await browser .createX3DFromString (`#X3D V4.1 utf8 X_ITE V15.1.12

         PROFILE Interchange

         COMPONENT Geometry2D : 1
         COMPONENT Layering : 1
         COMPONENT Layout : 1

         UNIT angle degree 0.017453292519943295

         LayerSet {
            activeLayer -1
            order 1
            layers LayoutLayer {
               layout Layout { }
               children DEF Rectangle2D_1 Transform {
                  rotation 0 1 0 180
                  scale -1 -1 -1
                  children Shape {
                     appearance Appearance {
                        texture PixelTexture {
                           image ${width} ${height} 4
                              ${new Uint32Array (diff .buffer) .join (" ")}
                        }
                     }
                     geometry Rectangle2D {
                        size 1 1
                     }
                  }
               }
            }
         }`);

         await browser .replaceWorld (scene);
      }

      // Number of Pixels: 562_000
      expect (mismatchedPixels) .toBeLessThan (maxMismatchedPixels);

      URL .revokeObjectURL (url2);
   }
},
70_000);

async function get (url)
{
   const response = await fetch (url);
   const text     = await response .text ();

   return text;
}

function loadImage (url)
{
   return new Promise ((resolve, reject) =>
   {
      const image = new Image ();

      image .onload = () => resolve (image);

      image .onerror =
      image .onabort = event => reject (new Error (`Couldn't load image '${url}': ${event .type}.`));

      image .crossOrigin = "anonymous";
      image .src         = url;
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
