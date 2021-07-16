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

import { json } from "./inputJSON.js";
import * as inputObj from "./input.json";
import { combineInput } from "./CustomizedSurvey/Utils/combineInput.js";

window["$"] = window["jQuery"] = $;

export { DescribeImageOnlyAudio } from "./CustomizedSurvey/Components/DescribeImageAudio";
export { DescribeImage } from "./CustomizedSurvey/Components/DescribeImage";
export { RandomId } from "./CustomizedSurvey/Components/RandomId";
export { ServerRandomId } from "./CustomizedSurvey/Components/ServerRandomId";

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
    const [ip, setIP] = useState(null);
    const [loader, setLoader] = useState(true);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState(false);

    const saveData = (data) => {
        fetch("/upload", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    };

    const onComplete = (result) => {
        saveData({
            data: result.data,
            questionaire: additionalCheckJSON,
            timestamp: {
                startDate,
                endDate: new Date(),
            },
            surveyId: result.data.surveyId,
        });
    };

    useEffect(async () => {
        try {
            let result = combineInput(inputObj);

            setAdditionalCheckJSON(result);
            result = new Survey.Model(result);
            setModel(result);
            let response = await fetch("/ipvalidate");
            response = await response.json();
            setLoader(false);
            setData(response.data);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
        }
    }, []);
    return (
        <div className="container">
            <h2>USING: SurveyJS Library - a sample survey below</h2>
            {!loader ? (
                success ? (
                    !data ? (
                        <Survey.Survey
                            model={model}
                            onComplete={onComplete}
                            onValueChanged={onValueChanged}
                        />
                    ) : (
                        <h2>Survey already submitted</h2>
                    )
                ) : (
                    <h2>Some Error Occured</h2>
                )
            ) : (
                <div
                    style={{
                        display: "flex",
                        flex: 1,
                        height: "100vh",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Loader
                        type="Oval"
                        color="#EE1C25"
                        height={39}
                        width={80}
                    />
                </div>
            )}
        </div>
    );
}
