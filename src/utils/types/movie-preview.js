import t from 'tcomb-form-native/lib';
import React from "react"
import { View, Text, Switch, TextInput } from "react-native";
const idxRegex = /\[[0-9]+\]$/;
const movieUrlRegex = /^(http|https)(.+)(mp4|ogg|webm)$/

function moviePreview(locals) {
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
    {label}
    {locals.value && movieUrlRegex.test(locals.value) && <div>
      <video width={locals.config.width || "100%"} height={locals.config.height || "auto"} controls>
        <source src={locals.value} type={"video/" + locals.value.split(".")[locals.value.split(".").length - 1]} />
        Your browser does not support the video tag.
    </video></div>}
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
          multiline={locals.multiline}
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
          numberOfLines={locals.numberOfLines}
          clearButtonMode={locals.clearButtonMode}
          clearTextOnFocus={locals.clearTextOnFocus}
          enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
          keyboardAppearance={locals.keyboardAppearance}
          onKeyPress={locals.onKeyPress}
          returnKeyType={locals.returnKeyType}
          selectionState={locals.selectionState}
          onChangeText={value => locals.onChange(value)}
          onChange={locals.onChangeNative}
          placeholder={locals.placeholder}
          style={textboxStyle}
          value={locals.value}
          testID={locals.testID}
          textContentType={locals.textContentType}
        />
      </View>
      {help}
      {error}
    </View></span>
  );
}

class MoviePreviewFactory extends t.form.Component{
  constructor(props){
    super(props);
  }

  getTemplate() {
      return moviePreview;
  }
}

export const MoviePreview = t.subtype(t.Str, (src) => {
  return movieUrlRegex.test(src)
});

MoviePreview.getTcombFormFactory = (options) => {
  return MoviePreviewFactory;
}

MoviePreview.getValidationErrorMessage = () => {
  return "Please provide a valid movie url";
}
