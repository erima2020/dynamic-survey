import React from "react";
import * as Survey from "survey-react";

const TYPE_NAME = "server-random-id";

export class ServerRandomIdModel extends Survey.Question {
  getType() {
    return TYPE_NAME;
  }
  get text() {
    return this.getPropertyValue("text", "");
  }
  set text(newValue) {
    this.setPropertyValue("text", newValue);
  }
}

export class ServerRandomId extends Survey.SurveyElementBase {
  state = {
    value: 0,
  };

  get question() {
    return this.props.question;
  }

  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  async componentDidMount() {
    let response = await fetch("/unique-id", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    const randomValue = response.data;
    this.setState({
      value: randomValue,
    });
    this.question.value = randomValue;
  }

  render() {
    if (!this.question) return null;
    const { cssClasses } = this.question;
    return (
      <div className={cssClasses.root}>
        <p>{this.state.value}</p>
      </div>
    );
  }
}

Survey.Serializer.addClass(
  TYPE_NAME,
  [{ name: "text" }],
  function () {
    return new ServerRandomIdModel("");
  },
  "question"
);

Survey.ReactQuestionFactory.Instance.registerQuestion(TYPE_NAME, (props) => {
  return React.createElement(ServerRandomId, props);
});
