# npm-inst-all

The package is used to easily install nested NPM dependencies in your project.


### Installation

```npm install npm-inst-all -g``` # install package globally.  

You can also specify npm-inst-all as depency in your package.json to install it locally  


### Usage
Given the next project structure:

```project
   service1/
      package.json  #service1 dependecies
      
   service2/
      package.json  #service2 dependecies

   package.json  #base project dependecies
   ```
And assuming that you are in the project/ directory, 
Install all dependencies (base, service1 and service2) with one command: ```npm-inst-all .```


Note: it is possible to specify the base directory. To install dependencies of ```service1``` just type 

```npm-inst-all ./service1/``` 

or just use *absolute* path

```npm-inst-all `/home/users/.../service1/``` 
