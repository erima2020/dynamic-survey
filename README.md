# React quickstart boilerplate for Creating survey using SurveyJS and Ziggeo

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to run this sample application
 - clone the repository
 - ``cd <folder-name>``
 - npm i
 - npm start
 - open http://localhost:3000/ in your web browser


You can find the detailed information on how to perform common tasks in [this guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

this project is build over top of the surveyJS which means you can extensively use the surveyJS here. [Follow here for more guide](https://surveyjs.io/Documentation/Library)
### Other components
More than that, this boilerplate contains ziggeo as well which you need to pass it over from JSON object
```
/// Add this into your json object
{
    type: "videocomponent",
    name: "Please upload your video",
    text: "Please describe the picture",
    url: "https://picsum.photos/200/300",
    API_KEY: "<your-api-key>",
}
```