# CA4106 Report
The following document is the report for the CA4106 project. The project was to develop a paint application in group. Our group is composed of four persons who are Andrea Mouraud, Bronwyn Conroy, James Leahy and Dylan Da Costa.

## Process of the project
The process of the project was very simple. We decided to separate the tasks, so everyone was doing something on the project. Andrea was the more conformable to develop the app. Bronwyn and James were on the video and the deployment of the application, and finally Dylan was the one doing the report.  
We used Git during the project to have a versioning of it.

## Research for the project
When everyone was assigned to a task, the research of everyone was focused on their part.  
Bronwyn and James based their research around Google App Engine for a static website.  
Andrea made a lot of research using stackoverflow every time he needed answers on a problem or when he did not know how to do something.
Dylan made some research about the markdown language since Andrea told him that we were going to put the report on the website using a report made in markdown.

## Development of the application
The development of the website was made in HTML5 (HyperText Markup Language), CSS3(Cascading Style Sheet) and Javascript. While using Javascript Andrea wanted to use the Jquery library but did not have any answer for our lecturer so he used only Javascripit without any library which was a little bit harder.  
Each object has his own file and all these files are in a specific folder to ensure that our project is easy to understand is anybody has to continue the development of it.

| Browser       | Compatibilty         |
|---------------|:--------------------:|
| Android       | :heavy_check_mark:   |
| Edge          | :heavy_check_mark:   |
| IE            | :heavy_check_mark:   |
| Firefox       | :heavy_check_mark:   |
| Opera         | :heavy_check_mark:   |
| Safari        | :heavy_check_mark:   |
| Chrome        | :heavy_check_mark:   |

## Testing of the application
When the application was at the end, we decided to check if our application was working on each browser. Well, we were surprised since it was only working with Chrome. After some research, we found out that Chrome was using Javascript version that has not been released yet. Every other browser was still using the latest version and was waiting the next one to be officially released before using it but Chrome is the one that does not wait the official release and since we were using Chrome while the development to test our application we came up with this major problem that has been solved after the testing phase.  
An example of the code before testing:  
```js
class Rectangle {
    name = "Rectangle";
}
```  
An example of the code after testing:  
```js
class Rectangle {
    constructor() {
        this.name = "Rectangle";
    }
}
```  
The reason of this change is that public and private field declarations are an experimental feature (stage 3) proposed at TC39, the JavaScript standards committee.

## Deployment of the application
In order to deploy our application, we used the static way of deployment in Google App Engine.  
During the deployment we faced a little issue, the file structure is called differently to the local machine.  
If on the machine the path is "stylesheets/style" it would be "/stylesheets/style" for the deployment.

## Features of the application
Here is the list of all the features of our application:  
* colour choice
* size choice
* layers (changing the position of the layer, rename the layers and delete the layer)
* clear
* fill
* revert / redo
* eraser
* circle
* rectangle
* line
* straight line
* export to png
* import an image
* flood fill
