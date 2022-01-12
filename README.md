
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

### Extra Modules Used in Part2
[StandardJS](https://standardjs.com) to make the project code more readable and follow an industry standard.

[materialize-css](https://materializecss.com) As a framework for adding style to frontend and backend parts of the assessment.

[react-materialize](https://github.com/react-materialize/react-materialize) to give design components to react because it has a known issue with using just classnames and initializing their js the standard way.

### Alternitive Approaches

#### Part 1

awards endpoint is added just as a simple way to get a map of award id to award name

the papers enpoint returns an array of authors as part of its responses for any paper responding

there are a number of helper functiosn in the gateways to ensure that valid IDs are given and within ranges / exist

#### Part 2

pageconfig.js exists as a single internal API for generating Routes and Displaying Page links for the front end development. Instead of having to pass around lots of states and props or trying to setup contexts for global state management.

config.js exists in part2 as the same concept to it being used in part1 so I can handle changing from development mode to deployment mode easily and staging for deployment is minimal hassle

Reading List uses the paper and authors pages to add papers to reading list, a button will show to add it to the list when there is an authenticated user

There was an attempt to use the standardJS method to keep the code concise, This was successful all from it throwing a few errors around using ES6 Arrow Functions as Class Methods, these were delt with where StandardJS had issues.
