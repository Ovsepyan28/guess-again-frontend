export interface Game {
  id: string;
  userId: string;
  score: number;
  lives: number;
  status: GameStatus;
  lastQuestionId: string | null;
}

export type Movie = {
  id: string;
  title: string;
  year: number;
};

export type Frame = {
  id: string;
  imageUrl: string;
  movieId: string;
};

export type QuestionModel = {
  id: string;
  gameId: string;
  frameId: string;
  correctAnswerId: string;
};

export type AnswerOption = {
  id: string;
  questionId: string;
  movieId: string;
};

export type Question = {
  id: QuestionModel['id'];
  imageUrl: Frame['imageUrl'];
  correctAnswerId: AnswerOption['id'];
  answerOptions: {
    answerOptionId: AnswerOption['id'];
    title: Movie['title'];
    year: Movie['year'];
  }[];
};

export type GameQuestionState = {
  gameId: Game['id'];
  lives: Game['lives'];
  score: Game['score'];
  status: GameStatus;
  questionId: Question['id'];
  imageUrl: Frame['imageUrl'];
  answerOptions: {
    answerOptionId: AnswerOption['id'];
    title: Movie['title'];
    year: Movie['year'];
  }[];
};

export enum GameStatus {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export type SubmitAnswerData = {
  gameId: Game['id'];
  questionId: Question['id'];
  selectedAnswerOptionId: AnswerOption['id'];
};

export type SubmitAnswerResponse = {
  selectedAnswerOptionId: AnswerOption['id'];
  correctAnswerId: AnswerOption['id'];
};

export type NewGameRequest = {
  gameId: Game['id'];
};
