import t from 'tcomb-form-native/lib';
import React from "react"
import { View, Text, Switch, TextInput } from "react-native";
const idxRegex = /\[[0-9]+\]$/;

function fileupload(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  var valueRender = "";

  return (
    //cx(formGroupClasses)
    <View style={formGroupStyle}>

      {/* add a label if specified */}
      {locals.label && !idxRegex.test(locals.label) ? <Text style={controlLabelStyle}>{locals.label}</Text>: null}


      <input
        disabled={locals.disabled}
        className="form-control"
        name={locals.name}
        placeholder={locals.placeholder}
        onChange={function (evt) {
          locals.onChange(evt.target.files[0]);
        }}
        type="file"
        />


      {/* add an error if specified */}
      {locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text> : null}

      {/* add a help if specified */}
      {locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null}

    </View>
  );
}

class UploadFileFactory extends t.form.Component{
  constructor(props){
    super(props);
  }

  getTemplate() {
      return fileupload;
  }
}

export const UploadFile = t.irreducible("File", (x) => {
  return x instanceof File;
})

UploadFile.getTcombFormFactory = (options) => {
  return UploadFileFactory;
}

UploadFile.getValidationErrorMessage = () => {
  return "Please select a file";
}
