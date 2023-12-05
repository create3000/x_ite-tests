Object .assign (global,
{
   enumerate (properties, target)
   {
      const
         a = { },
         b = { }

      for (const property in target)
         a [property] = true

      for (const property of properties)
         b [property] = true

      expect (a) .toEqual (b)
   },
   sleep: delay => new Promise (resolve => setTimeout (resolve, delay)),
})

module .exports = require ("../../x_ite")
