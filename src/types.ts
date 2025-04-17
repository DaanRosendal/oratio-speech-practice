export type SpeechType = 'impromptu' | 'prepared' | 'evaluative';

export type Theme = 'technology' | 'society' | 'environment' | 'education' | 'philosophy';

export interface Topic {
  id: string;
  text: string;
  theme: Theme;
}

export interface TimerState {
  duration: number;
  isRunning: boolean;
  timeRemaining: number;
  showNumbers: boolean;
}