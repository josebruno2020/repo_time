import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class InitMigration1730839799307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tabela projects
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          }),
          new TableColumn({
            name: 'isActive',
            type: 'boolean',
            default: true,
          }),
          new TableColumn({
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          }),
          new TableColumn({
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'isTracking',
            type: 'boolean',
            default: false,
          }),
        ],
      }),
    );

    // Tabela repositories
    await queryRunner.createTable(
      new Table({
        name: 'repositories',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          }),
          new TableColumn({
            name: 'isActive',
            type: 'boolean',
            default: true,
          }),
          new TableColumn({
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          }),
          new TableColumn({
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            isUnique: true,
          }),
          new TableColumn({
            name: 'description',
            type: 'varchar',
            isNullable: true,
          }),
        ],
      }),
    );

    // Tabela repositories_time
    await queryRunner.createTable(
      new Table({
        name: 'repositories_time',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          }),
          new TableColumn({
            name: 'isActive',
            type: 'boolean',
            default: true,
          }),
          new TableColumn({
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          }),
          new TableColumn({
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          }),
          new TableColumn({
            name: 'date',
            type: 'date',
          }),
          new TableColumn({
            name: 'repositoryId',
            type: 'uuid',
          }),
          new TableColumn({
            name: 'hours',
            type: 'integer',
          }),
          new TableColumn({
            name: 'minutes',
            type: 'integer',
          }),
          new TableColumn({
            name: 'seconds',
            type: 'integer',
          }),
          new TableColumn({
            name: 'totalSeconds',
            type: 'decimal',
            isNullable: true,
          }),
        ],
      }),
    );

    // Chave estrangeira repositories_time -> repositories
    await queryRunner.createForeignKey(
      'repositories_time',
      new TableForeignKey({
        columnNames: ['repositoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'repositories',
        onDelete: 'CASCADE',
      }),
    );

    // Tabela de junção repositories_projects_projects
    await queryRunner.createTable(
      new Table({
        name: 'repositories_projects_projects',
        columns: [
          new TableColumn({
            name: 'projectsId',
            type: 'uuid',
            isPrimary: true,
          }),
          new TableColumn({
            name: 'repositoriesId',
            type: 'uuid',
            isPrimary: true,
          }),
        ],
      }),
    );

    // Chaves estrangeiras para a tabela de junção
    await queryRunner.createForeignKeys('repositories_projects_projects', [
      new TableForeignKey({
        columnNames: ['projectsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['repositoriesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'repositories',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('repositories_projects_projects');
    await queryRunner.dropTable('repositories_time');
    await queryRunner.dropTable('repositories');
    await queryRunner.dropTable('projects');
  }
}
