const
   X3D    = require ("../../X3D"),
   Fields = X3D .Fields;

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   scene   = Browser .currentScene;

test ("properties", () =>
{
   for (const typeName of Object .keys (Fields))
   {
      const
         Type  = Fields [typeName],
         field = new Type ();

      expect (Type .typeName) .toBe (typeName);

      expect (field) .toBeInstanceOf (X3D .X3DField);
      if (typeName .startsWith ("MF"))
         expect (field) .toBeInstanceOf (X3D .X3DArrayField);
      else
         expect (field) .not .toBeInstanceOf (X3D .X3DArrayField);
      expect (field) .toBeInstanceOf (Fields [typeName]);
      expect (field .constructor) .toBe (Fields [typeName]);

      expect (field .getName ()) .toBe ("");
      expect (field .getType ()) .toBe (X3D .X3DConstants [typeName]);
      expect (field .getType ()) .toBe (Fields [typeName] .type);
      expect (field .getTypeName ()) .toBe (typeName);
      expect (field .getTypeName ()) .toBe (Fields [typeName] .typeName);
      expect (Object .prototype .toString .call (field)) .toBe (`[object ${typeName}]`);

      expect (field .isReadable ()) .toBe (true);
      expect (field .isWritable ()) .toBe (true);
      expect (field .getAccessType ()) .toBe (X3D .X3DConstants .initializeOnly);
      expect (field .isInitializable ()) .toBe (true);
      expect (field .isInput ()) .toBe (false);
      expect (field .isOutput ()) .toBe (false);

      field .setAccessType (X3D .X3DConstants .inputOnly);

      expect (field .isReadable ()) .toBe (false);
      expect (field .isWritable ()) .toBe (true);
      expect (field .getAccessType ()) .toBe (X3D .X3DConstants .inputOnly);
      expect (field .isInitializable ()) .toBe (false);
      expect (field .isInput ()) .toBe (true);
      expect (field .isOutput ()) .toBe (false);

      field .setAccessType (X3D .X3DConstants .outputOnly);

      expect (field .isReadable ()) .toBe (true);
      expect (field .isWritable ()) .toBe (false);
      expect (field .getAccessType ()) .toBe (X3D .X3DConstants .outputOnly);
      expect (field .isInitializable ()) .toBe (false);
      expect (field .isInput ()) .toBe (false);
      expect (field .isOutput ()) .toBe (true);

      field .setAccessType (X3D .X3DConstants .inputOutput);

      expect (field .isReadable ()) .toBe (true);
      expect (field .isWritable ()) .toBe (true);
      expect (field .getAccessType ()) .toBe (X3D .X3DConstants .inputOutput);
      expect (field .isInitializable ()) .toBe (true);
      expect (field .isInput ()) .toBe (true);
      expect (field .isOutput ()) .toBe (true);
   }
});

test ("add/removeFieldInterest", () => new Promise ((resolve, reject) =>
{
   const node = Browser .currentScene .createNode ("Transform");

   expect (node .translation .getFieldInterests () .size) .toBe (0);

   const object =
   {
      callback1 ()
      {
         expect (node .scale .equals (new X3D .SFVec3f (2,3,4))) .toBe (true);

         node .translation .removeFieldInterest (node .scale);
         expect (node .translation .getFieldInterests () .size) .toBe (0);

         node .bboxSize .addInterest ("callback2", object);
         node .translation .addFieldInterest (node .bboxSize);
         expect (node .translation .getFieldInterests () .size) .toBe (1);

         node .bboxCenter .addInterest ("callback3", object);
         node .bboxCenter .addEvent ();
      },

      callback2 ()
      {
         reject (new Error ("Should not be called for improved safety."));
      },

      callback3 ()
      {
         expect (node .bboxSize .equals (new X3D .SFVec3f (-1,-1,-1))) .toBe (true);
         resolve ();
      },
   };

   node .scale .addInterest ("callback1", object);
   node .translation .addFieldInterest (node .scale);
   expect (node .translation .getFieldInterests () .size) .toBe (1);

   node .translation = new X3D .SFVec3f (2,3,4);
}));

test ("add/removeFieldCallback", () => new Promise ((resolve, reject) =>
{
   const node = Browser .currentScene .createNode ("Material");

   expect (node .getField ("transparency") .getFieldCallbacks () .size) .toBe (0);

   node .getField ("transparency") .addFieldCallback ("test", value =>
   {
      node .getField ("transparency") .removeFieldCallback ("test")
      expect (node .getField ("transparency") .getFieldCallbacks () .size) .toBe (0);

      expect (value) .toBe (0.5);
      resolve ();
   });

   expect (node .getField ("transparency") .getFieldCallbacks () .size) .toBe (1);

   node .transparency = 0.5;
}));

test ("add/removeFieldCallback", () => new Promise ((resolve, reject) =>
{
   const node = Browser .currentScene .createNode ("Transform");

   expect (node .translation .getFieldCallbacks () .size) .toBe (0);

   node .translation .addFieldCallback ("test", value =>
   {
      node .translation .removeFieldCallback ("test");
      expect (node .translation .getFieldCallbacks () .size) .toBe (0);

      expect (value .equals (new X3D .SFVec3f (2,3,4))) .toBe (true);
      resolve ();
   });

   expect (node .translation .getFieldCallbacks () .size) .toBe (1);

   node .translation = new X3D .SFVec3f (2,3,4);
}));

test ("user-data", () =>
{
   const
      field = new X3D .SFBool (),
      sym   = Symbol ();

   field .setUserData ("foo", 123);
   field .setUserData ("bah", 234);
   field .setUserData (sym,   345);

   expect (field .getUserData ("foo")) .toBe (123);
   expect (field .getUserData ("bah")) .toBe (234);
   expect (field .getUserData (sym)) .toBe (345);

   field .removeUserData ("foo");
   field .removeUserData ("bah");
   field .removeUserData (sym);

   expect (field .getUserData ("foo")) .toBe (undefined);
   expect (field .getUserData ("bah")) .toBe (undefined);
   expect (field .getUserData (sym)) .toBe (undefined);
});
