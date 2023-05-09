const
   X3D = require ("../../X3D"),
   $   = require ("jquery")

test ("element-construction", () =>
{
   const
      elements = $("<x3d-canvas></x3d-canvas>"),
      canvas   = elements [0]

   expect (elements) .toHaveLength (1)
   expect (canvas .nodeName) .toBe ("X3D-CANVAS")
   expect (canvas .browser) .toBeInstanceOf (X3D .X3DBrowser)
})
