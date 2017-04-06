# 17High

[![Build Status](https://travis-ci.org/tw-wh-devops-community/17high_web.svg?branch=development)](https://travis-ci.org/tw-wh-devops-community/17high_web)

## Requirement:

[Docker](https://docs.docker.com/docker-for-mac/install/#download-docker-for-mac) is installed;
## install front develop dependency
```
Enter src/websrc, read README.md and prepare develop environment
And then You need to do nothing but read  'Run Spring boot on local' section.
```
## Run Spring boot on local

~~~
./localrun.sh
This script contains 'yarn bundle-watch' and './gradlew bootRun',so springboot will start, and react will automatic compile.
~~~
You don't need start mysql on local manually. bootRun will start a local mysql Docker automatically.

## Run backend test
~~~
./gradlew check
~~~

## Run backend unit test alone
~~~
./gradlew test
~~~

## Run backend integration test alone
~~~
./gradlew integration
~~~
integration test will use h2 in memory database as its data backbone.

## Run Mysql on local Docker
you can run
```
./startMysql.sh
```
to start a local Docker with Mysql 5.7 ( This step is already integrated to gradle bootRun)

## Run Sonarqube on local

### Requirement:
A Docker Deamon is running, you can use docker-machine create a local VM to host Docker server like:
```
docker-machine create --driver virtualbox default.
```
```
eval $(docker-machine env default)
```

### Start Sonarqube on local
```
cd Sonarqube
docker-compose up
```
### Check the VM IP
```
docker-machine env default
#或
docker-machine ssh default 'ifconfig eth1 | grep "inet addr:" | cut -d: -f2 | cut -d" " -f1'
```

### Run Sonar by gradle
```
gradle sonarqube
```
then open http://VM-IP:9000 to view sonarqube
