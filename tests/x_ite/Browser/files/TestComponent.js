const
   X3D                  = window .X3D,
   Components           = X3D .require ("x_ite/Components"),
   X3DNode              = X3D .require ("x_ite/Components/Core/X3DNode"),
   X3DConstants         = X3D .require ("x_ite/Base/X3DConstants"),
   FieldDefinitionArray = X3D .require ("x_ite/Base/FieldDefinitionArray"),
   X3DFieldDefinition   = X3D .require ("x_ite/Base/X3DFieldDefinition"),
   Fields               = X3D .require ("x_ite/Fields")

class TestNode extends X3DNode {
   static typeName = "TestNode"
   static componentName = "Test"
   static containerField = "testContainerField"
   static specificationRange = Object .freeze (["2.0", "Infinity"])
   static fieldDefinitions = new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",  new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "test",      new Fields .SFString ("TestValue")),
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
