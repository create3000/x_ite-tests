import { expect, test } from "vitest";
import X3D              from "https://weiputer/x_ite/dist/x_ite.mjs";

test ("test", () =>
{
   expect (window) .toBeInstanceOf (Object);
   expect (X3D) .toBeInstanceOf (Object);
});
