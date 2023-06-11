const
   X3D    = require ("../../../X3D"),
   Fields = X3D .require ("x_ite/Fields")

const
   canvas  = X3D .createBrowser (),
   browser = canvas .browser // Must be lowercase

test ("environment", async () =>
{
   await browser .loadComponents (browser .getComponent ("Scripting"))

   const
      Script = browser .getConcreteNode ("Script"),
      script = new Script (browser .currentScene)

   script ._url = new X3D .MFString ("ecmascript:")
   script .setup ()

   expect (script .evaluate ("Browser")) .toBe (browser)
   expect (script .evaluate ("X3DConstants")) .toBe (X3D .X3DConstants)
})

test ("fields", async () =>
{
   await browser .loadComponents (browser .getComponent ("Scripting"))

   const
      Script = browser .getConcreteNode ("Script"),
      script = new Script (browser .currentScene)

   script .addUserDefinedField (X3D .X3DConstants .initializeOnly, "double1", new Fields .SFDouble ())
   script .addUserDefinedField (X3D .X3DConstants .initializeOnly, "vector1", new Fields .SFVec3f ())
   script .addUserDefinedField (X3D .X3DConstants .inputOnly,      "double2", new Fields .SFDouble ())
   script .addUserDefinedField (X3D .X3DConstants .inputOnly,      "vector2", new Fields .SFVec3f ())
   script .addUserDefinedField (X3D .X3DConstants .outputOnly,     "double3", new Fields .SFDouble ())
   script .addUserDefinedField (X3D .X3DConstants .outputOnly,     "vector3", new Fields .SFVec3f ())
   script .addUserDefinedField (X3D .X3DConstants .inputOutput,    "double4", new Fields .SFDouble ())
   script .addUserDefinedField (X3D .X3DConstants .inputOutput,    "vector4", new Fields .SFVec3f ())

   script ._url = new X3D .MFString ("ecmascript:")
   script .setup ()

   expect (script .evaluate ("double1")) .toBe (0)
   expect (script .evaluate ("vector1")) .toBeInstanceOf (Fields .SFVec3f)
   expect (script .evaluate ("typeof double2")) .toBe ("undefined")
   expect (script .evaluate ("typeof vector2")) .toBe ("undefined")
   expect (script .evaluate ("double3")) .toBe (0)
   expect (script .evaluate ("vector3")) .toBeInstanceOf (Fields .SFVec3f)
   expect (script .evaluate ("double4")) .toBe (0)
   expect (script .evaluate ("vector4")) .toBeInstanceOf (Fields .SFVec3f)
})
