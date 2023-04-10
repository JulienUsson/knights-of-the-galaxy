import type { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1681142011038 implements MigrationInterface {
  name = 'Init1681142011038'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ennemy" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "phase" integer NOT NULL, "type" varchar NOT NULL, "image" varchar, "life" varchar, "attack" varchar, "description" varchar NOT NULL)`,
    )
    await queryRunner.query(
      `CREATE TABLE "equipment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "dice1" varchar, "dice2" varchar, "dice3" varchar, "description" varchar NOT NULL)`,
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "passwordHash" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "equipment"`)
    await queryRunner.query(`DROP TABLE "ennemy"`)
  }
}
