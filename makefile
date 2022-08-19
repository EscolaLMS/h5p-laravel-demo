TOPDIR=$(PWD)
IDU=$(id -u)
IDG=$(id -g)
restart: 
	- docker run --rm -u "$(IDU):$(IDG)" -v $(TOPDIR):/var/www/html     -w /var/www/html laravelsail/php81-composer:latest composer install --ignore-platform-reqs
	- ./vendor/bin/sail up -d
	- ./vendor/bin/sail composer install
	- ./vendor/bin/sail artisan migrate:fresh --seed
	- ./vendor/bin/sail artisan optimize:clear
	- ./vendor/bin/sail artisan storage:link
	- ./vendor/bin/sail artisan h5p:storage-link

update:
	- git pull origin main
	- ./vendor/bin/sail npm install
	- ./vendor/bin/sail npm run build
	- ./vendor/bin/sail composer update
	- ./vendor/bin/sail artisan migrate
	- ./vendor/bin/sail artisan optimize:clear
	