rm -Rf ./public/storage
php artisan config:cache
php artisan storage:link
exec "$@"
