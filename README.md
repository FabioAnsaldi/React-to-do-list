# react-to-do-list
React To-Do-List application into docker environment

## Table of Contents
- [Local Setup](#local-setup)
- [Get it](#get-it)
- [Environment](#environment)
  - [Development](#development)
  - [Ide](#ide)
  - [Global Variables](#global-variables)
- [Contributing](#contributing)

### Local Setup
To preview the website locally you have to install on your local machine the listed softwares below:
1. Install [git](https://git-scm.com/) to manage Git repository.
2. Install [Docker](https://www.docker.com/) to run a container from Docker file

***That's it! You do not need to install NodeJS interpreter and Yarn or NPM package manager***

### Get it
First of all, clone the repository `react-to-do-list` into your local machine:

```shell
git clone https://github.com/FabioAnsaldi/react-to-do-list.git
```
######

### Environment
Now you can run development environment and see the final result or if you want you can edit the project by running it through the developing environment

######

#### Development
Go to the new folder directory and run the following commands:
```shell
cd react-to-do-list
docker-compose up --build
```
> It runs developing environment. You can edit resources and watch result at specific local URL: http://localhost:3000/

#### Ide
If is useful for you to set an extra plugins for your Ide, you can find the `node_modules` folder and all of modules inside.
For example I usually use ESlint, such as in this repository, so I have to set the module directory folder in my Idee settings.
> Remember:
> You will have to install also NodeJS locally to use those modules inside to the folder  

#### Global Variables
You have to add an extra file named `.env` where there will be the `API_URL` and the `INITIAL_DATA` keys.
> API_URL=https://www.mocky.io/v2/
>
> INITIAL_DATA=5185415ba171ea3a00704eed

### Contributing
Feel free to make changes to the project files.
