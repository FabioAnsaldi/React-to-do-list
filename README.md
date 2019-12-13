# spa-plugin
React application into docker environment

## Table of Contents
- [Local Setup](#local-setup)
- [Get it](#get-it)
- [Environment](#environment)
  - [Development](#development)
  - [Ide](#ide)
  - [AccessToken](#accesstoken)
- [Contributing](#contributing)

### Local Setup
To preview the website locally you have to install on your local machine the listed softwares below:
1. Install [git](https://git-scm.com/) to manage Git repository.
2. Install [Docker](https://www.docker.com/) to run a container from Docker file

***That's it! You do not need to install NodeJS interpreter and Yarn or NPM package manager***

### Get it
First of all, clone the repository `spa-plugin` into your local machine:

```shell
git clone https://github.com/FabioAnsaldi/spa-plugin.git
```
######

### Environment
Now you can run development environment and see the final result or if you want you can edit the project by running it through the developing environment

######

#### Development environment
Go to the new folder directory and run the following commands:
```shell
cd spa-plugin
docker-compose up --build
```
> It runs developing environment. You can edit resources and watch result at specific local URL: http://localhost/

#### Idee
If is useful for you to set an extra plugins for your Idee, you can find the 'node_modules' folder and all of modules inside.
For example I usually use ESlint, such as in this repository, so I have to set the module directory folder in my Idee settings.
> Remember:
> You will have to install also NodeJS locally to use those modules inside to the folder  

#### AccessToken
You have to add an extra file named .env where there will be the Client ID and the Client Secret keys.
> CLIENT_ID=xxxx

> CLIENT_SECRET=yyyy

### Contributing
Feel free to make changes to the project files.
