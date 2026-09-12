import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test .concurrent ("properties", async () =>
{
   const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF I PositionInterpolator { }

DEF T Transform {
   children Shape {
      geometry Box { }
   }
}

ROUTE I.value_changed TO T.set_translation
`));

   expect (scene .routes) .toHaveLength (1);

   const route = scene .routes [0];

   expect (route) .toBeInstanceOf (X3D .X3DRoute);
   expect (route .constructor) .toBe (X3D .X3DRoute);

   expect (route .sourceNode) .toBeInstanceOf (X3D .SFNode);
   expect (route .sourceNode) .toBe (scene .getNamedNode ("I"));
   expect (route .sourceNode .getNodeTypeName ()) .toBe ("PositionInterpolator");
   expect (route .sourceField) .toBe ("value_changed");
   expect (route .destinationNode) .toBeInstanceOf (X3D .SFNode);
   expect (route .destinationNode) .toBe (scene .getNamedNode ("T"));
   expect (route .destinationNode .getNodeTypeName ()) .toBe ("Transform");
   expect (route .destinationField) .toBe ("set_translation");
   expect (route .getSourceNode ()) .toBe (route .sourceNode .getValue ());
   expect (route .getSourceField ()) .toBe (route .sourceField);
   expect (route .getDestinationNode ()) .toBe (route .destinationNode .getValue ());
   expect (route .getDestinationField ()) .toBe (route .destinationField);

   expect (X3D .X3DRoute .typeName) .toBe ("X3DRoute");
   expect (route .getTypeName ()) .toBe ("X3DRoute");
   expect (Object .prototype .toString .call (route)) .toBe (`[object X3DRoute]`);
   expect (route .toString ()) .toBe (`[object ${route .getTypeName ()}]`);

   expect (route .getId ()) .toBeGreaterThan (0);
   expect (route .getRouteId ()) .toMatch (/\d+\.\w+\.\d+\.\w+/);

   expect (() => route .sourceNode       = undefined) .toThrow (Error);
   expect (() => route .sourceField      = undefined) .toThrow (Error);
   expect (() => route .destinationNode  = undefined) .toThrow (Error);
   expect (() => route .destinationField = undefined) .toThrow (Error);

   expect (route .sourceNode) .toBeInstanceOf (X3D .SFNode);
   expect (route .sourceNode) .toBe (scene .getNamedNode ("I"));
   expect (route .sourceNode .getNodeTypeName ()) .toBe ("PositionInterpolator");
   expect (route .sourceField) .toBe ("value_changed");
   expect (route .destinationNode) .toBeInstanceOf (X3D .SFNode);
   expect (route .destinationNode) .toBe (scene .getNamedNode ("T"));
   expect (route .destinationNode .getNodeTypeName ()) .toBe ("Transform");
   expect (route .destinationField) .toBe ("set_translation");

   const properties = [
      "sourceNode",
      "sourceField",
      "destinationNode",
      "destinationField",
   ];

   enumerate (properties, route);
});

test .concurrent ("valid route vrml", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF I PositionInterpolator { }

DEF T Transform {
   children Shape {
      geometry Box { }
   }
}

ROUTE I.value_changed TO T.set_translation
`));

   expect (scene1 .routes) .toHaveLength (1);
});

test .concurrent ("valid route xml", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+xml,
<X3D profile='Interchange'>
  <Scene>
    <PositionInterpolator DEF='I'/>
    <Transform DEF='T'>
      <Shape>
        <Box/>
      </Shape>
    </Transform>
    <ROUTE fromNode='I' fromField='value_changed' toNode='T' toField='set_translation'/>
  </Scene>
</X3D>
`));

   expect (scene1 .routes) .toHaveLength (1);
});

test .concurrent ("invalid route vrml", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF I PositionInterpolator { }

DEF T Transform {
   children Shape {
      geometry Box { }
   }
}

ROUTE I.does_not_exists TO T.set_translation
`));

   expect (scene1 .routes) .toHaveLength (0);

   const scene2 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF I PositionInterpolator { }

DEF T Transform {
   children Shape {
      geometry Box { }
   }
}

ROUTE I.value_changed TO T.does_not_exists
`));

   expect (scene2 .routes) .toHaveLength (0);

   const scene3 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF T Transform {
   children Shape {
      geometry Box { }
   }
}

ROUTE DoesNotExists.value_changed TO T.translation
`));

   expect (scene3 .routes) .toHaveLength (0);

   const scene4 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF T Transform {
   children Shape {
      geometry Box { }
   }
}

