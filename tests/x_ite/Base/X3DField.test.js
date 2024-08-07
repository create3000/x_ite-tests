const
   X3D    = require ("../../X3D"),
   Fields = X3D .Fields

test ("properties", () =>
{
   for (const typeName of Object .keys (Fields))
   {
      const
         Type  = Fields [typeName],
         field = new Type ()

      expect (Type .typeName) .toBe (typeName)

      expect (field) .toBeInstanceOf (X3D .X3DField)
      if (typeName .startsWith ("MF")) expect (field) .toBeInstanceOf (X3D .X3DArrayField)
      expect (field) .toBeInstanceOf (Fields [typeName])
      expect (field .constructor) .toBe (Fields [typeName])

      expect (field .getName ()) .toBe ("")
      expect (field .getType ()) .toBe (X3D .X3DConstants [typeName])
      expect (field .getTypeName ()) .toBe (typeName)
      expect (Object .prototype .toString .call (field)) .toBe (`[object ${typeName}]`)

      expect (field .isReadable ()) .toBe (true)
      expect (field .isWritable ()) .toBe (true)
      expect (field .getAccessType ()) .toBe (X3D .X3DConstants .initializeOnly)
      expect (field .isInitializable ()) .toBe (true)
      expect (field .isInput ()) .toBe (false)
      expect (field .isOutput ()) .toBe (false)

      field .setAccessType (X3D .X3DConstants .inputOnly)

      expect (field .isReadable ()) .toBe (false)
      expect (field .isWritable ()) .toBe (true)
      expect (field .getAccessType ()) .toBe (X3D .X3DConstants .inputOnly)
      expect (field .isInitializable ()) .toBe (false)
      expect (field .isInput ()) .toBe (true)
      expect (field .isOutput ()) .toBe (false)

      field .setAccessType (X3D .X3DConstants .outputOnly)

      expect (field .isReadable ()) .toBe (true)
      expect (field .isWritable ()) .toBe (false)
      expect (field .getAccessType ()) .toBe (X3D .X3DConstants .outputOnly)
      expect (field .isInitializable ()) .toBe (false)
      expect (field .isInput ()) .toBe (false)
      expect (field .isOutput ()) .toBe (true)

      field .setAccessType (X3D .X3DConstants .inputOutput)

      expect (field .isReadable ()) .toBe (true)
      expect (field .isWritable ()) .toBe (true)
      expect (field .getAccessType ()) .toBe (X3D .X3DConstants .inputOutput)
      expect (field .isInitializable ()) .toBe (true)
      expect (field .isInput ()) .toBe (true)
      expect (field .isOutput ()) .toBe (true)
   }
})

test ("user-data", () =>
{
   const
      field = new Fields .SFBool (),
      sym   = Symbol ()

   field .setUserData ("foo", 123)
   field .setUserData ("bah", 234)
   field .setUserData (sym,   345)

   expect (field .getUserData ("foo")) .toBe (123)
   expect (field .getUserData ("bah")) .toBe (234)
   expect (field .getUserData (sym)) .toBe (345)

   field .removeUserData ("foo")
   field .removeUserData ("bah")
   field .removeUserData (sym)

   expect (field .getUserData ("foo")) .toBe (undefined)
   expect (field .getUserData ("bah")) .toBe (undefined)
   expect (field .getUserData (sym)) .toBe (undefined)
})
