import { expect, test } from "vitest";
import X3D              from "../X3D.js";
import $                from "https://cdn.jsdelivr.net/npm/jquery@4.0.0/dist-module/jquery.slim.module.js";

test .concurrent ("construction", () =>
{
   const canvas = document .createElement ("x3d-canvas");

   expect (canvas) .toBeInstanceOf (X3D .X3DCanvasElement);
   expect (canvas .nodeName) .toBe ("X3D-CANVAS");
   expect (canvas .browser) .toBeInstanceOf (X3D .X3DBrowser);
   expect (canvas .toString ()) .toBe ("[object X3DCanvasElement]");

   const scene = canvas .browser .currentScene;

   expect (scene) .toBeInstanceOf (X3D .X3DScene);
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext);
   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/);
   expect (scene .encoding) .toBe ("SCRIPTED");
   expect (scene .profile) .toBe (null);
   expect (scene .components) .toHaveLength (0);
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray);
   expect (scene .worldURL) .toMatch (/^http:\/\/.*$/);
   expect (scene .rootNodes) .toHaveLength (0);
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode);
   expect (scene .protos) .toHaveLength (0);
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray);
   expect (scene .externprotos) .toHaveLength (0);
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray);
   expect (scene .routes) .toHaveLength (0);
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray);
});

test .concurrent ("construction-jquery", () =>
{
   const
      elements = $("<x3d-canvas></x3d-canvas>"),
      canvas   = elements [0];

   expect (elements) .toHaveLength (1);
   expect (canvas) .toBeInstanceOf (X3D .X3DCanvasElement);
   expect (canvas .nodeName) .toBe ("X3D-CANVAS");
   expect (canvas .browser) .toBeInstanceOf (X3D .X3DBrowser);
});

test .concurrent ("onload-listener", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas [0] .addEventListener ("load", function (event)
   {
      try
      {
         expect (event .type) .toBe ("load");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });

   canvas [0] .addEventListener ("error", () => reject ("onerror"));
}));

test .concurrent ("onload-event", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas .on ("load", function (event)
   {
      try
      {
         expect (event .type) .toBe ("load");
         expect (event .originalEvent) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });

   canvas .on ("error", () => reject ("onerror"));
}));

test .concurrent ("onload-property", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas [0] .onload = function (event)
   {
      try
      {
         expect (event .type) .toBe ("load");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   };

   canvas [0] .onerror = reject;
}));

test .concurrent ("oninitialized-listener", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas [0] .addEventListener ("initialized", function (event)
   {
      try
      {
         expect (event .type) .toBe ("initialized");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });

   canvas [0] .addEventListener ("error", () => reject ("onerror"));
}));

test .concurrent ("oninitialized-event", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas .on ("initialized", function (event)
   {
      try
      {
         expect (event .type) .toBe ("initialized");
         expect (event .originalEvent) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });

   canvas .on ("error", () => reject ("onerror"));
}));

test .concurrent ("oninitialized-property", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas [0] .oninitialized = function (event)
   {
      try
      {
         expect (event .type) .toBe ("initialized");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   };

   canvas [0] .onerror = reject;
}));

test .concurrent ("onshutdown-listener", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas [0] .addEventListener ("shutdown", function (event)
   {
      try
      {
         expect (event .type) .toBe ("shutdown");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });

   canvas [0] .addEventListener ("error", () => reject ("onerror"));
}));

test .concurrent ("onshutdown-event", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas .on ("shutdown", function (event)
   {
      try
      {
         expect (event .type) .toBe ("shutdown");
         expect (event .originalEvent) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });

   canvas .on ("error", () => reject ("onerror"));
}));

test .concurrent ("onshutdown-property", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .html (`<X3D profile='Interchange' version='4.0'><Scene></Scene></X3D>`);

   canvas [0] .onshutdown = function (event)
   {
      try
      {
         expect (event .type) .toBe ("shutdown");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   };

   canvas [0] .onerror = reject;
}));

test .concurrent ("onerror-listener", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .attr ("src", "https://www.example.com/does-not-exist");

   canvas [0] .addEventListener ("initialized", () => reject ("onerror"));
   canvas [0] .addEventListener ("error", function (event)
   {
      try
      {
         expect (event .type) .toBe ("error");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });
}));

test .concurrent ("onerror-event", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .attr ("src", "https://www.example.com/does-not-exist");

   canvas .on ("initialized", () => reject ("onerror"));
   canvas .on ("error", function (event)
   {
      try
      {
         expect (event .type) .toBe ("error");
         expect (event .originalEvent) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   });
}));

test .concurrent ("onerror-property", () => new Promise ((resolve, reject) =>
{
   const canvas = $(`<x3d-canvas></x3d-canvas>`);

   canvas .attr ("src", "https://www.example.com/does-not-exist");

   canvas [0] .oninitialized = reject;
   canvas [0] .onerror = function (event)
   {
      try
      {
         expect (event .type) .toBe ("error");
         expect (event) .toBeInstanceOf (CustomEvent);
         expect (this) .toBe (canvas [0]);
         resolve ();
      }
      catch (error)
      {
         reject (error .message);
      }
   };
}));
