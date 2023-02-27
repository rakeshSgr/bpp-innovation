# Dependencies

	


## Backend

    	MongoDB
    	Node.js
        Kafka
        Chat GPT 3
		Discord
		DigiLocker ( Mock API’s )
		AssemblyAI
		Sendgrid 


### Setup Guide for BPP-Innovation repo

Steps

1. Install required tools & dependencies


    Install any IDE (eg: VScode)


    Install Nodejs: https://nodejs.org/en/download/


    Install MongoDB: https://docs.mongodb.com/manual/installation/

2. Clone the Bpp-innovation repository.

	git clone [https://github.com/rakeshSgr/bpp-innovation.git](https://github.com/rakeshSgr/bpp-innovation.git)

3. Add a .env file to the project directory

	

	Create a .env file in the src directory of the project , you can copy variables from .env.sample file and make necessary changes

	

4. Start MongoDB locally

Based on your host operating system and method used, start MongoDB.

5. Install Npm packages

ELEVATE/bpp-innovation/src$ npm install	

6. Start bpp-innovation server

ELEVATE/bpp-innovation/src$ node app.js	


## Frontend	



1. Ionic

           Ionic CLI                    : 5.4.16 (/usr/local/lib/node_modules/ionic)                                                    


           Ionic Framework              : @ionic/angular 6.5.6                                                      


           @angular-devkit/build-angular: 13.2.6                                                         


           @angular-devkit/schematics   : 13.2.6                                                         


           @angular/cli                 : 13.2.6                                                                 


           @ionic/angular-toolkit       : 6.1.0    

2. Capacitor

        Capacitor CLI           : 3.9.0         
        @capacitor/android      : 3.6.0                                                          
      	
        @capacitor/core         : 3.9.0                                                                             

       	@capacitor/ios          : 3.5.0   

3. Utility

   		cordova-res : 0.15.4                                                                            

   		native-run  : 1.7.1   



4. System

        Android SDK Build-tools : 34-rc1                    

        Android SDK Platform-tools : 33.0.3         
        
        NodeJS            : v18.12.1 (/usr/local/bin/node)     
        
        npm               : 8.19.2                    

        OS                : Linux 5.15   


                                                                             


### Ionic Android Build Setup



* Install Java - [https://www.oracle.com/java/technologies/downloads/#java11](https://www.oracle.com/java/technologies/downloads/#java11)
* Install Gradle - [https://gradle.org/install/](https://gradle.org/install/)
* Install Android Studio - [https://developer.android.com/studio](https://developer.android.com/studio)
*  After Android studio installation, install SDK
* Open Android studio and goto settings/appearance and behavior/system settings/Android SDK
* Install appropriate Android sdk platform package
* Add environment variables in ~/.bashrc or ~/.bash_profile as follows 

 	export ANDROID_SDK_ROOT=path_to_sdk                                                                

            export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin                                                                

            export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools 



* Reference: [https://ionicframework.com/docs/installation/android](https://ionicframework.com/docs/installation/android)


### CLI Setup



* npm install -g ionic
* npm install @capacitor/core
* npm install @capacitor/cli --save-dev


### Project Setup



* git clone the repo - [https://github.com/Cafnanc/MentorED-BPP-App.git](https://github.com/Cafnanc/MentorED-BPP-App.git)
* Add environment files inside src/environments
* Go to project folder and run npm i 


### Build APK



* To check attached devices do adb devices 
* Run ionic build (Make sure you have attached device)
* Run ionic cap sync
* Run ionic cap run android
* Apk location project_folder/android/app/build/outputs/apk/debug/apk_name.apk


### Debug APK



* Open chrome and enter chrome://inspect
* Select app