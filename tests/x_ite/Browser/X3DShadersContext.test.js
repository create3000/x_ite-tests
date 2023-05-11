const X3D = require ("../../X3D")

test ("UnlitShader-material-texture", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   for (const geometry of ["0D", "1D", "2D", "3D"])
   {
      for (const texture of ["2D", "3D", "CUBE"])
      {
         for (const numTextureXXX of [1, 2])
         {
            const options = [ ]

            options .push ("X3D_UNLIT_MATERIAL");
            options .push (`X3D_GEOMETRY_${geometry}`);
            options .push ("X3D_FOG_LINEAR");
            options .push ("X3D_FOG_COORDS");
            options .push ("X3D_COLOR_MATERIAL");
            options .push ("X3D_NORMALS");
            options .push ("X3D_ALPHA_MODE_OPAQUE");
            options .push ("X3D_CLIP_PLANES")
            options .push ("X3D_NUM_CLIP_PLANES 1");
            options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
            options .push (`X3D_NUM_TEXTURE_PROJECTORS ${numTextureXXX}`);
            options .push ("X3D_STYLE_PROPERTIES");
            options .push ("X3D_MATERIAL_TEXTURES");
            options .push ("X3D_EMISSIVE_TEXTURE", `X3D_EMISSIVE_TEXTURE_${texture}`);
            options .push ("X3D_NORMAL_TEXTURE", `X3D_NORMAL_TEXTURE_${texture}`);
            options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${numTextureXXX}`);
            options .push (`X3D_NUM_TEXTURE_COORDINATES ${numTextureXXX}`);

            const shader = Browser .createShader ("UnlitShader", "Default", "Unlit", options);

            expect (shader .isValid ()) .toBe (true)
         }
      }
   }
})

test ("GouraudShader-material-texture", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   for (const geometry of ["0D", "1D", "2D", "3D"])
   {
      for (const texture of ["2D", "3D", "CUBE"])
      {
         for (const numTextureXXX of [1, 2])
         {
            const options = [ ]

            options .push ("X3D_MATERIAL");
            options .push (`X3D_GEOMETRY_${geometry}`);
            options .push ("X3D_FOG_LINEAR");
            options .push ("X3D_FOG_COORDS");
            options .push ("X3D_COLOR_MATERIAL");
            options .push ("X3D_NORMALS");
            options .push ("X3D_ALPHA_MODE_OPAQUE");
            options .push ("X3D_CLIP_PLANES")
            options .push ("X3D_NUM_CLIP_PLANES 1");
            options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
            options .push (`X3D_NUM_TEXTURE_PROJECTORS ${numTextureXXX}`);
            options .push ("X3D_STYLE_PROPERTIES");
            options .push ("X3D_MATERIAL_TEXTURES");
            options .push ("X3D_EMISSIVE_TEXTURE", `X3D_EMISSIVE_TEXTURE_${texture}`);
            options .push ("X3D_NORMAL_TEXTURE", `X3D_NORMAL_TEXTURE_${texture}`);
            options .push ("X3D_AMBIENT_TEXTURE", `X3D_AMBIENT_TEXTURE_${texture}`);
            options .push ("X3D_DIFFUSE_TEXTURE", `X3D_DIFFUSE_TEXTURE_${texture}`);
            options .push ("X3D_SPECULAR_TEXTURE", `X3D_SPECULAR_TEXTURE_${texture}`);
            options .push ("X3D_SHININESS_TEXTURE", `X3D_SHININESS_TEXTURE_${texture}`);
            options .push ("X3D_OCCLUSION_TEXTURE", `X3D_OCCLUSION_TEXTURE_${texture}`);
            options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${numTextureXXX}`);
            options .push (`X3D_NUM_TEXTURE_COORDINATES ${numTextureXXX}`);

            const shader = Browser .createShader ("GouraudShader", "Gouraud", "Gouraud", options);

            expect (shader .isValid ()) .toBe (true)
         }
      }
   }
})

