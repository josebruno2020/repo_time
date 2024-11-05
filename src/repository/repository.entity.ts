import { Project } from 'src/project/project.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { RepoTime } from './repo-time.entity';

@Entity({ name: 'repositories' })
export class RepositoryEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[];

  @OneToMany(() => RepoTime, (rt) => rt.repository)
  times: RepoTime[];
}
