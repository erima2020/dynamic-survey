import React from "react";
import * as Survey from "survey-react";

const TYPE_NAME = "textwithbutton";

export class TextWithButtonModel extends Survey.Question {
  getType() {
    return TYPE_NAME;
  }
  get text() {
    return this.getPropertyValue("text", "");
  }
  set text(newValue) {
    this.setPropertyValue("text", newValue);
  }
  get url() {
    return this.getPropertyValue("url", "");
  }
  set url(newValue) {
    this.setPropertyValue("url", newValue);
  }
}

export class TextWithButton extends Survey.SurveyElementBase {
  state = {
    recorder: null,
    value: ''
  };
  get question() {
    return this.props.question;
  }
  handleOnChange = (e) => {
    this.setState({
      value: e.target.value
    })
    this.question.value = e.target.value
  }

  render() {
    if (!this.question) return null;
    const { text, cssClasses } = this.question;
    return (
      <div className={cssClasses.root}>
        <div>
          <b>{text}</b>
          <input onChange={this.handleOnChange} type='text' value = {this.state.value} />
        </div>
        <button onClick={() => {}}>Sumbit local</button>
      </div>
    );
  }
}

Survey.Serializer.addClass(
  TYPE_NAME,
  [{ name: "text" }, { name: "url" }, { name: "API_KEY" }],
  function () {
    return new TextWithButtonModel("");
  },
  "question"
);

Survey.ReactQuestionFactory.Instance.registerQuestion(TYPE_NAME, (props) => {
  return React.createElement(TextWithButton, props);
});
