### API Reference
Number of objects supported to build the survey of your choice top of the SurveyJs and Ziggeo

## SurveyJS
Most of the objects are coming from the SurveyJS library, so we would recommend you to see their document first before creating a survey
After that you could pickup the survey element of your choice
If you don't want Ziggeo integration then you should skip this and only create survey from [SurveyJS library](https://surveyjs.io/Documentation/Library)

## Overall format
The overall format of survey JSON would look like this
```
{
  "title": "Test input survey",
  "showProgressBar": "top",
  "pages": [
    {
      "elements" : [
        {
          // your question
        }
      ]
    }
  ],
   "random": [
    {
      "for": [1, 2]
    },
  ],
  "randomPage": [1, 2]
}
```

here, some are self explainatory fields but some we can explain
### random
If you want to randomize the questions of a page then you could use this field
as this will have a array of same number as the pages and inside the index you want to randomize
for example,
if you want to randomize the 
page1 - Q1, Q3 and Q5
page2 - Q2, Q6

In that case your random object would look like this
```
"random": [
    {
      "for": [1, 3, 5]
    },
    {
      "for": [2, 6]
    },
    {
      "for": []
    }
```
empty for is if you don't want any of the questions to get randomized

### randomPage
In case you want to randomize the pages between the application then you could pass the `randomPage`
An example of this would be
```
"randomPage": [1, 2]
```
here page number 1 and 2 will only get randomized in between


## Ziggeo
Before we get started, you should head over and logged in into [Ziggeo account](https://ziggeo.com/)
- Go to the dashboard
- Create an application
- Generate the API key for your app

Now, you have everything you need to create a survey. Let's see the custom elements we have added

### server-random-id
To include a dynamic unique 6 digit referece number inside your survey, you just need to add this object to your pages object
```
{
  "type": "server-random-id",
  "name": "code",
  "title": "Here is your validation code"
}
```
here is the minimal example of achieving that
You can read more about that inside `docs/6-digit-random-number.md` file

### Ziggeo components
here is the guide for the ziggeo components

| type 	| name 	| title 	| url 	| API_KEY 	| transacription 	| message 	|
|------	|------	|-------	|-----	|---------	|----------------	|---------	|
|      	|      	|       	|     	|         	|                	|         	|
|      	|      	|       	|     	|         	|                	|         	|
