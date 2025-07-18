#!/usr/bin/perl
use v5.10.0;
use utf8;
use open qw/:std :utf8/;

use Cwd;
use Array::Utils qw(array_diff);

sub node {
   $filename = shift;
   chomp $filename;

   $filename =~ m|([^/]+)/([^/]+)\.js$|o;

   $componentName = $1;
   $typeName      = $2;

   return if $componentName =~ /^Annotation$/o;
   return if $typeName =~ /^X3D/o;

   #return unless $typeName =~ /^Transform$/o;
   # say "$componentName $typeName";

   $md     = "$cwd/../x_ite/docs/_posts/components/$componentName/$typeName.md";
   $file   = `cat $md`;
   $source = `cat $filename`;

   return say "$componentName $typeName no 'See Also' section." unless $file =~ /## See Also/s;
   return say "$componentName $typeName no spec section." unless $file =~ /node is still \*\*experimental\*\*/ || $file =~ /X3D Specification of/s;

   @fields       = $file   =~ /###\s*[SM]F\w+.*/go;
   @sourceFields = $source =~ /\bX3DFieldDefinition\s*\(.*/go;

   say "$typeName fields (" . scalar (@fields) . ") <-> source fields (" . scalar (@sourceFields) . ")" unless @fields == @sourceFields;

   field ($_, $source) foreach @fields;

   @fields       = map { /\*\*(.*?)\*\*/o; $_ = $1 } @fields;
   @sourceFields = map { /"(.*?)"/o; $_ = $1 } @sourceFields;
   @difference   = array_diff (@fields, @sourceFields);

   return say "$componentName $typeName fields do no match (" . join (", ", @difference) . ")" if @difference;

   unless ("@fields" eq "@sourceFields")
   {
      say "$componentName $typeName fields are not in the right order.";
      # say "@fields\n@sourceFields" if $typeName eq "Transform";
      return;
   }
}

sub field {
   $field  = shift;
   $source = shift;

   #say $field;

   $field =~ /###\s*(\w+)\s*\[(.*?)\]\s*\*\*(\w+)\*\*\s*(.*?)(?:\s*<|$)/o;

   $type       = $1;
   $accessType = $2;
   $name       = $3;
   $value      = $4;

   $source =~ /X3DFieldDefinition\s*\(X3DConstants\s*\.(\w+),\s*"$name",\s*new\s+Fields\s*\.(\w+)\s*\((.*?)\)\),(\s*\/\/\s*(?:experimental|skip test))?/;

   $codeAccessType = $1;
   $codeType       = $2;
   $codeValue      = $3;
   $skip           = $4;

   return if $skip;

   $accessTypes = {
      " " => "initializeOnly",
      "in" => "inputOnly",
      "out" => "outputOnly",
      "in, out" => "inputOutput",
   };

   say "$typeName $name '$accessType' <-> '$codeAccessType'" unless $accessTypes -> {$accessType} eq $codeAccessType;
   say "$typeName $name '$type' <-> '$codeType'" unless $type eq $codeType;

   return if $accessType eq "in";
   return if $accessType eq "out";

   if ($type eq "SFBool")
   {
      return if $value eq "TRUE"  && $codeValue eq "true";
      return if $value eq "FALSE" && $codeValue eq "";
   }
   elsif ($type eq "SFColor")
   {
      return if $value eq "0 0 0"       && $codeValue eq "";
      return if $value eq "1 1 1"       && $codeValue eq "1, 1, 1";
      return if $value eq "0.8 0.8 0.8" && $codeValue eq "0.8, 0.8, 0.8";
   }
   elsif ($type eq "SFColorRGBA")
   {
      $value =~s /(\s)/,$1/sgo;

      return if ($value eq "0, 0, 0, 0" && $codeValue eq "") != ($value eq $codeValue);
   }
   elsif ($type eq "SFDouble")
   {
      $codeValue =~ s/_//g;

      return if $value eq "0" && $codeValue eq "";
      return if $value eq $codeValue;
   }
   elsif ($type eq "SFFloat")
   {
      $codeValue =~ s/_//g;

      return if $value eq "0" && $codeValue eq "";
      return if $value eq $codeValue;
      return if $value eq "π*3/16" && $codeValue eq "0.589049";
      return if $value eq "π/2" && $codeValue eq "1.570796";
      return if $value eq "π/4" && $codeValue eq "0.785398";
      return if $value eq "π" && $codeValue eq "3.141592653";
      return if $value eq "-π" && $codeValue eq "-3.141592653";
   }
   elsif ($type eq "SFImage")
   {
      $value =~s /(\s)/,$1/sgo;

      return if $value eq "0, 0, 0" && $codeValue eq "";
   }
   elsif ($type eq "SFInt32")
   {
      $codeValue =~ s/_//g;

      return if $value eq "0" && $codeValue eq "";
      return if $value eq $codeValue;
   }
   elsif ($type =~ /^(?:SFMatrix3d|SFMatrix3f)$/o)
   {
      $value =~s /(\s)/,$1/sgo;

      return if $value eq "1, 0, 0, 0, 1, 0, 0, 0, 1" && $codeValue eq "";
   }
   elsif ($type =~ /^(?:SFMatrix4d|SFMatrix4f)$/o)
   {
      $value =~ s/(\s)/,$1/sgo;

      return if $value eq "1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1" && $codeValue eq "";
   }
   elsif ($type eq "SFNode")
   {
      return if $value eq "NULL" && $codeValue eq "";
   }
   elsif ($type eq "SFRotation")
   {
      $codeValue =~ s/,//sgo;

      return if $value eq "0 0 1 0" && $codeValue eq "";
      return if $value eq $codeValue;
   }
   elsif ($type eq "SFString")
   {
      return if $value eq "\"\"" && $codeValue eq "";
      return if $value eq $codeValue;
   }
   elsif ($type eq "SFTime")
   {
      return if $value eq "-1" && $codeValue eq "";
      return if $value eq $codeValue;
   }
   elsif ($type =~ /^(?:SFVec2d|SFVec2f)$/o)
   {
      $value =~s /(\s)/,$1/sgo;

      return if $value eq "0, 0" && $codeValue eq "";
      return if $value eq $codeValue;
   }
   elsif ($type =~ /^(?:SFVec3d|SFVec3f)$/o)
   {
      $value =~s /(\s)/,$1/sgo;

      return if $value eq "0, 0, 0" && $codeValue eq "";
      return if $value eq $codeValue;
   }
   elsif ($type =~ /^(?:SFVec4d|SFVec4f)$/o)
   {
      $value =~s /(\s)/,$1/sgo;

      return if $value eq "0, 0, 0, 1" && $codeValue eq "";
      return if $value eq $codeValue;
   }
   elsif ($type eq "MFBool")
   {
      return if $value eq "[ ]" && $codeValue eq "";
   }
   elsif ($type eq "MFColor")
   {
      return if $value eq "[ ]" && $codeValue eq "";
      return if $value eq "0 0 0" && $codeValue eq "new Color3 ()";
   }
   elsif ($type eq "MFColorRGBA")
   {
      return if $value eq "[ ]" && $codeValue eq "";
   }
   elsif ($type eq "MFDouble")
   {
      return if $value eq "[ ]" && $codeValue eq "";
      return if $value eq "[ 0, 0 ]" && $codeValue eq "0, 0";
   }
   elsif ($type eq "MFFloat")
   {
      return if $value eq "[ ]" && $codeValue eq "";
      return if $value eq "[ $codeValue ]";
   }
   elsif ($type eq "MFImage")
   {
      return if $value eq "[ ]" && $codeValue eq "";
   }
   elsif ($type eq "MFInt32")
   {
      return if $value eq "[ ]" && $codeValue eq "";
      return if $value eq "[ $codeValue ]";
      return if $value =~ /^[+-]?\d+$/ && $value eq $codeValue;
   }
   elsif ($type =~ /^(?:MFMatrix3d|MFMatrix3f)$/o)
   {
      return if $value eq "[ ]" && $codeValue eq "";
   }
   elsif ($type =~ /^(?:MFMatrix4d|MFMatrix4f)$/o)
   {
      return if $value eq "[ ]" && $codeValue eq "";
   }
   elsif ($type eq "MFNode")
   {
      return if $value eq "[ ]" && $codeValue eq "";
   }
   elsif ($type eq "MFRotation")
   {
      return if $value eq "[ ]" && $codeValue eq "";
      return if $value eq "0 0 1 0" && $codeValue eq "new Rotation4 ()";
   }
   elsif ($type eq "MFString")
   {
      return if $value eq "[ ]" && $codeValue eq "";
      return if $value eq "[ $codeValue ]";
      return if $value =~ /^"\w+"+$/o && $value eq $codeValue;
   }
   elsif ($type eq "MFTime")
   {
      return if $value eq "[ ]" && $codeValue eq "";
   }
   elsif ($type =~ /^(?:MFVec2d|MFVec2f)$/o)
   {
      $codeValue =~ s/Vector2 \((\d+)\)/Vector2 (\1, \1)/g;

      return if $value eq "[ ]" && $codeValue eq "";
      return if $value eq "[ 1 1, 1 -1, -1 -1, -1 1, 1 1 ]" && $codeValue eq "new Vector2 (1, 1), new Vector2 (1, -1), new Vector2 (-1, -1), new Vector2 (-1, 1), new Vector2 (1, 1)";
      return if $value eq "1 1" && $codeValue eq "new Vector2 (1, 1)";
   }
   elsif ($type =~ /^(?:MFVec3d|MFVec3f)$/o)
   {
      return if $value eq "[ ]" && $codeValue eq "";
      return if $value eq "0 0 0" && $codeValue eq "new Vector3 ()";
      return if $value eq "[ 0 0 0, 0 1 0 ]" && $codeValue eq "new Vector3 (), new Vector3 (0, 1, 0)";
   }
   elsif ($type =~ /^(?:MFVec4d|MFVec4f)$/o)
   {
      return if $value eq "[ ]" && $codeValue eq "";
   }

   say "$typeName $name '$value' <-> '$codeValue'";
}

$cwd = getcwd ();

node $_ foreach sort `find $cwd/../x_ite/src/x_ite/Components -type f -mindepth 2`;

say "Test done.";
