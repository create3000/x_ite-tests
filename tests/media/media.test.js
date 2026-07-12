const
   $              = require ("jquery"),
   path           = require ("path"),
   url            = require ("url"),
   fs             = require ("fs"),
   { imgDiff }    = require ("img-diff-js"),
   { systemSync } = require ("shell-tools");

const
   X3D     = require ("../X3D"),
   canvas  = X3D .createBrowser (),
   browser = canvas .browser;

$(canvas) .css ("width", 1000) .css ("height", 562);
$("body") .append (canvas);

// test ("media", async () =>
// {
//    const media = require ("../../../media/docs/examples/config.json");

//    for (const example of media)
//    {
//       if (!example .test)
//          continue;

//       const { name, component } = example;

//       const fileURL = url .pathToFileURL (path .resolve (__dirname, `../../../media/docs/examples/${component}/${name}/${name}.x3d`));

//       await browser .loadURL (new X3D .MFString (fileURL));
//       await browser .nextFrame ();

//       const blob = await new Promise (resolve =>
//       {
//          canvas .toBlob (blob => resolve (blob), "image/png", 1);
//       });

//       const avif = path .resolve (__dirname, `../../../media/docs/examples/${component}/${name}/screenshot.avif`);
//       const png1  = "/tmp/x_ite-tests.media.1.png";
//       const png2  = "/tmp/x_ite-tests.media.2.png";
//       const diff  = "/tmp/x_ite-tests.media.diff.png";

//       systemSync (`magick`, avif, png1);

//       fs .writeFileSync (png2, new DataView (await blob .arrayBuffer ()));

//       const result = await imgDiff ({
//          actualFilename: png2,
//          expectedFilename: png1,
//          // diffFilename: diff,
//          options: {
//             threshold: 0.30, // default 0.1
//          },
//       });

//       expect (result .imagesAreSame) .toBe (true);
//    }
// });
