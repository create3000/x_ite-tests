const
   TestSequencer = require ("@jest/test-sequencer") .default,
   fs            = require ("fs");

class CustomTestSequencer extends TestSequencer
{
   sort (tests)
   {
      // Sort last modified tests first.
      return tests .sort ((a, b) => Math .sign (fs .statSync (b .path) .mtime - fs .statSync (a .path) .mtime));
   }
}

module .exports = CustomTestSequencer;
