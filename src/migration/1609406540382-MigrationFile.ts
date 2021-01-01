import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationFile1609406540382 implements MigrationInterface {
    name = 'MigrationFile1609406540382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `locations` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(255) NOT NULL, `latitude` double NOT NULL, `longitude` double NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comments` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `comment` varchar(249) NOT NULL, `ipAddressLocation` varchar(255) NOT NULL, `episode` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `episodes` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(255) NOT NULL, `releaseDate` datetime NOT NULL, `episodeCode` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `characters` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `firstName` varchar(300) NOT NULL, `lastName` varchar(300) NOT NULL, `status` enum ('ACTIVE', 'DEAD', 'UNKNOWN') NOT NULL, `stateOfOrigin` varchar(300) NOT NULL, `gender` enum ('MALE', 'FEMALE') NOT NULL, `location` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `character_episodes` (`charactersId` int NOT NULL, `episodesId` int NOT NULL, INDEX `IDX_e0e49f8df4f142771e6007bb2f` (`charactersId`), INDEX `IDX_f9ccbb6f8bd69babbfa6b18024` (`episodesId`), PRIMARY KEY (`charactersId`, `episodesId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `comments` ADD CONSTRAINT `FK_dd53b044a0085a00221f41a152d` FOREIGN KEY (`episode`) REFERENCES `episodes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `characters` ADD CONSTRAINT `FK_fb87c651bd3d924298e688ff97f` FOREIGN KEY (`location`) REFERENCES `locations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `character_episodes` ADD CONSTRAINT `FK_e0e49f8df4f142771e6007bb2f3` FOREIGN KEY (`charactersId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `character_episodes` ADD CONSTRAINT `FK_f9ccbb6f8bd69babbfa6b180243` FOREIGN KEY (`episodesId`) REFERENCES `episodes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `character_episodes` DROP FOREIGN KEY `FK_f9ccbb6f8bd69babbfa6b180243`");
        await queryRunner.query("ALTER TABLE `character_episodes` DROP FOREIGN KEY `FK_e0e49f8df4f142771e6007bb2f3`");
        await queryRunner.query("ALTER TABLE `characters` DROP FOREIGN KEY `FK_fb87c651bd3d924298e688ff97f`");
        await queryRunner.query("ALTER TABLE `comments` DROP FOREIGN KEY `FK_dd53b044a0085a00221f41a152d`");
        await queryRunner.query("DROP INDEX `IDX_f9ccbb6f8bd69babbfa6b18024` ON `character_episodes`");
        await queryRunner.query("DROP INDEX `IDX_e0e49f8df4f142771e6007bb2f` ON `character_episodes`");
        await queryRunner.query("DROP TABLE `character_episodes`");
        await queryRunner.query("DROP TABLE `characters`");
        await queryRunner.query("DROP TABLE `episodes`");
        await queryRunner.query("DROP TABLE `comments`");
        await queryRunner.query("DROP TABLE `locations`");
    }

}
