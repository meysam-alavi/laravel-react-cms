FROM php:7.4-apache

# Arguments defined in docker-compose.yaml
ARG user
ARG uid

ENV \
    PHP_MEMORY_LIMIT=2048M \
    PHP_UPLOAD_MAX_FILESIZE=2048M \
    PHP_POST_MAX_SIZE=2048M \
    PHP_MAX_INPUT_TIME=36000

# install system dependencies
RUN apt-get update && \
    apt-get install -y -qq git \
        libzip-dev \
        libjpeg62-turbo-dev \
        apt-transport-https \
        libfreetype6-dev \
        libmcrypt-dev \
        libpng-dev \
        libssl-dev \
        zip unzip \
        wget \
        vim

# Install PHP extensions
RUN pecl install redis && docker-php-ext-enable redis
RUN docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/
RUN docker-php-ext-install -j$(nproc) iconv zip pdo pdo_mysql gd bcmath

# clear cache
#RUN apt-get clean && rm -rf /var/lib/apt/lists/*

COPY ./.docker/apache2/vhost.conf /etc/apache2/sites-available/000-default.conf
#COPY ./.docker/apache2/apache2.conf /etc/apache2/apache2.conf

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

RUN chown -R www-data:www-data /var/www/html && a2enmod rewrite


# Set working directory
WORKDIR /var/www/html/

COPY container-init.sh .
RUN chmod 0755 /var/www/html/container-init.sh
RUN ./container-init.sh

USER $user
