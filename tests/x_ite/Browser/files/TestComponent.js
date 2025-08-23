const
   X3D                  = window .X3D,
   Components           = X3D .Components,
   X3DNode              = X3D .X3DNode,
   X3DConstants         = X3D .X3DConstants,
   FieldDefinitionArray = X3D .FieldDefinitionArray,
   X3DFieldDefinition   = X3D .X3DFieldDefinition,
   Fields               = X3D .Fields

class TestNode extends X3DNode
{
   static typeName           = "TestNode"
   static componentInfo      = Object .freeze ({ name: "Test", level: 1 })
   static containerField     = "testContainerField"
   static specificationRange = Object .freeze ({ from: "2.0", to: "Infinity" })

   static fieldDefinitions = new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new X3D .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "test",     new X3D .SFString ("TestValue")),
   ])

   constructor (executionContext)
   {
      super (executionContext)

      this .addType (X3DConstants .TestNode)
   }
}

Components .add ({
   name: "Test",
   concreteNodes:
   [
      TestNode,
   ],
});