test ("PhongShader-material-texture", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   for (const geometry of ["0D", "1D", "2D", "3D"])
   {
      for (const texture of ["2D", "3D", "CUBE"])
      {
         for (const numTextureXXX of [1, 2])
         {
            const options = [ ]

            options .push ("X3D_MATERIAL");
            options .push (`X3D_GEOMETRY_${geometry}`);
            options .push ("X3D_FOG_LINEAR");
            options .push ("X3D_FOG_COORDS");
            options .push ("X3D_COLOR_MATERIAL");
            options .push ("X3D_NORMALS");
            options .push ("X3D_ALPHA_MODE_OPAQUE");
            options .push ("X3D_CLIP_PLANES")
            options .push ("X3D_NUM_CLIP_PLANES 1");
            options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
            options .push (`X3D_NUM_TEXTURE_PROJECTORS ${numTextureXXX}`);
            options .push ("X3D_STYLE_PROPERTIES");
            options .push ("X3D_MATERIAL_TEXTURES");
            options .push ("X3D_EMISSIVE_TEXTURE", `X3D_EMISSIVE_TEXTURE_${texture}`);
            options .push ("X3D_NORMAL_TEXTURE", `X3D_NORMAL_TEXTURE_${texture}`);
            options .push ("X3D_AMBIENT_TEXTURE", `X3D_AMBIENT_TEXTURE_${texture}`);
            options .push ("X3D_DIFFUSE_TEXTURE", `X3D_DIFFUSE_TEXTURE_${texture}`);
            options .push ("X3D_SPECULAR_TEXTURE", `X3D_SPECULAR_TEXTURE_${texture}`);
            options .push ("X3D_SHININESS_TEXTURE", `X3D_SHININESS_TEXTURE_${texture}`);
            options .push ("X3D_OCCLUSION_TEXTURE", `X3D_OCCLUSION_TEXTURE_${texture}`);
            options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${numTextureXXX}`);
            options .push (`X3D_NUM_TEXTURE_COORDINATES ${numTextureXXX}`);

            const shader = Browser .createShader ("PhongShader", "Default", "Phong", options);

            expect (shader .isValid ()) .toBe (true)
         }
      }
   }
})

test ("PhysicalMaterialShader-material-texture", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   for (const geometry of ["0D", "1D", "2D", "3D"])
   {
      for (const texture of ["2D", "3D", "CUBE"])
      {
         for (const numTextureXXX of [1, 2])
         {
            const options = [ ]

            options .push ("X3D_PHYSICAL_MATERIAL", "MANUAL_SRGB");
            options .push (`X3D_GEOMETRY_${geometry}`);
            options .push ("X3D_FOG_LINEAR");
            options .push ("X3D_FOG_COORDS");
            options .push ("X3D_COLOR_MATERIAL");
            options .push ("X3D_NORMALS");
            options .push ("X3D_ALPHA_MODE_OPAQUE");
            options .push ("X3D_CLIP_PLANES")
            options .push ("X3D_NUM_CLIP_PLANES 1");
            options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
            options .push (`X3D_NUM_TEXTURE_PROJECTORS ${numTextureXXX}`);
            options .push ("X3D_STYLE_PROPERTIES");
            options .push ("X3D_MATERIAL_TEXTURES");
            options .push ("X3D_EMISSIVE_TEXTURE", `X3D_EMISSIVE_TEXTURE_${texture}`);
            options .push ("X3D_NORMAL_TEXTURE", `X3D_NORMAL_TEXTURE_${texture}`);
            options .push ("X3D_BASE_TEXTURE", `X3D_BASE_TEXTURE_${texture}`);
            options .push ("X3D_METALLIC_ROUGHNESS_TEXTURE", `X3D_METALLIC_ROUGHNESS_TEXTURE_${texture}`);
            options .push ("X3D_OCCLUSION_TEXTURE", `X3D_OCCLUSION_TEXTURE_${texture}`);
            options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${numTextureXXX}`);
            options .push (`X3D_NUM_TEXTURE_COORDINATES ${numTextureXXX}`);

            const shader = Browser .createShader ("PhysicalMaterialShader", "Default", "PBR", options);

            expect (shader .isValid ()) .toBe (true)
         }
      }
   }
})

