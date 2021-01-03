import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationFile1609708607548 implements MigrationInterface {
    name = 'MigrationFile1609708607548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `locations` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(255) NOT NULL, `latitude` double NOT NULL, `longitude` double NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comments` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `comment` varchar(249) NOT NULL, `ipAddressLocation` varchar(255) NOT NULL, `episode` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `episodes` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(255) NOT NULL, `releaseDate` datetime NOT NULL, `episodeCode` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `characters` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `firstName` varchar(300) NOT NULL, `lastName` varchar(300) NOT NULL, `status` enum ('ACTIVE', 'DEAD', 'UNKNOWN') NOT NULL, `stateOfOrigin` varchar(300) NOT NULL, `gender` enum ('MALE', 'FEMALE') NOT NULL, `location` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `characters_episodes_episodes` (`charactersId` int NOT NULL, `episodesId` int NOT NULL, INDEX `IDX_59460ddf268318b5635bc02b2d` (`charactersId`), INDEX `IDX_024978c488012760565a6f2634` (`episodesId`), PRIMARY KEY (`charactersId`, `episodesId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `comments` ADD CONSTRAINT `FK_dd53b044a0085a00221f41a152d` FOREIGN KEY (`episode`) REFERENCES `episodes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `characters` ADD CONSTRAINT `FK_fb87c651bd3d924298e688ff97f` FOREIGN KEY (`location`) REFERENCES `locations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `characters_episodes_episodes` ADD CONSTRAINT `FK_59460ddf268318b5635bc02b2db` FOREIGN KEY (`charactersId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `characters_episodes_episodes` ADD CONSTRAINT `FK_024978c488012760565a6f26347` FOREIGN KEY (`episodesId`) REFERENCES `episodes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `characters_episodes_episodes` DROP FOREIGN KEY `FK_024978c488012760565a6f26347`");
        await queryRunner.query("ALTER TABLE `characters_episodes_episodes` DROP FOREIGN KEY `FK_59460ddf268318b5635bc02b2db`");
        await queryRunner.query("ALTER TABLE `characters` DROP FOREIGN KEY `FK_fb87c651bd3d924298e688ff97f`");
        await queryRunner.query("ALTER TABLE `comments` DROP FOREIGN KEY `FK_dd53b044a0085a00221f41a152d`");
        await queryRunner.query("DROP INDEX `IDX_024978c488012760565a6f2634` ON `characters_episodes_episodes`");
        await queryRunner.query("DROP INDEX `IDX_59460ddf268318b5635bc02b2d` ON `characters_episodes_episodes`");
        await queryRunner.query("DROP TABLE `characters_episodes_episodes`");
        await queryRunner.query("DROP TABLE `characters`");
        await queryRunner.query("DROP TABLE `episodes`");
        await queryRunner.query("DROP TABLE `comments`");
        await queryRunner.query("DROP TABLE `locations`");
    }

}
