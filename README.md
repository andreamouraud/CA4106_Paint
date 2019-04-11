![Logo](https://hardwareassociation.ie/wp-content/uploads/2017/12/Dcu-logo.png)
# CA4106 : Cloud Computing
## Project Report : Team 9

The following document is the report for the CA4106 project. The project was to develop a Paint application in group and deploy it on the Cloud.

The required tasks were : 
* Application having Lines, Rectangles, Circles and Eraser objects with colours.
* Developing the application using JavaScript and HTML5.
* Deploying it to [Google App Engine](https://cloud.google.com/appengine/)

[*Click here to access our application*](https://ca4106wepaint.appspot.com/)

### Project process and team members
***

The process of the project was very simple. We decided to separate the tasks, so everyone was doing something on the project.

| Name           | ID       | Task                                 |
|----------------|:--------:|--------------------------------------|
| Bronwyn Conroy | 15357066 | Deployment to GAE and video creation |
| James Leahy    | 15464928 | Deployment to GAE and video creation |
| Dylan Da Costa | 18103235 | Report creation (Markdown language)  |
| Andrea Mouraud | 18103154 | Application development              |

### Research for the project
***
When everyone was assigned to a task, the research of everyone was focused on their part.  
* **Bronwyn** and **James** based their research around [Static Website on Google App Engine](https://cloud.google.com/appengine/docs/standard/python/getting-started/hosting-a-static-website).  
* **Andrea** already knew the languages but used [Stackoverflow](https://stackoverflow.com/) when he had issues.
* **Dylan** made some research about the [Markdown language](https://en.wikipedia.org/wiki/Markdown)  as Andrea told him that we were going to put the report on the website using a report made in Markdown.

### Development of the application
***
The development of the website was made in **HTML5** (HyperText Markup Language), **CSS3** (Cascading Style Sheet) and **Javascript**. 

Andrea wanted to use **JQuery** but did not have any answer for our lecturer to known whether it was allowed or not so he did not use any library which made it a little bit harder.  

The project is structured so that each object has its own file and all these files are in a specific folder to ensure that our project is easy to understand if anybody has to continue the development of it.

We used Git during the project to have a versioning of it, using a private repository hosted on [Github](https://github.com).

#### Browser compatibility

| Browser       | Compatible           |
|---------------|:--------------------:|
| Android       | :heavy_check_mark:   |
| Edge          | :heavy_check_mark:   |
| IE            | :heavy_check_mark:   |
| Firefox       | :heavy_check_mark:   |
| Opera         | :heavy_check_mark:   |
| Safari        | :heavy_check_mark:   |
| Chrome        | :heavy_check_mark:   |

### Testing of the application
***
As the only browser used during the development phase was Chrome, when the application was close to be finished, we decided to check if it was working on every other browser. 

We were surprised as none of them but Chrome would work. After some research, we found out that Chrome was using a Javascript version that has not been released yet. Every other browser was still using the latest version and was waiting the next one to be officially released before using it. So we came up with this major problem that has been solved after the testing phase.

*An example of one of the issues:* 

Before
```js
class Rectangle {
    name = "Rectangle";
}
```  
After
```js
class Rectangle {
    constructor() {
        this.name = "Rectangle";
    }
}
```  
[Classes - JavaScript | MDN - Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
> Public and private field declarations are an experimental feature (stage 3) proposed at TC39, the JavaScript standards committee.

### Deployment of the application
***
In order to deploy our application, we used [Static Website on Google App Engine](https://cloud.google.com/appengine/docs/standard/python/getting-started/hosting-a-static-website).  
During the deployment we faced some minors issues as the file structure is different than on a Local machine, but James fixed that quickly.  

For example, if on the machine the path is `stylesheets/style` it would be `/stylesheets/style` for the deployment.

The application is deployed [**here**](https://ca4106wepaint.appspot.com/)

### The Features of our application
***

| Feature                          | Required |
|----------------------------------|:--------:|
| Colour choice                    | Yes      |
| Size choice                      | No       |
| Layer management                 | No       |
| Change layer position (up/down)  | -        |
| Rename layer                     | -        |
| Delete layer                     | -        |
| Clear Canvas                     | No       |
| Fill Canvas                      | No       |
| Flood Fill Algorithm             | No       |
| Revert/Redo Actions              | No       |
| Rectangle                        | Yes      |
| Circle                           | Yes      |
| Line                             | No       |
| Straight Line                    | No       |
| Eraser                           | Yes      |
| Import an image                  | No       |
| Export to PNG                    | No       |
