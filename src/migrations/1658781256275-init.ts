import { MigrationInterface, QueryRunner } from "typeorm";

export class init1658781256275 implements MigrationInterface {
    name = 'init1658781256275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist_favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" uuid, CONSTRAINT "REL_6f93c0837ff9392c4ae066afdd" UNIQUE ("artistId"), CONSTRAINT "PK_9f5dd89dd13c0775ad60cbabc93" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album_favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" uuid, CONSTRAINT "REL_f6cca35bb5ade14debfc3f3bf2" UNIQUE ("albumId"), CONSTRAINT "PK_eac383da019a6b15de04a1fd448" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track_favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trackId" uuid, CONSTRAINT "REL_9a79616abf8be2bae9aef501c6" UNIQUE ("trackId"), CONSTRAINT "PK_921b99f6a91e0018100a876e846" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artist_favorites" ADD CONSTRAINT "FK_6f93c0837ff9392c4ae066afdde" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album_favorites" ADD CONSTRAINT "FK_f6cca35bb5ade14debfc3f3bf2f" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track_favorites" ADD CONSTRAINT "FK_9a79616abf8be2bae9aef501c63" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track_favorites" DROP CONSTRAINT "FK_9a79616abf8be2bae9aef501c63"`);
        await queryRunner.query(`ALTER TABLE "album_favorites" DROP CONSTRAINT "FK_f6cca35bb5ade14debfc3f3bf2f"`);
        await queryRunner.query(`ALTER TABLE "artist_favorites" DROP CONSTRAINT "FK_6f93c0837ff9392c4ae066afdde"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "track_favorites"`);
        await queryRunner.query(`DROP TABLE "album_favorites"`);
        await queryRunner.query(`DROP TABLE "artist_favorites"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
    }

}
