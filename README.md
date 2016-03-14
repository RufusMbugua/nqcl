<img width=100px src=http://nqcl.go.ke/app/images/logo/coat_of_arms.png style=width:100px;float:left;display:inline-block/>
<img width=80px style=width:100px;float:right src=http://nqcl.go.ke/app/images/logo/NQCL_logo.png />

***

# National Quality Control Laboratory (NQCL) Website
## What is the NQCL?
The National Quality Control Laboratory was first conceived in 1978 as an initiative of the Ministry of Health looking into the possibilities of improving drug control activities through the development of a quality control laboratory. - [NQCL Website](http://nqcl.go.ke/)

## Architecture
### Front-End
The system’s front-end is written in AngularJS coupled with package managers and Javascript Task Runners namely:
+ Bower
+ Grunt

### BackEnd
This is written in PHP, riding on [Codeigniter](https://github.com/bcit-ci/CodeIgniter) version 3.
A particularly Caravel-Like approach was used since there’s a high dependency on [Composer](https://getcomposer.org/) and a few packages such as:
+ [Flysystem](http://flysystem.thephpleague.com/)
+ [Eloquent](https://laravel.com/docs/5.1/eloquent)
+ [Fractal](http://fractal.thephpleague.com/transformers/)

### Database
For this project I used MySQL 5.*. 
You could find additional documentation [here](https://dev.mysql.com/doc/).

For installation instructions, read [this](INSTALL.md).