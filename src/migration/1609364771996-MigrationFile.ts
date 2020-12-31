import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationFile1609364771996 implements MigrationInterface {
    name = 'MigrationFile1609364771996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `locations` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `locations` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `characters` DROP FOREIGN KEY `FK_fb87c651bd3d924298e688ff97f`");
        await queryRunner.query("ALTER TABLE `characters` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `characters` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `characters` CHANGE `location` `location` int NULL");
        await queryRunner.query("ALTER TABLE `comments` DROP FOREIGN KEY `FK_dd53b044a0085a00221f41a152d`");
        await queryRunner.query("ALTER TABLE `comments` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `comments` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `comments` CHANGE `episode` `episode` int NULL");
        await queryRunner.query("ALTER TABLE `episodes` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `episodes` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `character_episodes` DROP FOREIGN KEY `FK_1935dcd1c1846c165ed28f8dc56`");
        await queryRunner.query("ALTER TABLE `character_episodes` DROP FOREIGN KEY `FK_ce5be248ed33896a2874e848f07`");
        await queryRunner.query("ALTER TABLE `character_episodes` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `character_episodes` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `character_episodes` CHANGE `character` `character` int NULL");
        await queryRunner.query("ALTER TABLE `character_episodes` CHANGE `episode` `episode` int NULL");
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
        await queryRunner.query("ALTER TABLE `character_episodes` CHANGE `episode` `episode` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `character_episodes` CHANGE `character` `character` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `character_episodes` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `character_episodes` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `character_episodes` ADD CONSTRAINT `FK_ce5be248ed33896a2874e848f07` FOREIGN KEY (`episode`) REFERENCES `episodes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `character_episodes` ADD CONSTRAINT `FK_1935dcd1c1846c165ed28f8dc56` FOREIGN KEY (`character`) REFERENCES `characters`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `episodes` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `episodes` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `comments` CHANGE `episode` `episode` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `comments` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `comments` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `comments` ADD CONSTRAINT `FK_dd53b044a0085a00221f41a152d` FOREIGN KEY (`episode`) REFERENCES `episodes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `characters` CHANGE `location` `location` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `characters` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `characters` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `characters` ADD CONSTRAINT `FK_fb87c651bd3d924298e688ff97f` FOREIGN KEY (`location`) REFERENCES `locations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `locations` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `locations` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

}