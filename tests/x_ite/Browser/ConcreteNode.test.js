
const
   X3D     = require ("../../X3D"),
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("addConcreteNode", () =>
{
   class Foo extends X3D .X3DNode
   {
      constructor (executionContext)
      {
         super (executionContext);

         this .addType (X3D .X3DConstants .Foo);
      }

      static typeName           = "Foo";
      static componentInfo      = Object .freeze ({ name: "Core", level: 1 });
      static containerField     = "children";
      static specificationRange = Object .freeze ({ from: "2.0", to: "Infinity" });
      static fieldDefinitions   = new X3D .FieldDefinitionArray ([
         new X3D .X3DFieldDefinition (X3D .X3DConstants .inputOutput, "metadata", new X3D .SFNode ()),
         new X3D .X3DFieldDefinition (X3D .X3DConstants .inputOutput, "bah",      new X3D .SFString ("BAH")),
      ]);
   }

   Browser .addConcreteNode (Foo);

   expect (typeof X3D .X3DConstants .Foo) .toBe ("number");

   const foo = Browser .currentScene .createNode ("Foo");

   expect (foo .getNodeTypeName ()) .toBe ("Foo");
   expect (foo .getNodeType () .includes (X3D .X3DConstants .Foo)) .toBe (true);
   expect (foo .bah) .toBe ("BAH");
});
