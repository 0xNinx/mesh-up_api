import { Entity, Column } from 'typeorm';

export class UserEmailPreferences {
  @Column({ default: true })
  onComment: boolean;

  @Column({ default: true })
  onRanked: boolean;

  @Column({ default: true })
  onNewSolution: boolean;

  @Column({ default: true })
  weeklyDigest: boolean;
}

@Entity('users')
export class User {
  // ... Keep existing columns intact

  @Column(() => UserEmailPreferences)
  emailPreferences: UserEmailPreferences;
}