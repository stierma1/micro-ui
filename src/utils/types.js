import t from 'tcomb-form-native/lib';
import React from "react"
import { View, Text, Switch, TextInput } from "react-native";
import types from "./types/index";

const idxRegex = /\[[0-9]+\]$/;
export const Positive = t.subtype(t.Num, (n) => {
  return n >= 0;
});

Positive.getValidationErrorMessage = () => {
  return "Number must be great than or equal to 0"
}

export const Negative = t.subtype(t.Num, (n) => {
  return n < 0;
});

Negative.getValidationErrorMessage = () => {
  return "Number must be less than 0"
}

export const Range = (low, high, lowInclusive, highInclusive) => {
  const range = t.subtype(t.Num, (n) => {
    return (n > low || (n >= low && lowInclusive)) && (n < high || (n <= high && highInclusive));
  });

  range.getValidationErrorMessage = () => {
    return `Number must be in the range ${lowInclusive ? "[" : "("}${low},${high}${highInclusive ? "]" : ")"}`;
  }
  return range;
};

export const RegexedString = (regex, errorMessage) => {
  const regexStr = t.subtype(t.Str, (n) => {
    return regex.test(n)
  });

  regexStr.getValidationErrorMessage = () => {
    return errorMessage;
  }
  return regexStr;
};

export const JsonText = t.subtype(t.Any, (n) => {
  try{
    JSON.parse(n);
    return true;
  } catch(err){
    return false;
  }
});

JsonText.getValidationErrorMessage = () => {
  return "Invalid JSON"
}

export default {...t, Positive, Negative, RegexedString, Range, JsonText, ...types};
