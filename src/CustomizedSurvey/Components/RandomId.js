import React, { useEffect } from "react";
import * as Survey from "survey-react";

const TYPE_NAME = "random-id";

export class RandomIdModel extends Survey.Question {
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

export class RandomId extends Survey.SurveyElementBase {
    state = {
        value: 0,
    };

    get question() {
        return this.props.question;
    }

    getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    componentDidMount() {
        const randomValue = (Date.now() / 1000) | 0;
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
        return new RandomIdModel("");
    },
    "question"
);

Survey.ReactQuestionFactory.Instance.registerQuestion(TYPE_NAME, (props) => {
    return React.createElement(RandomId, props);
});
