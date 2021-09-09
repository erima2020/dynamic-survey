## 6 Digit reference ID
Every survey will have optional 6 digit unique reference Id
An editor can place the reference id inside any page but it is recommended to push it inside the last page as most user don't want to see the id before filling out the survey

### How to use
To use this Id inside your json document, one needs to place it like that
```
{
  "type": "server-random-id",
  "name": "code",
  "title": "Here is your validation code"
}
```

### Auto save
Whenever the user see the survey code, it will automatically stored inside the database without filling out the complete survey

**condition** is you gave the `name: code` inside your JSON

### How to test
- Go to the survey
- fill the survey till you saw the code
- Without submitting the survey, go to the database to see if the ID get's saved or not
- It will save the code and after survey submission it will update the same record
