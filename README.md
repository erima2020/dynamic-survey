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
    type: "videocomponent",
    name: "Please upload your video",
    text: "Please describe the picture",
    url: "https://picsum.photos/200/300",
    API_KEY: "<your-api-key>",
}
```

## Environment Variables
- REACT_APP_ZIGGEO_API_KEY - A secret app key for the ziggeo
- DATABASE_URL - A MongoDB url where you want to store the information