import React from "react";
import * as Survey from "survey-react";

export class VideoComponentModel extends Survey.Question {
  getType() {
    return "videocomponent";
  }

  get text() {
    return this.getPropertyValue("text", "");
  }
  set text(newValue) {
    this.setPropertyValue("text", newValue);
  }
}

export class VideoComponent extends Survey.SurveyElementBase {
  get question() {
    return this.props.question;
  }
  render() {
    if (!this.question) return null;
    var cssClasses = this.question.cssClasses;
    return (
      <div className={cssClasses.root}>
        <span>My Text Value: </span>
        <span>
          <b>{this.question.text}</b>
        </span>
        <button>click me</button>
      </div>
    );
  }
}

Survey.Serializer.addClass(
  "videocomponent",
  [{ name: "text" }],
  function () {
    return new VideoComponentModel("");
  },
  "question"
);

Survey.ReactQuestionFactory.Instance.registerQuestion("videocomponent", (props) => {
  return React.createElement(VideoComponent, props);
});
