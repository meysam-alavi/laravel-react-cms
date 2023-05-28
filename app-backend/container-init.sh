rm -Rf ./public/storage
php artisan config:cache
php artisan storage:link
php artisan queue:work
touch ./text-file.txt
exec "$@"
