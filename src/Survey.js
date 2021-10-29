import React, { useState, useEffect, useMemo } from "react";
import * as Survey from "survey-react";
import * as widgets from "surveyjs-widgets";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "survey-react/survey.css";
import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "pretty-checkbox/dist/pretty-checkbox.css";

import { combineInput } from "./CustomizedSurvey/Utils/combineInput.js";

window["$"] = window["jQuery"] = $;

export { DescribeByAudio } from "./CustomizedSurvey/Components/DescribeByAudio";
export { DescribeByToAudio } from "./CustomizedSurvey/Components/DescribeByToAudio";
export { DescribeImage } from "./CustomizedSurvey/Components/DescribeImage";
export { DescribeImageOnlyAudio } from "./CustomizedSurvey/Components/DescribeImageAudio";
export { DescribeText } from "./CustomizedSurvey/Components/DescribeText";
export { DescribeTextByAudio } from "./CustomizedSurvey/Components/DescribeTextByAudio";
export { DescribeVideo } from "./CustomizedSurvey/Components/DescribeVideo";
export { DescribeVideoByAudio } from "./CustomizedSurvey/Components/DescribeVideoByAudio";
// export { RandomId } from "./CustomizedSurvey/Components/RandomId";
// export { ServerRandomId } from "./CustomizedSurvey/Components/ServerRandomId";

Survey.StylesManager.applyTheme("default");

//widgets.icheck(Survey, $);
widgets.prettycheckbox(Survey);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
//widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

function onValueChanged() {}

export function SurveyPage() {
  const [additionalCheckJSON, setAdditionalCheckJSON] = useState([]);
  const [model, setModel] = useState([]);
  const [startDate] = useState(new Date());
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(false);
  const [identifier, setIdentifier] = useState(0)
  const [hasCompleted, setHasCompleted] = useState(false)

  const saveData = (data) => {
    fetch("/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setHasCompleted(true)
  };

  const onComplete = (result) => {
    saveData({
      data: {
        ...result.data,
        code: identifier || result.data.code
      },
      randomOrder: additionalCheckJSON.order,
      timestamp: {
        startDate,
        endDate: new Date(),
      },
      surveyId: result.data.surveyId,
    });
  };

  useEffect(async () => {
    const init = async () => {
      try {
        setHasCompleted(false);
        // read from input file in public
        let input = await fetch("/input", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        input = await input.json();
        if (input.submission) {
          setLoader(false);
          setData(input.submission);
        } else if(input.result) {
          let result = combineInput(input.result);
          setAdditionalCheckJSON(result);
          setIdentifier(input.identifier);
          result = new Survey.Model(result);
          setModel(result);
          setLoader(false);
          setSuccess(true);
        }
      } catch (error) {
        setSuccess(false);
        setLoader(false);
        setError(error);
      }
    };
    init();
  }, []);

  const renderer = () => {
    if (loader) {
      return (
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader type="Oval" color="#EE1C25" height={39} width={80} />
        </div>
      );
    } else if (error) {
      return (
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>{error.message}</h2>
        </div>
      );
    } else if (data) {
      return (
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Survey already submitted</h2>
        </div>
      );
    } else if (!success) {
      return (
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Some Error Occurred</h2>
        </div>
      );
    } else {
      return (
        <Survey.Survey
          model={model}
          onComplete={onComplete}
          onValueChanged={onValueChanged}
        />
      );
    }
  };

  return (
    <div className="container">
      <h2>Help us test our platform</h2>
      {hasCompleted && (
        <h3>
          {process.env.REACT_APP_SERVER_CODE_LABEL
            ? process.env.REACT_APP_SERVER_CODE_LABEL
            : " Your survey code is:"}
          {" "}{identifier}
        </h3>
      )}
      {renderer()}
    </div>
  );
}
