import React from "react";
import * as Survey from "survey-react";
import { ZiggeoRecorder } from "react-ziggeo";

const TYPE_NAME = "ziggeodescribeimage";

export class DescribeImageModel extends Survey.Question {
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
  get API_KEY() {
    return this.getPropertyValue("API_KEY", "");
  }
  set API_KEY(newValue) {
    this.setPropertyValue("API_KEY", newValue);
  }
}

export class DescribeImage extends Survey.SurveyElementBase {
  state = {
    recorder: null,
  };
  get question() {
    return this.props.question;
  }
  
  recorderUploaded = (ref) => {
    const { stream_data: {token, video_token, type} } = ref;
    this.question.value = {
      token,
      video_token,
      type
    };
  };

  recorderVerified = (ref) => {
    const { stream_data: {token, video_token, type} } = ref;
    this.question.value = {
      token,
      video_token,
      type
    };
  };

  setRecorder = (ref) => {
    this.setState({
      recorder: ref,
    });
  };

  render() {
    if (!this.question) return null;
    const { text, url, API_KEY, cssClasses } = this.question;
    return (
      <div className={cssClasses.root}>
        <div>
          <b>{text}</b>
        </div>
        <img src={url} alt={text} />
        <ZiggeoRecorder
          apiKey={API_KEY}
          height={180}
          width={320}
          onRef={(ref) => this.setRecorder(ref)}
          allowupload={false}
          onVerified={this.recorderVerified}
          onUploaded={this.recorderUploaded}
        />
      </div>
    );
  }
}

Survey.Serializer.addClass(
  TYPE_NAME,
  [{ name: "text" }, { name: "url" }, { name: "API_KEY" }],
  function () {
    return new DescribeImageModel("");
  },
  "question"
);

Survey.ReactQuestionFactory.Instance.registerQuestion(TYPE_NAME, (props) => {
  return React.createElement(DescribeImage, props);
});
