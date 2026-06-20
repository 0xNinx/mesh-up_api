export class SolutionHistoryDto {
  id: number;
  solutionId: number;
  content: string;
  editedBy: string;
  previousScore: number;
  editedAt: Date;
}
