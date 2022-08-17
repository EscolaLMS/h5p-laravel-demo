# H5P Laravel implementation demo

## Working demo

This project is deployed on heroku - available at [https://h5p-laravel-demo.herokuapp.com/](https://h5p-laravel-demo.herokuapp.com/)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/EscolaLMS/h5p-laravel-demo)

## Installation

This project is a standard Laravel project, there are multiple ways to install it on your machine.
Below is one that use [Laravel Sail](https://laravel.com/docs/9.x/sail) - Laravel's default Docker development environment

Unless you have `sail` alias created use ` ./vendor/bin/sail` where `sail` below.

1. Clone this repository `git clone git@github.com:EscolaLMS/h5p-laravel-demo.git`
2. Launch project with `sail up -d`
3. Install dependencies `sail composer install`
4. Migrate and seed all the essential database data `sail artisan migrate:fresh --seed`
5. Create a storage link `sail artisan storage:link`
6. Create h5p storage link `sail artisan h5p:storage-link`

Open the app at [http://localhost](http://localhost) and login with default credentials

## Using the app

You need to be login to be using the app, once you have user token you're able to

-   Install h5p libraries from h5p.org with the visual hub
-   Create h5p content from the libraries
-   Upload h5p content from reused apps that use h5p format (like h5p.org)
-   Preview h5p created content

All of the features are available thought REST API, there are no blade templates of using server side rendering `H5PIntegration` global js variable, this is a different approach then `moodle`, `drupal` and `wordpress` h5p plugins.

Demo API and Frontend is working on the same domain, which is not what [escolalms/headless-h5p](https://packagist.org/packages/escolalms/headless-h5p) was build for, yet this is just an simples example showing the features this library have.

In order to have API working headlessly you need to provide valid [`CORS` settings](https://github.com/fruitcake/laravel-cors), ale fonts should be set with correct headers, which must be set on server level.

## Deploying on heroku

There is [Procfile](./Procfile) already in the repo. Once you deploy and build on heroku login to console and run commands in [heroku.sh](./heroku.sh) scripts.

`heroku ps:exec --dyno=web.1 -a h5p-laravel-demo bash` then run `./heroku.sh`
