
# kf6012-assessment
***
## Information:

##### Name: Scott Donaldson
##### Student ID: 19019810
##### Part 1 URL: http://unn-w19019810.newnumyspace.co.uk/kf6012/part1
##### Part 2 URL: http://unn-w19019810.newnumyspace.co.uk/kf6012/part2
***
## Acknowledgements:
Designing Interactive Systems conference

***
## Additional Information:
[![Standard-Js](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com/)

Due to external factors dictating time spent on the assessment, the styling of the website is not as responsive as I would have liked as a result, the website currently supports screens of 1920*1080 or >=24". Just Zoom out if there are some elements overflowing into other elements.

### Extra Modules Used in Part2
[StandardJS](https://standardjs.com) to make the project code more readable and follow an industry standard.

[materialize-css](https://materializecss.com) As a framework for adding style to frontend and backend parts of the assessment.

[react-materialize](https://github.com/react-materialize/react-materialize) to give design components to react because it has a known issue with using just classnames and initializing their js the standard way.

### Alternitive Approaches

pageconfig.js exists as a single internal API for generating Routes and Displaying Page links for the front end development. Instead of having to pass around lots of states and props or trying to setup contexts for global state management.

config.js exists in part2 as the same concept to it being used in part1 so I can handle changing from development mode to deployment mode easily and staging for deployment is minimal hassle

Using the readinglist is slightly differently implemented to how it is in the workshops for viewinglist. Instead of having all papers displayed again and using checkboxes, once the user is authorised, the can navigate to the papers and authors pages and if they are logged in they will have the option to add the paper to their reading list when they select one to view from either of those pages. It works similar for removing a paper, navigate to reading list and find the paper you want to remove, click on it and press the "remove from reading" list button, this should update the list. If a paper is already on the reading list but they view it in the papers or authors page, it will be greyed out.
