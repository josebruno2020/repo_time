import { RepositoryEntity } from 'src/repository/repository.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ default: false })
  isTracking: boolean;

  @ManyToMany(() => RepositoryEntity, (r) => r.projects)
  @JoinTable({ name: 'repositories_projects_projects' })
  repositories: RepositoryEntity[];
}
