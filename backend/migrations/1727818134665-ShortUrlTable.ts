import { MigrationInterface, QueryRunner } from "typeorm";

export class ShortUrlTable1727818134665 implements MigrationInterface {
    name = 'ShortUrlTable1727818134665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Shorturl\` (\`id\` int NOT NULL AUTO_INCREMENT, \`longUrl\` varchar(255) NOT NULL, \`shortenedUrl\` varchar(255) NOT NULL, \`visitorsCount\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`Shorturl\``);
    }

}
