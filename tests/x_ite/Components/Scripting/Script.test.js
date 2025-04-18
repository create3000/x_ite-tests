const
   X3D    = require ("../../../X3D"),
   Fields = X3D .Fields;

const
   canvas  = X3D .createBrowser (),
   browser = canvas .browser; // Must be lowercase

test ("environment", async () =>
{
   await browser .loadComponents (browser .getComponent ("Scripting"));

   const scene = await browser .createX3DFromString (`
PROFILE Interchange
COMPONENT Scripting:1
DEF Script Script {
url "ecmascript:"
}
   `);

   const script = scene .getNamedNode ("Script") .getValue ();

   expect (script .getExecutionContext ()) .toBe (scene);
   expect (script .evaluate ("arguments")) .toHaveLength (0);
   expect (script .evaluate ("0 in arguments")) .toBe (false);
   expect (script .evaluate ("1 in arguments")) .toBe (false);

   expect (script .evaluate ("TRUE"))  .toBe (true);
   expect (script .evaluate ("FALSE")) .toBe (false);
   expect (script .evaluate ("NULL"))  .toBe (null);

   expect (script .evaluate ("print")) .toBeInstanceOf (Function);
   expect (script .evaluate ("trace")) .toBeInstanceOf (Function);

   expect (script .evaluate ("Browser")) .toBeInstanceOf (X3D .X3DBrowser);
   expect (script .evaluate ("Browser .currentScene")) .toBe (scene);
});

test ("SFNode", async () =>
{
   {
      await browser .loadComponents (browser .getComponent ("Scripting"));

      const scene = await browser .createX3DFromString (`#VRML V2.0 utf8
PROFILE Interchange
COMPONENT Scripting:1
DEF Script Script {
   url "ecmascript:"
}
      `);

      const script = scene .getNamedNode ("Script") .getValue ();

      expect (script .evaluate ("SFNode")) .not .toBe (X3D .SFNode);
      expect (script .evaluate ("new SFNode ('Transform { }')")) .toBeInstanceOf (script .evaluate ("SFNode"));
      expect (script .evaluate ("new SFNode ('Transform { }')")) .toBeInstanceOf (X3D .SFNode);
      expect (script .evaluate ("new SFNode ('Transform { }')") .getNodeTypeName ()) .toBe ("Transform");
      expect (() => script .evaluate ("new SFNode ('NULL')")) .toThrow (Error);
   }

   {
      await browser .loadComponents (browser .getComponent ("Scripting"));

      const scene = await browser .createX3DFromString (`
PROFILE Interchange
COMPONENT Scripting:1
DEF Script Script {
   url "ecmascript:"
}
      `);

      const script = scene .getNamedNode ("Script") .getValue ();

      expect (script .evaluate ("SFNode")) .not .toBe (X3D .SFNode);
      expect (script .evaluate ("new SFNode ('Transform { }')")) .toBeInstanceOf (script .evaluate ("SFNode"));
      expect (script .evaluate ("new SFNode ('Transform { }')")) .toBeInstanceOf (X3D .SFNode);
      expect (script .evaluate ("new SFNode ('Transform { }')") .getNodeTypeName ()) .toBe ("Transform");
      expect (() => script .evaluate ("new SFNode ('NULL')")) .toThrow (Error);
   }
});

test ("fields", async () =>
{
   await browser .loadComponents (browser .getComponent ("Scripting"));

   const scene = await browser .createX3DFromString (`
PROFILE Interchange
COMPONENT Scripting:1
DEF Script Script {
   initializeOnly SFDouble double1 0
   initializeOnly SFVec3f  vector1 0 0 0
   inputOnly      SFDouble double2
   inputOnly      SFVec3f  vector2
   outputOnly     SFDouble double3
   outputOnly     SFVec3f  vector3
   inputOutput    SFDouble double4 0
   inputOutput    SFVec3f  vector4 0 0 0

   url "ecmascript:"
}
   `);

   const script = scene .getNamedNode ("Script") .getValue ();

   expect (script .evaluate ("double1")) .toBe (0);
   expect (script .evaluate ("vector1")) .toBeInstanceOf (Fields .SFVec3f);
   expect (script .evaluate ("typeof double2")) .toBe ("undefined");
   expect (script .evaluate ("typeof vector2")) .toBe ("undefined");
   expect (script .evaluate ("double3")) .toBe (0);
   expect (script .evaluate ("vector3")) .toBeInstanceOf (Fields .SFVec3f);
   expect (script .evaluate ("double4")) .toBe (0);
   expect (script .evaluate ("vector4")) .toBeInstanceOf (Fields .SFVec3f);
});

test ("createVrmlFromURL", async () =>
{
   const scene = await browser .createX3DFromString (`#VRML V2.0 utf8
PROFILE Interchange
COMPONENT Scripting:1
DEF Script Script {
   inputOutput MFNode nodes [ ]
   url "ecmascript:
let res, rej;

load = function (resolve, reject)
{
   res = resolve;
   rej = reject;

   const self = Browser .currentScene .getNamedNode ('Script');

   Browser .createVrmlFromURL (new MFString (\`data:model/x3d+vrml,
Transform { }
Shape { }
Box { }
   \`), self, 'nodes');
}

function set_nodes (nodes, time)
{
   res (nodes);
}
   "
}
   `);

   const
      script = scene .getNamedNode ("Script") .getValue (),
      load   = script .evaluate ("load");

   const nodes = await new Promise ((resolve, reject) => load (resolve, reject));

   expect (nodes) .not .toBe (script .getField ("nodes"));
   expect (nodes) .toHaveLength (3);
   expect (nodes [0] .getNodeTypeName ()) .toBe ("Transform");
   expect (nodes [1] .getNodeTypeName ()) .toBe ("Shape");
   expect (nodes [2] .getNodeTypeName ()) .toBe ("Box");
});

test ("this", async () =>
{
   try
   {
      await browser .loadComponents (browser .getComponent ("Scripting"));

      const script = browser .currentScene .createNode ("Script");

      expect (script .getValue () .evaluate ("this")) .toBe (script);
   }
   catch (error)
   {
      throw new Error (error .message);
   }
});
