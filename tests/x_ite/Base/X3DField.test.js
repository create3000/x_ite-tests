const
   X3D    = require ("../../X3D"),
   Fields = X3D .require ("x_ite/Fields")

test ("properties", () =>
{
   const field = new Fields .SFBool ()

   expect (field .getName ()) .toBe ("")
   expect (field .getType ()) .toBe (X3D .X3DConstants .SFBool)
   expect (field .isReadable ()) .toBe (true)
   expect (field .isWritable ()) .toBe (true)
   expect (field .getAccessType ()) .toBe (X3D .X3DConstants .initializeOnly)
   expect (field .isInitializable ()) .toBe (true)
   expect (field .isInput ()) .toBe (false)
   expect (field .isOutput ()) .toBe (false)

   field .setAccessType (X3D .X3DConstants .inputOnly)

   expect (field .getName ()) .toBe ("")
   expect (field .getType ()) .toBe (X3D .X3DConstants .SFBool)
   expect (field .isReadable ()) .toBe (false)
   expect (field .isWritable ()) .toBe (true)
   expect (field .getAccessType ()) .toBe (X3D .X3DConstants .inputOnly)
   expect (field .isInitializable ()) .toBe (false)
   expect (field .isInput ()) .toBe (true)
   expect (field .isOutput ()) .toBe (false)

   field .setAccessType (X3D .X3DConstants .outputOnly)

   expect (field .getName ()) .toBe ("")
   expect (field .getType ()) .toBe (X3D .X3DConstants .SFBool)
   expect (field .isReadable ()) .toBe (true)
   expect (field .isWritable ()) .toBe (false)
   expect (field .getAccessType ()) .toBe (X3D .X3DConstants .outputOnly)
   expect (field .isInitializable ()) .toBe (false)
   expect (field .isInput ()) .toBe (false)
   expect (field .isOutput ()) .toBe (true)

   field .setAccessType (X3D .X3DConstants .inputOutput)

   expect (field .getName ()) .toBe ("")
   expect (field .getType ()) .toBe (X3D .X3DConstants .SFBool)
   expect (field .isReadable ()) .toBe (true)
   expect (field .isWritable ()) .toBe (true)
   expect (field .getAccessType ()) .toBe (X3D .X3DConstants .inputOutput)
   expect (field .isInitializable ()) .toBe (true)
   expect (field .isInput ()) .toBe (true)
   expect (field .isOutput ()) .toBe (true)
})