ROUTE T.translation TO DoesNotExists.value_changed
`));

   expect (scene4 .routes) .toHaveLength (0);
});

test .concurrent ("invalid route xml", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+xml,
<X3D profile='Interchange'>
  <Scene>
    <PositionInterpolator DEF='I'/>
    <Transform DEF='T'>
      <Shape>
        <Box/>
      </Shape>
    </Transform>
    <ROUTE fromNode='I' fromField='does_not_exists' toNode='T' toField='set_translation'/>
  </Scene>
</X3D>
`));

   expect (scene1 .routes) .toHaveLength (0);

   const scene2 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+xml,
<X3D profile='Interchange'>
  <Scene>
    <PositionInterpolator DEF='I'/>
    <Transform DEF='T'>
      <Shape>
        <Box/>
      </Shape>
    </Transform>
    <ROUTE fromNode='I' fromField='value_changed' toNode='T' toField='does_not_exists'/>
  </Scene>
</X3D>
`));

   expect (scene2 .routes) .toHaveLength (0);

   const scene3 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+xml,
<X3D profile='Interchange'>
  <Scene>
    <PositionInterpolator DEF='I'/>
    <Transform DEF='T'>
      <Shape>
        <Box/>
      </Shape>
    </Transform>
    <ROUTE fromNode='DoesNotExists' fromField='value_changed' toNode='T' toField='translation'/>
  </Scene>
</X3D>
`));

   expect (scene3 .routes) .toHaveLength (0);

   const scene4 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+xml,
<X3D profile='Interchange'>
  <Scene>
    <PositionInterpolator DEF='I'/>
    <Transform DEF='T'>
      <Shape>
        <Box/>
      </Shape>
    </Transform>
    <ROUTE fromNode='T' fromField='value_changed' toNode='DoesNotExists' toField='translation'/>
  </Scene>
</X3D>
`));

   expect (scene4 .routes) .toHaveLength (0);
});

test .concurrent ("imported node vrml", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF I Inline {
   load FALSE
}

DEF T Transform {
   children Shape {
      geometry Box { }
   }
}

IMPORT I.IM

ROUTE IM.some_filed TO T.set_translation
`));

   expect (scene1 .routes) .toHaveLength (1);

   const scene2 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF I Inline {
   load FALSE
}

DEF T Transform {
   children Shape {
      geometry Box { }
   }
}

IMPORT I.IM

ROUTE T.translation TO IM.some_filed
`));

   expect (scene2 .routes) .toHaveLength (1);

   const scene3 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF I Inline {
   load FALSE
}

IMPORT I.IM

ROUTE IM.some_filed TO IM.some_filed
`));

   expect (scene3 .routes) .toHaveLength (1);
});

test .concurrent ("imported node xml", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+xml,
<X3D profile='Interchange'>
  <Scene>
    <Inline DEF='I'
        load='false'/>
    <Transform DEF='T'>
      <Shape>
        <Box/>
      </Shape>
    </Transform>
    <IMPORT inlineDEF='I' importedDEF='IM'/>
    <ROUTE fromNode='IM' fromField='some_filed' toNode='T' toField='set_translation'/>
  </Scene>
</X3D>
`));

   expect (scene1 .routes) .toHaveLength (1);

   const scene2 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+xml,
<X3D profile='Interchange'>
  <Scene>
    <Inline DEF='I'
        load='false'/>
    <Transform DEF='T'>
      <Shape>
        <Box/>
      </Shape>
    </Transform>
    <IMPORT inlineDEF='I' importedDEF='IM'/>
    <ROUTE fromNode='T' fromField='translation' toNode='IM' toField='some_filed'/>
  </Scene>
</X3D>
`));

   expect (scene2 .routes) .toHaveLength (1);

   const scene3 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+xml,
<X3D profile='Interchange'>
  <Scene>
    <Inline DEF='I'
        load='false'/>
    <IMPORT inlineDEF='I' importedDEF='IM'/>
    <ROUTE fromNode='IM' fromField='some_filed' toNode='IM' toField='some_filed'/>
  </Scene>
</X3D>
`));

   expect (scene3 .routes) .toHaveLength (1);
});
