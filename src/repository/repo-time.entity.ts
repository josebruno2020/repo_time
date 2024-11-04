import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RepositoryEntity } from './repository.entity';

@Entity({ name: 'repositories_time' })
export class RepoTime extends BaseEntity {
  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => RepositoryEntity)
  @JoinColumn()
  repository: RepositoryEntity;

  @Column({ type: 'integer' })
  hours: number;

  @Column({ type: 'integer' })
  minutes: number;

  @Column({ type: 'integer' })
  seconds: number;

  @Column({ type: 'decimal', nullable: true })
  totalSeconds: number;
}