test ("UnlitShader-texture", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   for (const geometry of ["0D", "1D", "2D", "3D"])
   {
      for (const texture of ["2D", "3D", "CUBE"])
      {
         for (const numTextureXXX of [1, 2])
         {
            const options = [ ]

            options .push ("X3D_UNLIT_MATERIAL");
            options .push (`X3D_GEOMETRY_${geometry}`);
            options .push ("X3D_FOG_LINEAR");
            options .push ("X3D_FOG_COORDS");
            options .push ("X3D_COLOR_MATERIAL");
            options .push ("X3D_NORMALS");
            options .push ("X3D_ALPHA_MODE_OPAQUE");
            options .push ("X3D_CLIP_PLANES")
            options .push ("X3D_NUM_CLIP_PLANES 1");
            options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
            options .push (`X3D_NUM_TEXTURE_PROJECTORS ${numTextureXXX}`);
            options .push ("X3D_STYLE_PROPERTIES");
            options .push ("X3D_TEXTURE");
            options .push ("X3D_MULTI_TEXTURING");
            options .push (`X3D_NUM_TEXTURES ${numTextureXXX}`);
            options .push (`X3D_TEXTURE0_${texture}`);
            options .push (`X3D_TEXTURE1_${texture}`);
            options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${numTextureXXX}`);
            options .push (`X3D_NUM_TEXTURE_COORDINATES ${numTextureXXX}`);

            const shader = Browser .createShader ("UnlitShader", "Default", "Unlit", options);

            expect (shader .isValid ()) .toBe (true)
         }
      }
   }
})

test ("GouraudShader-texture", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   for (const geometry of ["0D", "1D", "2D", "3D"])
   {
      for (const texture of ["2D", "3D", "CUBE"])
      {
         for (const numTextureXXX of [1, 2])
         {
            const options = [ ]

            options .push ("X3D_MATERIAL");
            options .push (`X3D_GEOMETRY_${geometry}`);
            options .push ("X3D_FOG_LINEAR");
            options .push ("X3D_FOG_COORDS");
            options .push ("X3D_COLOR_MATERIAL");
            options .push ("X3D_NORMALS");
            options .push ("X3D_ALPHA_MODE_OPAQUE");
            options .push ("X3D_CLIP_PLANES")
            options .push ("X3D_NUM_CLIP_PLANES 1");
            options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
            options .push (`X3D_NUM_TEXTURE_PROJECTORS ${numTextureXXX}`);
            options .push ("X3D_STYLE_PROPERTIES");
            options .push ("X3D_TEXTURE");
            options .push ("X3D_MULTI_TEXTURING");
            options .push (`X3D_NUM_TEXTURES ${numTextureXXX}`);
            options .push (`X3D_TEXTURE0_${texture}`);
            options .push (`X3D_TEXTURE1_${texture}`);
            options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${numTextureXXX}`);
            options .push (`X3D_NUM_TEXTURE_COORDINATES ${numTextureXXX}`);

            const shader = Browser .createShader ("GouraudShader", "Gouraud", "Gouraud", options);

            expect (shader .isValid ()) .toBe (true)
         }
      }
   }
})

test ("PhongShader-texture", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   for (const geometry of ["0D", "1D", "2D", "3D"])
   {
      for (const texture of ["2D", "3D", "CUBE"])
      {
         for (const numTextureXXX of [1, 2])
         {
            const options = [ ]

            options .push ("X3D_MATERIAL");
            options .push (`X3D_GEOMETRY_${geometry}`);
            options .push ("X3D_FOG_LINEAR");
            options .push ("X3D_FOG_COORDS");
            options .push ("X3D_COLOR_MATERIAL");
            options .push ("X3D_NORMALS");
            options .push ("X3D_ALPHA_MODE_OPAQUE");
            options .push ("X3D_CLIP_PLANES")
            options .push ("X3D_NUM_CLIP_PLANES 1");
            options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
            options .push (`X3D_NUM_TEXTURE_PROJECTORS ${numTextureXXX}`);
            options .push ("X3D_STYLE_PROPERTIES");
            options .push ("X3D_TEXTURE");
            options .push ("X3D_MULTI_TEXTURING");
            options .push (`X3D_NUM_TEXTURES ${numTextureXXX}`);
            options .push (`X3D_TEXTURE0_${texture}`);
            options .push (`X3D_TEXTURE1_${texture}`);
            options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${numTextureXXX}`);
            options .push (`X3D_NUM_TEXTURE_COORDINATES ${numTextureXXX}`);

            const shader = Browser .createShader ("PhongShader", "Default", "Phong", options);

            expect (shader .isValid ()) .toBe (true)
         }
      }
   }
})

test ("PhysicalMaterialShader-texture", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   for (const geometry of ["0D", "1D", "2D", "3D"])
   {
      for (const texture of ["2D", "3D", "CUBE"])
      {
         for (const numTextureXXX of [1, 2])
         {
            const options = [ ]

            options .push ("X3D_PHYSICAL_MATERIAL", "MANUAL_SRGB");
            options .push (`X3D_GEOMETRY_${geometry}`);
            options .push ("X3D_FOG_LINEAR");
            options .push ("X3D_FOG_COORDS");
            options .push ("X3D_COLOR_MATERIAL");
            options .push ("X3D_NORMALS");
            options .push ("X3D_ALPHA_MODE_OPAQUE");
            options .push ("X3D_CLIP_PLANES")
            options .push ("X3D_NUM_CLIP_PLANES 1");
            options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
            options .push (`X3D_NUM_TEXTURE_PROJECTORS ${numTextureXXX}`);
            options .push ("X3D_STYLE_PROPERTIES");
            options .push ("X3D_TEXTURE");
            options .push ("X3D_MULTI_TEXTURING");
            options .push (`X3D_NUM_TEXTURES ${numTextureXXX}`);
            options .push (`X3D_TEXTURE0_${texture}`);
            options .push (`X3D_TEXTURE1_${texture}`);
            options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${numTextureXXX}`);
            options .push (`X3D_NUM_TEXTURE_COORDINATES ${numTextureXXX}`);

            const shader = Browser .createShader ("PhysicalMaterialShader", "Default", "PBR", options);

            expect (shader .isValid ()) .toBe (true)
         }
      }
   }
})
