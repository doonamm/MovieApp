set SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
set AUTOCOMMIT = 0;
set time_zone = "+00:00";

create database movieapp;

use movieapp;

create table `password_resets` (
    `email` varchar(255) not null,
    `token` varchar(255) not null,
    `created_at` timestamp null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

alter table `password_resets` add index `password_resets_email_index`(`email`);

create table `failed_jobs` (
    `id` bigint unsigned not null auto_increment primary key,
    `uuid` varchar(255) not null,
    `connection` text not null,
    `queue` text not null,
    `payload` longtext not null,
    `exception` longtext not null,
    `failed_at` timestamp default CURRENT_TIMESTAMP not null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

alter table `failed_jobs` add unique `failed_jobs_uuid_unique`(`uuid`);

create table `personal_access_tokens` (
    `id` bigint unsigned not null auto_increment primary key,
    `tokenable_type` varchar(255) not null,
    `tokenable_id` bigint unsigned not null,
    `name` varchar(255) not null,
    `token` varchar(64) not null,
    `abilities` text null,
    `last_used_at` timestamp null,
    `created_at` timestamp null,
    `updated_at` timestamp null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

alter table `personal_access_tokens` add index `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type`, `tokenable_id`);
alter table `personal_access_tokens` add unique `personal_access_tokens_token_unique`(`token`);

create table `users` (
    `id` int unsigned not null auto_increment primary key,
    `username` varchar(255) not null,
    `password` varchar(255) not null,
    `role` varchar(255) not null,
    `remember_token` varchar(100) null,
    `created_at` timestamp not null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

create table `profiles` (
    `user_id` int unsigned not null,
    `nickname` varchar(255) not null,
    `gender` enum('male', 'female') not null,
    `birthday` date not null,
    `avatar_url` varchar(255) not null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

create table `movies` (
    `id` int unsigned not null auto_increment primary key,
    `adult` tinyint(1) not null,
    `title` varchar(255) not null,
    `tagline` varchar(255) not null,
    `overview` varchar(255) not null,
    `status` varchar(255) not null,
    `poster_path` varchar(255) not null,
    `language` varchar(10) not null,
    `popularity` double not null,
    `vote_average` double not null,
    `vote_count` int not null,
    `revenue` bigint not null,
    `comment_count` int not null,
    `created_at` timestamp not null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

create table `comments` (
    `id` int unsigned not null auto_increment primary key,
    `user_id` int unsigned not null,
    `movie_id` int unsigned not null,
    `content` varchar(255) not null,
    `like_count` int not null,
    `created_at` timestamp not null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

create table `likes` (
    `user_id` int unsigned not null,
    `comment_id` int unsigned not null,
    `created_at` timestamp not null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

create table `actors` (
    `id` int unsigned not null auto_increment primary key,
    `name` varchar(255) not null,
    `popularity` double not null,
    `profile_path` varchar(255) not null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

create table `genres` (
    `id` int unsigned not null auto_increment primary key,
    `name` varchar(255) not null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

create table `casts` (
    `movie_id` int unsigned not null,
    `actor_id` int unsigned not null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

create table `movie_genres` (
    `movie_id` int unsigned not null,
    `genre_id` int unsigned not null
) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

alter table `comments` add constraint `comments_user_id_foreign` foreign key (`user_id`) references `users` (`id`);
alter table `comments` add constraint `comments_movie_id_foreign` foreign key (`movie_id`) references `movies` (`id`) on delete cascade;
alter table `likes` add constraint `likes_user_id_foreign` foreign key (`user_id`) references `users` (`id`);
alter table `likes` add constraint `likes_comment_id_foreign` foreign key (`comment_id`) references `comments` (`id`) on delete cascade;
alter table `profiles` add constraint `profiles_user_id_foreign` foreign key (`user_id`) references `users` (`id`);
alter table `casts` add constraint `casts_movie_id_foreign` foreign key (`movie_id`) references `movies` (`id`);
alter table `casts` add constraint `casts_actor_id_foreign` foreign key (`actor_id`) references `actors` (`id`);
alter table `movie_genres` add constraint `movie_genres_movie_id_foreign` foreign key (`movie_id`) references `movies` (`id`) on delete cascade;
alter table `movie_genres` add constraint `movie_genres_genre_id_foreign` foreign key (`genre_id`) references `genres` (`id`) on delete cascade;