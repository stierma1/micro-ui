import t from 'tcomb-form-native/lib';
import React from "react"
import { View, Text, Switch, TextInput } from "react-native";
const idxRegex = /\[[0-9]+\]$/;

function href(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var textboxStyle = stylesheet.textbox.normal;
  var textboxViewStyle = stylesheet.textboxView.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.textbox.error;
    textboxViewStyle = stylesheet.textboxView.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable;
    textboxViewStyle = stylesheet.textboxView.notEditable;
  }

  var label = locals.label && !idxRegex.test(locals.label) ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;
  locals.value = locals.value || ""

  return (
    <span>
    <div><a href={locals.value}>{label || locals.value}</a></div>
    <View style={formGroupStyle}>
      {help}
      {error}
    </View></span>
  );
}

class HrefFactory extends t.form.Component{
  constructor(props){
    super(props);
  }

  getTemplate() {
      return imagePreview;
  }
}

export const Href = t.subtype(t.Str, (src) => {
  return src !== null && src !== "";
});

Href.getTcombFormFactory = (options) => {
  return HrefFactory;
}
