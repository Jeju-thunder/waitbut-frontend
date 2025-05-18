export type Question = {
  id: number;
  title: string;
  content: string;
};

export type Questions = {
  questions: Question[];
  participantCount: number;
};
