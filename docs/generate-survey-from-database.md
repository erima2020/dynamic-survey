## Generate SurveyJS from database

Create a JSON file inside `/data` folder will taken as a reference for initial survey
Once the survey has been served to the user it got stored inside the database

## Access database
To access the database following are the process
- Go to [Mongo DB login](https://account.mongodb.com/account/login?nds=true)
- Login into the account
- Click on browse collections
- You will see the list of collections 

## Collections
- **Input**

This collection will be responsible for storing the inputs from the survey
One can edit the top most record form it to update the survey in real time
Every field can be add/edit/delete from the first record

- **Survey**

This collection will hold the responses from the survey. 
Other than the response provided to the user. One will have extra information like
  1. ip
  2. _id
  3. random order
  4. timestamp - when the survey starts and finishes
  5. data - actual response
