
import t from "./types"

const enumRegEx = /^t\.enums\((.+), *\"([A-Za-z0-9_\- :;,!$%&#@+=<>^?\.|\\\/\']+)\" *\)$/
const listRegEx = /^t\.list\((.*)\)$/;
const maybeRegEx = /^t\.maybe\((.*)\)$/;
const funcTypeRegex = /^([^/(]+)\((.*)\)$/;

function jsonToSchema(json, structs){
  if(json === "t.Str" || json === "t.String"){
    return t.Str;
  }
  if(json === "t.Num" || json === "t.Number"){
    return t.Num;
  }
  if(json === "t.Boolean" || json === "t.Bool"){
    return t.Boolean;
  }
  if(json === "t.Date"){
    return t.Date;
  }
  if(json === "t.UploadFile"){
    return t.UploadFile;
  }
  if(json === "t.ImagePreview"){
    return t.ImagePreview;
  }
  if(json === "t.MoviePreview"){
    return t.MoviePreview;
  }
  if(listRegEx.test(json)){
    let [moreCrap, listType] = listRegEx.exec(json);
    return t.list(jsonToSchema(listType));
  }
  if(enumRegEx.test(json)){
    let [crap, enums, name] = enumRegEx.exec(json);
    return t.enums(JSON.parse(enums), name);
  }
  if(maybeRegEx.test(json)){
    let [moreCrap, optionalType] = maybeRegEx.exec(json);
    return t.maybe(jsonToSchema(optionalType));
  }
  if(typeof(json) === "string"){

    if(funcTypeRegex.test(json)){
      let [moCrap, typeName, args] = funcTypeRegex.exec(json);
      return t[typeName] ? t[typeName].apply(t[typeName], JSON.parse(args)) : structs[typeName].apply(structs[typeName], JSON.parse(args));
    }
    return t[json] ? t[json] : structs[json];
  }
  if(typeof(json) === "object"){
    let object = {};
    for(let key in json){
      object[key] = jsonToSchema(json[key]);
    }
    return t.struct(object);
  }
}

export default jsonToSchema;
