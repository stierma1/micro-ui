import '../src/index.css';
import React from "react";
import {StyleSheet} from "react-native"
import ReactDOM from "react-dom";
import t from 'tcomb-form-native'
import {Positive, Negative, Range} from './utils/types'
import jsonToSchema from './utils/json-to-schema'

const Index = () => {
  return <div>Hello React!</div>;
};

/*
const FormSchema =
  jsonToSchema({
    "name": "t.Str",
    "age": "t.maybe(t.Num)",
    "favoriteNumber": "Range([1, 10, false, true])",
    "rememberMe": "t.Boolean",
    "upload":"t.list(t.UploadFile)",
    "images": "t.list(t.ImagePreview)",
    "movie": "t.MoviePreview"
  })
*/

class App extends React.Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.options = {};
    this.formSchema = null;
    fetch(window.location.href.replace(".html", ".json"))
      .then((response) => {
        return response.json();
      })
      .then(({options, formSchema}) => {
        this.formSchema = jsonToSchema(formSchema);
        this.options = options;
        this.forceUpdate();
      })
  }

  onSubmit(evt) {
    evt.preventDefault()
    const value = this.refs.form.getValue()
    if (value) {
      console.log(value)
    }
  }

  render()  {
    return this.formSchema !== null &&
      <form onSubmit={this.onSubmit}>
        <t.form.Form ref="form" type={this.formSchema} options={this.options} />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>

  }

}

ReactDOM.render(<App/>, document.getElementById("index"));
