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
    this.upload = this.upload.bind(this);
    this.options = {};
    this.formSchema = null;
    this.value = null;
    this.target = window.location.href;
    this.method = "POST";
    fetch(window.location.href.replace(".html", ".json"))
      .then((response) => {
        return response.json();
      })
      .then(({options, formSchema, value, target, method}) => {
        this.formSchema = jsonToSchema(formSchema);
        this.options = options;
        this.value = value;
        this.target = target;
        this.method = method || "POST";
        this.forceUpdate();
      })
  }

  onSubmit(evt) {
    evt.preventDefault()
    const value = this.refs.form.getValue()
    var contentType = "json";
    if (value) {
        var fd = new FormData();
        for(var k in value){
          var v = value[k];
          if (v instanceof File) {
            contentType = "multipart";
            fd.append(k, v, v.name);
          } else {
            fd.append(k, v);
          }
        }
        if(contentType === "json"){
          this.upload(JSON.stringify(value), contentType);
        } else {
          this.upload(fd, contentType);
        }
    }
    if (value) {
      console.log(value)
    }
  }

  upload(fd, contentType) {
    fetch(this.target, {
      body: fd,
      headers: {
        "Content-Type": contentType === "json" ? "application/json" : undefined
      },
      method: this.method,
    }).then((resp) => {
      return resp.json();
    }).then(({redirect}) => {
      window.location.href = redirect;
    })

  }

  render()  {
    return this.formSchema !== null &&
      <form onSubmit={this.onSubmit}>
        <t.form.Form ref="form" type={this.formSchema} value={this.value} options={this.options} />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>

  }

}

ReactDOM.render(<App/>, document.getElementById("index"));
