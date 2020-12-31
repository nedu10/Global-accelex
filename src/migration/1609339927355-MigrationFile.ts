import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationFile1609339927355 implements MigrationInterface {
    name = 'MigrationFile1609339927355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `locations` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(255) NOT NULL, `latitude` double NOT NULL, `longitude` double NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `characters` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `firstName` varchar(300) NOT NULL, `lastName` varchar(300) NOT NULL, `status` enum ('ACTIVE', 'DEAD', 'UNKNOWN') NOT NULL, `stateOfOrigin` varchar(300) NOT NULL, `gender` enum ('MALE', 'FEMALE') NOT NULL, `location` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comments` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `comment` varchar(249) NOT NULL, `ipAddressLocation` varchar(255) NOT NULL, `episode` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `episodes` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(255) NOT NULL, `releaseDate` datetime NOT NULL, `episodeCode` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `character_episodes` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `character` int NULL, `episode` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `characters` ADD CONSTRAINT `FK_fb87c651bd3d924298e688ff97f` FOREIGN KEY (`location`) REFERENCES `locations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comments` ADD CONSTRAINT `FK_dd53b044a0085a00221f41a152d` FOREIGN KEY (`episode`) REFERENCES `episodes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `character_episodes` ADD CONSTRAINT `FK_1935dcd1c1846c165ed28f8dc56` FOREIGN KEY (`character`) REFERENCES `characters`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `character_episodes` ADD CONSTRAINT `FK_ce5be248ed33896a2874e848f07` FOREIGN KEY (`episode`) REFERENCES `episodes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `character_episodes` DROP FOREIGN KEY `FK_ce5be248ed33896a2874e848f07`");
        await queryRunner.query("ALTER TABLE `character_episodes` DROP FOREIGN KEY `FK_1935dcd1c1846c165ed28f8dc56`");
        await queryRunner.query("ALTER TABLE `comments` DROP FOREIGN KEY `FK_dd53b044a0085a00221f41a152d`");
        await queryRunner.query("ALTER TABLE `characters` DROP FOREIGN KEY `FK_fb87c651bd3d924298e688ff97f`");
        await queryRunner.query("DROP TABLE `character_episodes`");
        await queryRunner.query("DROP TABLE `episodes`");
        await queryRunner.query("DROP TABLE `comments`");
        await queryRunner.query("DROP TABLE `characters`");
        await queryRunner.query("DROP TABLE `locations`");
    }

}
