# React quickstart boilerplate for Creating survey using SurveyJS and Ziggeo

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to run this sample client application
 - clone the repository
 - ``cd <folder-name>``
 - yarn 
 - yarn start
 - open http://localhost:3000/ in your web browser
## How to run this sample server application
 - clone the repository
 - ``cd <folder-name>``
 - yarn 
 - yarn start
 - open http://localhost:3001/ in your web browser. The content will serve from build folder and APIs too

 ## Build the application
 We are using Express JS to serve the web app on build. `yarn start` will render the `/build` folder in your browser at PORT 3001. To refresh the build you need to do
 - `yarn build`
 - `yarn start` 


You can find the detailed information on how to perform common tasks in [this guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

this project is build over top of the surveyJS which means you can extensively use the surveyJS here. [Follow here for more guide](https://surveyjs.io/Documentation/Library)
### Other components
More than that, this boilerplate contains ziggeo as well which you need to pass it over from JSON object
```
/// Add this into your json object
{
   "type": "ziggeodescribeimage",
   "name": "ZiggeoQ1",
   "title": "First click on Record Video",
   "url": "https://picsum.photos/200/300",
   "API_KEY": "<your-api-key>",
   "transcription": true
},
{
   "type": "ziggeodescribeimageonlyaudio",
   "name": "ZiggeoQ1",
   "title": "First click on Record Video",
   "url": "https://picsum.photos/200/300",
   "API_KEY": "<your-api-key>",
   "transcription": true
},
{
   "type": "server-random-id",
   "name": "code",
   "title" : "Your survey Id"
},
```

### Random series from picking
Note: If you want to use all random questions, please go ahead with the SurveyJS random order
If you want to only a set of questions to be randomized then you can pass one more keyword in your JSON data and for randomizing the pages you can follow randomPage key word
`random: [
    { for: [1, 2, 4, 5] }
  ],
randomPage : [0, 3]
`
here random will have one or more objects based on the pages
You need to pass the index of which question to wanted to be randomized and that will be with the other items mentioned in the same array

## How to integrate 
### New Application
If you want to build a new app, you can use this as your baseline and create everything on the top of it. Since this project don't have much of to offer except survey so you should note the below point for existing projects

### Existing Application
To integrate this application into yours is to copy and paste the folder `CustomizedSurvey` into your anywhere in your project and follow the snippet

```
import { combineInput } from ".<your-project-root>/CustomizedSurvey/Utils/combineInput.js";


const additionalCheckJSON = combineInput(json);
const model = new Survey.Model(additionalCheckJSON);

// in your render method
<Survey.Survey
    model={model}
    onComplete={onComplete}
    onValueChanged={onValueChanged}
/>
  
```
Install the dependecies in your app. Change it according to your current behaviour
```
"react-ziggeo": "latest",
"survey-analytics": "latest",
"survey-creator": "latest",
"survey-pdf": "latest",
"survey-react": "latest",
"surveyjs-widgets": "latest",
"xlsx": "latest"
```

To add a new component you can add in the survey which you wanted to add as follow
```
export { DescribeImage } from ".<your-project-root>/CustomizedSurvey/Components/DescribeImage";
export { DescribeImageOnlyAudio } from ".<your-project-root>/CustomizedSurvey/Components/DescribeImageAudio";
export { DescribeImage } from ".<your-project-root>/CustomizedSurvey/Components/DescribeImage";
export { RandomId } from ".<your-project-root>/CustomizedSurvey/Components/RandomId";
export { ServerRandomId } from ".<your-project-root>/CustomizedSurvey/Components/ServerRandomId";
```

this way you can use this repo in your existing app


## Environment Variables
- REACT_APP_ZIGGEO_API_KEY - A secret app key for the ziggeo
- DATABASE_URL - A MongoDB url where you want to store the information
- IP_VAILDATION - [Optional] If you want to block the ip to only one survey
