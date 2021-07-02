// question with name Age: is there a way to indicate to check the answer is integer ?
// with names ZiggeoQ1 and ZiggeoQ2: how can we distinguish between these answers on Ziggeo?

import { combineInput } from "./CustomizedSurvey/Utils/combineInput";

const newList = combineInput({
  pages: [
    { elements:  [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
    { elements:  [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
    { elements:  [31] },
    { elements:  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  ],
  random: [
    { for: [1, 7, 3, 8, 9]},
    { for: [1, 7, 3, 8] },
    { for: []},
    { for: [2, 4, 6, 8]},
  ],
})
console.log({
  newList
})

export const json = {
  title: "Test input survey",
  showProgressBar: "top",
  pages: [
    {
      elements: [
        {
          type: "text",
          isRequired: true,
          name: "Age",
          text: "How old are you?",
          title: "Please enter your age",
          inputType: "number",
          validators: [{ type: "numeric", minValue: 21, maxValue: 120 }],
        },
        {
          type: "radiogroup",
          name: "Gender",
          title: "Are you a man or a woman",
          isRequired: false,
          colCount: 0,
          choices: ["Man", "Woman"],
        },
        {
          type: "ziggeodescribeimage",
          isRequired: true,
          name: "ZiggeoQ1",
          title:
            "First click on Record Video, Autorize access to webcam, and click Record again (change if the steps are different through the SDK). Then to provide you answer: Please describe the picture.",
          url: "https://picsum.photos/200/300",
          API_KEY: process.env.REACT_APP_ZIGGEO_API_KEY,
        },
        {
          type: "matrix",
          name: "Feelings",
          isRequired: true,
          title:
            "Please describe how you are feeling right now using the scale below",
          columns: [
            {
              value: 1,
              text: "Strongly Disagree",
            },
            {
              value: 2,
              text: "Disagree",
            },
            {
              value: 3,
              text: "Neither agree nor disagree",
            },
            {
              value: 4,
              text: "Agree",
            },
            {
              value: 5,
              text: "Strongly Agree",
            },
          ],
          rows: [
            {
              value: "Happy",
              text: "Happy",
            },
            {
              value: "Sad",
              text: "Sad",
            },
            {
              value: "Afraid",
              text: "Afraid",
            },
            {
              value: "Angry",
              text: "Angry",
            },
          ],
        },
        {
          type: "matrix",
          name: "Bla",
          title: "Bla bla",
          columns: [
            {
              value: 1,
              text: "1",
            },
            {
              value: 2,
              text: "2",
            },
            {
              value: 3,
              text: "3",
            },
          ],
          rows: [
            {
              value: "Bla1",
              text: "Bla bla 1",
            },
            {
              value: "Bla2",
              text: "Bla bla 2",
            },
            {
              value: "Bla3",
              text: "Bla bla 3",
            },
            {
              value: "Bla4",
              text: "Bla bla 4",
            },
            {
              value: "Bla5",
              text: "Bla bla 5",
            },
            {
              value: "Bla6",
              text: "Bla bla 6",
            },
            {
              value: "Bla7",
              text: "Bla bla 7",
            },
            {
              value: "Bla8",
              text: "Bla bla 8",
            },
            {
              value: "Bla9",
              text: "Bla bla 9",
            },
            {
              value: "Bla10",
              text: "Bla bla 10",
            },
            {
              value: "Bla11",
              text: "Bla bla 11",
            },
            {
              value: "Bla12",
              text: "Bla bla 12",
            },
            {
              value: "Bla 13",
              text: "Bla bla 13",
            },
            {
              value: "Bla 14",
              text: "Bla bla 14",
            },
            {
              value: "Bla15",
              text: "Bla bla 15",
            },
            {
              value: "Bla16",
              text: "Bla bla 16",
            },
            {
              value: "Bla17",
              text: "Bla bla 17",
            },
            {
              value: "Bla18",
              text: "Bla bla 18",
            },
            {
              value: "Bla19",
              text: "Bla bla 19",
            },
            {
              value: "Bla20",
              text: "Bla bla 20",
            },
          ],
        },
        {
          type: "ziggeodescribeimage",
          isRequired: true,
          name: "ZiggeoQ2",
          title:
            "First click on Record Video, Autorize access to webcam, and click Record again (change if the steps are different through the SDK). Then to provide you answer: Please describe the picture.",
          url: "https://picsum.photos/200/300",
          API_KEY: process.env.REACT_APP_ZIGGEO_API_KEY,
        },

        {
          type: "tagbox",
          name: "position-tags",
          title: "Choose job positions (Select2 Tagbox)...",
          choices: [
            "1|Designer",
            "2|Front-end Developer",
            "3|Back-end Developer",
            "4|Database Administrator",
            "5|System Engineer",
          ],
        },
        {
          type: "dropdown",
          name: "position-s2",
          title: "Choose job position (Select2)...",
          renderAs: "select2",
          choices: [
            "1|Designer",
            "2|Front-end Developer",
            "3|Back-end Developer",
            "4|Database Administrator",
            "5|System Engineer",
          ],
        },
        {
          type: "radiogroup",
          name: "position",
          title: "Choose job position (iCheck)...",
          isRequired: true,
          colCount: 0,
          choices: [
            "1|Designer",
            "2|Front-end Developer",
            "3|Back-end Developer",
            "4|Database Administrator",
            "5|System Engineer",
          ],
        },
        {
          type: "radiogroup",
          name: "position-pc",
          title: "Choose job position (Pretty checkbox)...",
          isRequired: true,
          renderAs: "prettycheckbox",
          colCount: 0,
          choices: [
            "1|Designer",
            "2|Front-end Developer",
            "3|Back-end Developer",
            "4|Database Administrator",
            "5|System Engineer",
          ],
        },
        {
          type: "barrating",
          name: "barrating1",
          ratingTheme: "css-stars",
          title: "Please rate the movie you've just watched",
          choices: ["1", "2", "3", "4", "5"],
        },
        {
          type: "imagepicker",
          name: "choosepicture",
          title: "What animal would you like to see first ?",
          choices: [
            {
              value: "lion",
              imageLink:
                "https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg",
            },
            {
              value: "giraffe",
              imageLink:
                "https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg",
            },
            {
              value: "panda",
              imageLink:
                "https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg",
            },
            {
              value: "camel",
              imageLink:
                "https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg",
            },
          ],
        },
        {
          type: "bootstrapslider",
          name: "bootstrapslider",
        },
        {
          type: "dropdown",
          renderAs: "select2",
          choicesByUrl: {
            url: "https://restcountries.eu/rest/v1/all",
          },
          name: "countries",
          title: "Please select the country you have arrived from:",
        },
        {
          type: "signaturepad",
          name: "sign",
          title: "Please enter your signature",
        },
        {
          type: "sortablelist",
          name: "lifepriopity",
          title: "Life Priorities ",
          isRequired: true,
          colCount: 0,
          choices: ["family", "work", "pets", "travels", "games"],
        },
        {
          name: "date",
          type: "datepicker",
          inputType: "date",
          title: "Your favorite date:",
          dateFormat: "mm/dd/yy",
          isRequired: true,
        },
      ],
    },
    {
      elements: [
        {
          type: "signaturepad",
          width: "500px",
          name: "Signature Pad - you can enter your signature here:",
        },
        {
          type: "matrix",
          name: "Quality",
          title:
            "Please indicate if you agree or disagree with the following statements",
          columns: [
            {
              value: 1,
              text: "Strongly Disagree",
            },
            {
              value: 2,
              text: "Disagree",
            },
            {
              value: 3,
              text: "Neutral",
            },
            {
              value: 4,
              text: "Agree",
            },
            {
              value: 5,
              text: "Strongly Agree",
            },
          ],
          rows: [
            {
              value: "affordable",
              text: "Product is affordable",
            },
            {
              value: "does what it claims",
              text: "Product does what it claims",
            },
            {
              value: "better then others",
              text: "Product is better than other products on the market",
            },
            {
              value: "easy to use",
              text: "Product is easy to use",
            },
          ],
        },
        {
          type: "rating",
          name: "satisfaction",
          title: "How satisfied are you with the Product?",
          mininumRateDescription: "Not Satisfied",
          maximumRateDescription: "Completely satisfied",
        },
        {
          type: "rating",
          name: "recommend friends",
          visibleIf: "{satisfaction} > 3",
          title:
            "How likely are you to recommend the Product to a friend or co-worker?",
          mininumRateDescription: "Will not recommend",
          maximumRateDescription: "I will recommend",
        },
        {
          type: "comment",
          name: "suggestions",
          title: "What would make you more satisfied with the Product?",
        },
      ],
    },
    {
      elements: [
        {
          type: "radiogroup",
          name: "price to competitors",
          title: "Compared to our competitors, do you feel the Product is",
          choices: [
            "Less expensive",
            "Priced about the same",
            "More expensive",
            "Not sure",
          ],
        },
        {
          type: "radiogroup",
          name: "price",
          title: "Do you feel our current price is merited by our product?",
          choices: [
            "correct|Yes, the price is about right",
            "low|No, the price is too low for your product",
            "high|No, the price is too high for your product",
          ],
        },
        {
          type: "multipletext",
          name: "pricelimit",
          title: "What is the... ",
          items: [
            {
              name: "mostamount",
              title: "Most amount you would every pay for a product like ours",
            },
            {
              name: "leastamount",
              title: "The least amount you would feel comfortable paying",
            },
          ],
        },
      ],
    },
    {
      questions: [
        {
          type: "text",
          name: "email",
          title:
            'Thank you for taking our survey. Please enter your email address, then press the "Submit" button.',
        },
      ],
    },
  ],
  random: [
    {for: [1, 2, 4, 5]}
  ]
};
