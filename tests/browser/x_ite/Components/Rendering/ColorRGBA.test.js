import { expect, test } from "vitest";
import X3D              from "../../../X3D.js";

const Browser = X3D .createBrowser () .browser;

test .concurrent ("use", async () =>
{
   const input = `#X3D V4.0 utf8
PROFILE Interchange

Shape {
   geometry PointSet {
      color ColorRGBA {
         color [ ]
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
      color ColorRGBA {
         color [
            0.0 0.0 0.0 0.0,
            0.1 0.1 0.1 0.1,
            0.2 0.2 0.2 0.2
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
      color ColorRGBA {
         color [ ]
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
      color ColorRGBA {
         color [
            0.0 0.0 0.0 0.0,
            0.1 0.1 0.1 0.1,
            0.2 0.2 0.2 0.2
         ]
      }
      coord USE C
   }
}
`;

   await expect (Browser .createX3DFromString (input)) .resolves .toBeInstanceOf (X3D .X3DScene);
});
