import t from 'tcomb-form-native/lib';
import React from "react"
import { View, Text, Switch, TextInput } from "react-native";
const idxRegex = /\[[0-9]+\]$/;
const imageUrlRegex = /^(http|https)(.+)(png|jpg|jpeg|webp|svg)$/

function jsonText(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var textboxStyle = stylesheet.textbox.normal;
  textboxStyle = {...textboxStyle};
  textboxStyle.height = undefined;
  var textboxViewStyle = stylesheet.textboxView.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.textbox.error;
    textboxStyle = {...textboxStyle};
    textboxStyle.height = undefined;
    textboxViewStyle = stylesheet.textboxView.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable;
    textboxStyle = {...textboxStyle};
    textboxStyle.height = undefined;
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
  var localObj = "";
  try{
    localObj = JSON.stringify(locals.value, null, 2);
  } catch(err){

  }
  return (
    <span>
    {label}
    <View style={formGroupStyle}>
      <View style={textboxViewStyle}>
        <TextInput
          accessibilityLabel={locals.label}
          ref="input"
          allowFontScaling={locals.allowFontScaling}
          autoCapitalize={locals.autoCapitalize}
          autoCorrect={locals.autoCorrect}
          autoFocus={locals.autoFocus}
          blurOnSubmit={locals.blurOnSubmit}
          editable={locals.editable}
          keyboardType={locals.keyboardType}
          maxLength={locals.maxLength}
          multiline={true}
          onBlur={locals.onBlur}
          onEndEditing={locals.onEndEditing}
          onFocus={locals.onFocus}
          onLayout={locals.onLayout}
          onSelectionChange={locals.onSelectionChange}
          onSubmitEditing={locals.onSubmitEditing}
          onContentSizeChange={locals.onContentSizeChange}
          placeholderTextColor={locals.placeholderTextColor}
          secureTextEntry={locals.secureTextEntry}
          selectTextOnFocus={locals.selectTextOnFocus}
          selectionColor={locals.selectionColor}
          numberOfLines={locals.numberOfLines || Math.max(Math.ceil(localObj.split("\n").length / 3), 8)}
          clearButtonMode={locals.clearButtonMode}
          clearTextOnFocus={locals.clearTextOnFocus}
          enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
          keyboardAppearance={locals.keyboardAppearance}
          onKeyPress={locals.onKeyPress}
          returnKeyType={locals.returnKeyType}
          selectionState={locals.selectionState}
          onChangeText={value => {
            var val = value;
            try{
              val = JSON.parse(value)
            }catch(err){

            }
            return locals.onChange(val);
          }}
          onChange={locals.onChangeNative}
          placeholder={locals.placeholder}
          style={textboxStyle}
          value={typeof(locals.value) === "string" ? locals.value : JSON.stringify(locals.value, null, 2)}
          testID={locals.testID}
          textContentType={locals.textContentType}
        />
      </View>
      {help}
      {error}
    </View></span>
  );
}

class JsonTextFactory extends t.form.Component{
  constructor(props){
    super(props);
  }

  getTemplate() {
    return jsonText;
  }
}

export const JsonText = t.subtype(t.Any, (src) => {

  try{
    if(typeof(src) === "string"){
      JSON.parse(src);
    }
    JSON.parse(JSON.stringify(src));
    return true;
  } catch(err){
    return false;
  }
});

JsonText.getTcombFormFactory = (options) => {
  return JsonTextFactory;
}

JsonText.getValidationErrorMessage = (l) => {
  return "Invalid Json";
}
