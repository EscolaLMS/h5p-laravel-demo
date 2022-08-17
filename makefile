restart: 
	- docker run --rm -u "$(id -u):$(id -g)" -v $(pwd):/var/www/html     -w /var/www/html laravelsail/php81-composer:latest composer install --ignore-platform-reqs
	- ./vendor/bin/sail up -d
	- ./vendor/bin/sail composer install
	- ./vendor/bin/sail artisan migrate:fresh --seed
	- ./vendor/bin/sail artisan optimize:clear
	- ./vendor/bin/sail artisan storage:link
	- ./vendor/bin/sail artisan h5p:storage-link