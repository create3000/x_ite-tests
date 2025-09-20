const X3D = require ("../../X3D");

test ("shader", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser;

   await Browser .loadComponents (Browser .getComponent ("HAnim"), Browser .getComponent ("X_ITE"));

   const shaders = [
      ["X3D_UNLIT_MATERIAL",               "UnlitShader",            "Default", "Unlit"],
      ["X3D_GOURAUD_MATERIAL",             "GouraudShader",          "Default", "Material"],
      ["X3D_PHONG_MATERIAL",               "PhongShader",            "Default", "Material"],
      ["X3D_MATERIAL_METALLIC_ROUGHNESS",  "PhysicalMaterialShader", "Default", "Physical"],
      ["X3D_VOLUME_SCATTER_PASS",          "PhysicalMaterialShader", "Default", "Physical"],
      ["X3D_MATERIAL_SPECULAR_GLOSSINESS", "SpecularGlossiness",     "Default", "SpecularGlossiness"],
   ];

   const fogs = [
      "X3D_FOG_COORDS",
      "X3D_FOG_LINEAR",
      "X3D_FOG_EXPONENTIAL",
      "X3D_FOG_NONE",
   ];

   let i = 0;

   for (const [option, name, vertex, fragment] of shaders)
   {
      for (const geometry of ["0D", "1D", "2D", "3D"])
      {
         for (const texture of ["2D", "3D", "CUBE"])
         {
            for (const numTextures of [1, 2])
            {
               for (const materialTexture of [true, false])
               {
                  const options = [ ]

                  if (option === "X3D_VOLUME_SCATTER_PASS")
                     options .push ("X3D_VOLUME_SCATTER_MATERIAL_EXT");

                  options .push (option);
                  options .push ("X3D_COLORSPACE_LINEAR_WHEN_PHYSICAL_MATERIAL");
                  options .push ("X3D_USE_IBL");
                  options .push ("X3D_LIGHTING", "X3D_NUM_LIGHTS 8");
                  options .push ("X3D_LOGARITHMIC_DEPTH_BUFFER");
                  options .push (`X3D_GEOMETRY_${geometry}`);
                  options .push (fogs [i % fogs .length]);

                  switch (option)
                  {
                     case "X3D_MATERIAL_METALLIC_ROUGHNESS":
                     case "X3D_MATERIAL_SPECULAR_GLOSSINESS":
                        options .push ("X3D_PHYSICAL_MATERIAL");
                        break;
                     case "X3D_VOLUME_SCATTER_PASS":
                        options .push ("X3D_MATERIAL_METALLIC_ROUGHNESS");
                        options .push ("X3D_PHYSICAL_MATERIAL");
                        break;
                  }

                  for (const o of [true, false])
                  {
                     if (o)
                     {
                        options .push ("X3D_COLOR_MATERIAL");
                        options .push ("X3D_NORMALS");
                        options .push ("X3D_TANGENTS");
                        options .push ("X3D_ALPHA_MODE_OPAQUE", "X3D_ALPHA_MODE_MASK");
                        options .push ("X3D_CLIP_PLANES");
                        options .push ("X3D_NUM_CLIP_PLANES 1");
                        options .push ("X3D_TEXTURE_PROJECTION");
                        options .push (`X3D_NUM_TEXTURE_PROJECTORS ${numTextures}`);
                        options .push ("X3D_STYLE_PROPERTIES");
                        options .push ("X3D_SKINNING", "X3D_NUM_JOINT_SETS 2", "X3D_NUM_DISPLACEMENTS 2");

                        if (option === "X3D_MATERIAL_METALLIC_ROUGHNESS")
                        {
                           options .push ("X3D_ANISOTROPY_MATERIAL_EXT");
                           options .push ("X3D_CLEARCOAT_MATERIAL_EXT");
                           options .push ("X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT");
                           options .push ("X3D_DISPERSION_MATERIAL_EXT");
                           options .push ("X3D_EMISSIVE_STRENGTH_MATERIAL_EXT");
                           options .push ("X3D_IOR_MATERIAL_EXT");
                           options .push ("X3D_IRIDESCENCE_MATERIAL_EXT");
                           options .push ("X3D_SHEEN_MATERIAL_EXT");
                           options .push ("X3D_SPECULAR_MATERIAL_EXT");
                           options .push ("X3D_TRANSMISSION_MATERIAL_EXT");
                           options .push ("X3D_VOLUME_MATERIAL_EXT");
                           options .push ("X3D_VOLUME_SCATTER_MATERIAL_EXT");
                           options .push ("X3D_SCATTER_SAMPLES_COUNT_EXT 16");
                        }
                     }

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
                        options .push (`X3D_NUM_TEXTURES ${numTextures}`);
                        options .push (`X3D_TEXTURE0_${texture}`);
                        options .push (`X3D_TEXTURE1_${texture}`);
                     }

                     options .push (`X3D_NUM_TEXTURE_TRANSFORMS ${numTextures}`);
                     options .push (`X3D_NUM_TEXTURE_COORDINATES ${numTextures}`);

                     const shader = Browser .createShader (name, vertex, fragment, options);

                     console .log (option, geometry, texture, numTextures, materialTexture, o);

                     expect (shader .isValid ()) .toBe (true);

                     ++ i;
                  }
               }
            }
         }
      }
   }
});
