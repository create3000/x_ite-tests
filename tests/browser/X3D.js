import { expect } from "vitest";
import X3D              from "https://weiputer/x_ite/dist/x_ite.mjs";

function getPropertyDescriptor (obj, key)
{
	if (obj === undefined || obj === null)
		throw new TypeError('Cannot convert undefined or null to object');

	if (key in obj)
		return getRecursivePropertyDescriptor (obj);

	function getRecursivePropertyDescriptor (obj)
   {
		return Object .prototype .hasOwnProperty .call (obj, key)
			? Object .getOwnPropertyDescriptor (obj, key)
		   : getRecursivePropertyDescriptor (Object .getPrototypeOf (obj));
	}
}

Object .assign (window,
{
   enumerate (properties, target)
   {
      const
         a = { },
         b = { };

      for (const property in target)
      {
         if (getPropertyDescriptor (target, property) ?.enumerable)
            a [property] = true;
      }

      for (const property of properties)
         b [property] = true;

      expect (a) .toEqual (b);
   },
   sleep: delay => new Promise (resolve => setTimeout (resolve, delay)),
});

export default X3D;
