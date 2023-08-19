const
   X3D     = require ("../../../X3D"),
   Browser = X3D .createBrowser () .browser

test ("use", async () =>
{
   const input = `#X3D V4.0 utf8
PROFILE Interchange

Shape {
   geometry PointSet {
      normal Normal {
         vector [ ]
      }
      coord DEF C Coordinate {
         point [
            0 0 0
            1 0 0
            1 1 0
            1 0 0
            2 0 0
            2 1 0
         ]
      }
   }
}

Shape {
   geometry PointSet {
      normal Normal {
         vector [
            1 0 0,
            0 1 0,
            0 0 1,
         ]
      }
      coord USE C
   }
}

Shape {
   geometry IndexedFaceSet {
      coordIndex [
         0 1 2 -1
         3 4 5 -1
      ]
      normal Normal {
         vector [ ]
      }
      coord USE C
   }
}

Shape {
   geometry IndexedFaceSet {
      coordIndex [
         0 1 2 -1
         3 4 5 -1
      ]
      normal Normal {
         vector [
            1 0 0,
            0 1 0,
            0 0 1,
         ]
      }
      coord USE C
   }
}
`

   await expect (Browser .createX3DFromString (input)) .resolves .toBeInstanceOf (X3D .X3DScene)
})
