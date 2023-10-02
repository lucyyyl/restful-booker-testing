# RESTFUL-BOOKER-TESTING

This is an example automated test framework for the [restful-booker-platform](https://github.com/mwinteringham/restful-booker-platform).  
Note: This framework has been built using a locally modified version of the restful-booker-platform. This can be found [here](https://github.com/lucyyyl/restful-booker-platform-edited-for-testing) - instructions on how to run this can be seen in the README.md file for this repo.<br>
I would like to reiterate that I did not build the original platform, I just edited some of the data-testids. 

## Running the tests
Run ```npx playwright test```

After the test run, if you want to see the html report run ```npx playwright show-report```

If you only want to run the end to end tests run ```npx playwright test --grep @E2E```

If you only want to run the API tests run ```npx playwright test --grep @API```

## Framework structure
The framework has been built using playwright and typescript.

### Helpers 
This directory houses the helper files, which contain functions and variables used throughout the project. 

```APIBuilders.ts``` - this is where the default API calls live. These can be called from other files and will send a successful API request. These default calls can be modified through various parameters.

```envVars.ts``` - this is where all the credentials and URLS live.

### Pages
This directory houses the page files, which contain all the elements of a page that we will need to interact with. 

### Tests
This directory houses the e2e and API directories. 

### API
This directory houses the API test files. 
Each file is the test for one of the APIS. And includes at least 1 happy path and sad path test. 

### e2e
This directory houses the e2e test files. 
Each file is for one area of behaviour of the application. 
