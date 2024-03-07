const X3D = require ("../../../X3D");

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("add/removeWorldInfo", () =>
{
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (0);

   const worldInfo1 = Browser .currentScene .createNode ("WorldInfo");
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (1);

   const worldInfo2 = Browser .currentScene .createNode ("WorldInfo");
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (2);

   worldInfo1 .getValue () .setLive (false);
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (1);
   worldInfo1 .getValue () .setLive (false);
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (1);

   worldInfo2 .getValue () .setLive (false);
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (0);

   worldInfo1 .getValue () .setLive (true);
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (1);

   worldInfo2 .getValue () .setLive (true);
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (2);
   worldInfo2 .getValue () .setLive (true);
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (2);

   worldInfo1 .dispose ();
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (1);

   worldInfo2 .dispose ();
   expect (Browser .currentScene .getWorldInfos ()) .toHaveLength (0);
});
