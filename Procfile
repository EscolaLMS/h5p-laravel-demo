web: vendor/bin/heroku-php-apache2 public/
release: touch database/database.sqlite && cp .env.heroku .env && php artisan config:cache && php artisan migrate:fresh --seed && php artisan storage:link && php artisan h5p:storage-link && php artisan passport:keys
