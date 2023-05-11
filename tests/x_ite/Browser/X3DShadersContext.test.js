const X3D = require ("../../X3D")

test ("shader", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   const shaders = [
      ["X3D_UNLIT_MATERIAL", "UnlitShader", "Default", "Unlit"],
      ["X3D_MATERIAL", "GouraudShader", "Gouraud", "Gouraud"],
      ["X3D_MATERIAL", "PhongShader", "Default", "Phong"],
      ["X3D_PHYSICAL_MATERIAL", "PhysicalMaterialShader", "Default", "PBR"],
   ]

   const fogs = [
      "X3D_FOG_COORDS",
      "X3D_FOG_LINEAR",
      "X3D_FOG_EXPONENTIAL",
      "X3D_FOG_NONE",
   ]

   let i = 0;

   for (const [option, name, vertex, fragment] of shaders)
   {
      for (const geometry of ["0D", "1D", "2D", "3D"])
      {
         for (const texture of ["2D", "3D", "CUBE"])
         {
            for (const numTextureXXX of [1, 2])
            {
               for (const materialTexture of [true, false])
               {
                  const options = [ ]

                  options .push (option)
                  options .push ("MANUAL_SRGB")
                  options .push ("X3D_LOGARITHMIC_DEPTH_BUFFER");
                  options .push (`X3D_GEOMETRY_${geometry}`);
                  options .push (fogs [i % fogs .length]);
                  options .push ("X3D_COLOR_MATERIAL");
                  options .push ("X3D_NORMALS");
                  options .push ("X3D_ALPHA_MODE_OPAQUE", "X3D_ALPHA_MODE_MASK");
                  options .push ("X3D_CLIP_PLANES")
                  options .push ("X3D_NUM_CLIP_PLANES 1");
                  options .push ("X3D_PROJECTIVE_TEXTURE_MAPPING")
                  options .push (`X3D_NUM_TEXTURE_PROJECTORS ${numTextureXXX}`);
                  options .push ("X3D_STYLE_PROPERTIES");

                  if (materialTexture)
                  {
                     options .push ("X3D_MATERIAL_TEXTURES");
                     options .push ("X3D_EMISSIVE_TEXTURE", `X3D_EMISSIVE_TEXTURE_${texture}`);
                     options .push ("X3D_NORMAL_TEXTURE", `X3D_NORMAL_TEXTURE_${texture}`);

                     options .push ("X3D_AMBIENT_TEXTURE", `X3D_AMBIENT_TEXTURE_${texture}`);
                     options .push ("X3D_DIFFUSE_TEXTURE", `X3D_DIFFUSE_TEXTURE_${texture}`);
                     options .push ("X3D_SPECULAR_TEXTURE", `X3D_SPECULAR_TEXTURE_${texture}`);
                     options .push ("X3D_SHININESS_TEXTURE", `X3D_SHININESS_TEXTURE_${texture}`);
                     
                     options .push ("X3D_OCCLUSION_TEXTURE", `X3D_OCCLUSION_TEXTURE_${texture}`);

                     options .push ("X3D_BASE_TEXTURE", `X3D_BASE_TEXTURE_${texture}`);
                     options .push ("X3D_METALLIC_ROUGHNESS_TEXTURE", `X3D_METALLIC_ROUGHNESS_TEXTURE_${texture}`);
                  }
                  else
                  {
                     options .push ("X3D_TEXTURE");
                     options .push ("X3D_MULTI_TEXTURING");
                     options .push (`X3D_NUM_TEXTURES ${numTextureXXX}`);
                     options .push (`X3D_TEXTURE0_${texture}`);
                     options .push (`X3D_TEXTURE1_${texture}`);
                  }

                  options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${numTextureXXX}`);
                  options .push (`X3D_NUM_TEXTURE_COORDINATES ${numTextureXXX}`);

                  const shader = Browser .createShader (name, vertex, fragment, options);

                  expect (shader .isValid ()) .toBe (true)

                  ++ i;
               }
            }
         }
      }
   }
})
