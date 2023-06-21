const
   path = require ("path"),
   { execFileSync } = require ("child_process");

test ("default values", () =>
{
   const stdout = execFileSync ("perl", [path .resolve (__dirname, "fields.pl")])

   expect (stdout .toString ("utf8")) .toBe ("Test done.\n")
})
