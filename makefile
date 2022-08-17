restart: 
	- ./vendor/bin/sail up -d
	- ./vendor/bin/sail composer install
	- ./vendor/bin/sail artisan migrate:fresh --seed
	- ./vendor/bin/sail artisan optimize:clear
	- ./vendor/bin/sail artisan storage:link
	- ./vendor/bin/sail artisan h5p:storage-link


	
	