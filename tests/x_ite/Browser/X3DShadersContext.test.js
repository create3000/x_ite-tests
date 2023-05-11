const X3D = require ("../../X3D")

test ("UnlitShader", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser,
      options = [ ]

   options .push ("X3D_UNLIT_MATERIAL");

   const shader = Browser .createShader ("UnlitShader", "Default", "Unlit", options);

   expect (shader .isValid ()) .toBe (true)
})

test ("GouraudShader", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser,
      options = [ ]

   options .push ("X3D_MATERIAL");
   options .push (`X3D_GEOMETRY_3D`);
   options .push ("X3D_FOG_LINEAR");
   options .push ("X3D_FOG_COORDS");
   options .push ("X3D_COLOR_MATERIAL");
   options .push ("X3D_NORMALS");
   options .push ("X3D_ALPHA_MODE_OPAQUE");
   options .push ("X3D_CLIP_PLANES")
   options .push ("X3D_NUM_CLIP_PLANES 1");
   options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
   options .push ("X3D_NUM_TEXTURE_PROJECTORS 1");
   options .push ("X3D_STYLE_PROPERTIES");
   options .push ("X3D_MATERIAL_TEXTURES");
   options .push ("X3D_EMISSIVE_TEXTURE", "X3D_EMISSIVE_TEXTURE_2D");
   options .push ("X3D_NORMAL_TEXTURE", "X3D_NORMAL_TEXTURE_2D");
   options .push ("X3D_AMBIENT_TEXTURE", "X3D_AMBIENT_TEXTURE_2D");
   options .push ("X3D_DIFFUSE_TEXTURE", "X3D_DIFFUSE_TEXTURE_2D");
   options .push ("X3D_SPECULAR_TEXTURE", "X3D_SPECULAR_TEXTURE_2D");
   options .push ("X3D_SHININESS_TEXTURE", "X3D_SHININESS_TEXTURE_2D");
   options .push ("X3D_OCCLUSION_TEXTURE", "X3D_OCCLUSION_TEXTURE_2D");
   options .push ("X3D_NUM_TEXTURE_TRANSFORMS 1");
   options .push ("X3D_NUM_TEXTURE_COORDINATES 1");

   const shader = Browser .createShader ("GouraudShader", "Gouraud", "Gouraud", options);

   expect (shader .isValid ()) .toBe (true)
})

test ("PhongShader", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser,
      options = [ ]

   options .push ("X3D_MATERIAL");
   options .push (`X3D_GEOMETRY_3D`);
   options .push ("X3D_FOG_LINEAR");
   options .push ("X3D_FOG_COORDS");
   options .push ("X3D_COLOR_MATERIAL");
   options .push ("X3D_NORMALS");
   options .push ("X3D_ALPHA_MODE_OPAQUE");
   options .push ("X3D_CLIP_PLANES")
   options .push ("X3D_NUM_CLIP_PLANES 1");
   options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
   options .push ("X3D_NUM_TEXTURE_PROJECTORS 1");
   options .push ("X3D_STYLE_PROPERTIES");
   options .push ("X3D_MATERIAL_TEXTURES");
   options .push ("X3D_EMISSIVE_TEXTURE", "X3D_EMISSIVE_TEXTURE_2D");
   options .push ("X3D_NORMAL_TEXTURE", "X3D_NORMAL_TEXTURE_2D");
   options .push ("X3D_AMBIENT_TEXTURE", "X3D_AMBIENT_TEXTURE_2D");
   options .push ("X3D_DIFFUSE_TEXTURE", "X3D_DIFFUSE_TEXTURE_2D");
   options .push ("X3D_SPECULAR_TEXTURE", "X3D_SPECULAR_TEXTURE_2D");
   options .push ("X3D_SHININESS_TEXTURE", "X3D_SHININESS_TEXTURE_2D");
   options .push ("X3D_OCCLUSION_TEXTURE", "X3D_OCCLUSION_TEXTURE_2D");
   options .push ("X3D_NUM_TEXTURE_TRANSFORMS 1");
   options .push ("X3D_NUM_TEXTURE_COORDINATES 1");

   const shader = Browser .createShader ("PhongShader", "Default", "Phong", options);

   expect (shader .isValid ()) .toBe (true)
})

test ("PhysicalMaterialShader", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser,
      options = [ ]

   options .push ("X3D_PHYSICAL_MATERIAL", "MANUAL_SRGB");
   options .push (`X3D_GEOMETRY_3D`);
   options .push ("X3D_FOG_LINEAR");
   options .push ("X3D_FOG_COORDS");
   options .push ("X3D_COLOR_MATERIAL");
   options .push ("X3D_NORMALS");
   options .push ("X3D_ALPHA_MODE_OPAQUE");
   options .push ("X3D_CLIP_PLANES")
   options .push ("X3D_NUM_CLIP_PLANES 1");
   options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
   options .push ("X3D_NUM_TEXTURE_PROJECTORS 1");
   options .push ("X3D_STYLE_PROPERTIES");
   options .push ("X3D_MATERIAL_TEXTURES");
   options .push ("X3D_EMISSIVE_TEXTURE", "X3D_EMISSIVE_TEXTURE_2D");
   options .push ("X3D_NORMAL_TEXTURE", "X3D_NORMAL_TEXTURE_2D");
   options .push ("X3D_BASE_TEXTURE", "X3D_BASE_TEXTURE_2D");
   options .push ("X3D_METALLIC_ROUGHNESS_TEXTURE", "X3D_METALLIC_ROUGHNESS_TEXTURE_2D");
   options .push ("X3D_OCCLUSION_TEXTURE", "X3D_OCCLUSION_TEXTURE_2D");
   options .push ("X3D_NUM_TEXTURE_TRANSFORMS 1");
   options .push ("X3D_NUM_TEXTURE_COORDINATES 1");

   const shader = Browser .createShader ("PhysicalMaterialShader", "Default", "PBR", options);

   expect (shader .isValid ()) .toBe (true)
})
