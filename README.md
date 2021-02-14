# Park-A-Lot mobile application

This new mobile application, Park-A-Lot is designed for drivers for recording and finding their vehicle after parking at the designed carparks. Users are to create their own dedicated accounts with their personal information intact. They can easily input their car plate number manually or scan with the in-built camera. There are camera in the carpark that will track the vehicle's position. The vehicle's parked venue will then be synced from the database through the vehicle's car plate number. With this application, they can find and track their vehicle's parking status with just few taps.

## Design Process
 
The target demographic of this Park-A-Lot are mainly adults who drive. This is an mobile application designed to help drivers locate their cars easily at the carpark, knowing which area and car lot they had parked at.

As a user, I want to be able to locate the position of my car easily.

As a user, I would want more features that would convience me when I'm looking for my car or looking for a carpark to park at.

As a user, I want to have real time data to inform me of the carpark's status and informations.

As a partner, I want to be able to bring in more users to park at the carparks.

- Wireframes
    - [XD Prototype](https://xd.adobe.com/view/72381127-383b-4c45-917d-1851355080e7-276b/)

## Features

Park-A-Lot app has account features to save data that were logged into the database and retrieve them anytime. 

There is an in-built camera that recognises text which is used for reading of carplates in this case. 

Users can also choose to manually type in their car plate number. 

Our system will then match with the data from the database and retrieve the location of the parked car in the carpark.

There is also a map to show the carparks with the supported technology for users plan their journey beforehand.
 
### Existing Features
- Account Registration - allows users to create their own unique account by filling in the registration form with their personal information
- Account Login - allows users to sign in to the account across devices
- Edit Account Details - change users account details anytime through the Account page
- Informative Slider - after registration, a three slides slider with helpful introduction of the app to help the new users
- Text-recognition camera - just take a quick shot at the car plate and the system will turn the picture into text
- Manual Input - An alternative way of keying in the car plate to the system
- Realtime dashboard - After users key in ther car plate, the dashbaord at the homepage will update the vehicle's status if they are parked in the designed carpark
- Map: A map of Singapore with markers of the supported carparks.
- Logout: Logout to switch account if there is a need to

### Features Left to Implement
- A GPS system to track position of the imputed vehicle
- Realtime Parking Lots avaliability
- Personalised profile

## Technologies Used
- [ionic](https://ionicframework.com/)
    - The project uses **ionic** to build cross-platform application.
- [Angular](https://angular.io/)
    - The project uses **Javascript** to build functions.
- [Javascript](https://www.javascript.com/)
    - The project uses **Javascript** to build functions.
- [HTML](https://html.com/)
    - The project uses **HTML** to create formatting.
- SCSS
    - The project uses **SCSS** to modify the designs.
- [OCR](https://ionicframework.com/docs/native/ocr)
    - The project uses **OCR** to detect texts in picture.
- [tesseract.js](https://github.com/tesseract-ocr/tesseract)
    - The project uses **tesseract.js** to import the picture to text technology.

## Testing

# User Login
- Username:
    - gohcwmaddie
- Password:
    - spyderspyder

1. Login
    - Be directed to the Login page at launch
    - Login with your credentials
    - Try to use a invalid username and a red error message will appear at the top
    -  Try with a real one this time, a green message will show at the top if you have successfully logged in

2. Register
    - Go to the Register page from the Login page
    - Key in your details
    - Try to use an invalid email, used email, used username, or by leaving blanks, a red error message should show up
    - Try with a real one this time, a green message will show at the top if you have successfully registered

3. Slider
    - Slide with your fingers to change slides
    - Read and understand the purpose and how to use the app
    - Tap on the button on the last slide to finish off

4. Camera
    - Take a picture of a carplate or a text or upload a picture
    - The system will scan  automatically and when the progress reaches 100% the recognised text will be displayed
    - If the result is not ideal, try taking another picture or go for manual input
    - If the result is ideal, submit it and the carplate at the home dashboard will be updated
    - The dashboard at the home page will not be updated if the car is not at the registered location in the database.
    - Try with a carplate number that has been recorded in the database carpark
    - The dashboard should update accordingly

5. Manual
    - Type in a random carplate number in the manual input
    - The dashboard at the home page will not be updated if the car is not at the registered location in the database.
    - Try with a carplate number that has been recorded in the database carpark
    - The dashboard should update accordingly

6. Account
    - Slide your fingers across each fill
    - The username fill should not be editable thus it can't be slided
    - Slide the first name fill and an edit button will be revealed
    - Tap on the edit button and key in something
    - If you leave it empty, there will be a red error message
    - If the changes is successful, there will be a green successful message and the database will also be updated
    - To log out, scroll to the bottom of the page and there will be a log out button
    - You will have to login again after logging out

7. Map
    - Try exploring the map
    - There are markers of the partnered carparks located in Singapore

## Credits
https://www.w3schools.com/js/js_json_php.asp
https://www.youtube.com/watch?v=c6MyNU0jp28&t=1s
https://www.youtube.com/watch?v=XyLcPdv1LKM&t=95s
https://www.youtube.com/watch?v=PM2uR_eqSvk&t=22s
https://www.youtube.com/watch?v=PC52D68xf2g
https://www.youtube.com/watch?v=wdRsvApH5mc&t=390s

### Acknowledgements
- I received inspiration for this project from Jewel's Parking Kiosk
- 