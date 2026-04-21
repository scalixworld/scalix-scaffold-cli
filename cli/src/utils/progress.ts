import ora, { Ora } from 'ora';
import chalk from 'chalk';

export interface ProgressOptions {
  text?: string;
  spinner?: string;
  color?: string;
}

export class ProgressManager {
  private spinner: Ora | null = null;
  private startTime: number = 0;

  start(options: ProgressOptions = {}) {
    if (this.spinner) {
      this.spinner.stop();
    }

    this.spinner = ora({
      text: options.text || 'Working...',
      spinner: (options.spinner as any) || 'dots',
      color: (options.color as any) || 'blue'
    }).start();

    this.startTime = Date.now();
  }

  update(text: string) {
    if (this.spinner) {
      this.spinner.text = text;
    }
  }

  succeed(text?: string) {
    if (this.spinner) {
      const duration = Date.now() - this.startTime;
      const durationText = `(${Math.round(duration / 1000)}s)`;
      this.spinner.succeed(text || `${this.spinner.text} ${chalk.gray(durationText)}`);
      this.spinner = null;
    }
  }

  fail(text?: string) {
    if (this.spinner) {
      this.spinner.fail(text || this.spinner.text);
      this.spinner = null;
    }
  }

  warn(text?: string) {
    if (this.spinner) {
      this.spinner.warn(text || this.spinner.text);
      this.spinner = null;
    }
  }

  info(text?: string) {
    if (this.spinner) {
      this.spinner.info(text || this.spinner.text);
      this.spinner = null;
    }
  }

  stop() {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner = null;
    }
  }
}

// Global progress manager instance
export const progress = new ProgressManager();

// Convenience functions
export function startProgress(text: string, options: Partial<ProgressOptions> = {}) {
  progress.start({ text, ...options });
}

export function updateProgress(text: string) {
  progress.update(text);
}

export function succeedProgress(text?: string) {
  progress.succeed(text);
}

export function failProgress(text?: string) {
  progress.fail(text);
}

export function warnProgress(text?: string) {
  progress.warn(text);
}

export function infoProgress(text?: string) {
  progress.info(text);
}

export function stopProgress() {
  progress.stop();
}

// Step-based progress tracking
export class StepProgress {
  private totalSteps: number;
  private currentStep: number = 0;
  private progressManager: ProgressManager;

  constructor(totalSteps: number, initialText?: string) {
    this.totalSteps = totalSteps;
    this.progressManager = new ProgressManager();

    if (initialText) {
      this.progressManager.start({ text: `${initialText} (0/${totalSteps})` });
    }
  }

  next(text?: string) {
    this.currentStep++;
    const stepText = text || `Step ${this.currentStep}`;
    this.progressManager.update(`${stepText} (${this.currentStep}/${this.totalSteps})`);
  }

  complete(finalText?: string) {
    this.progressManager.succeed(finalText || `Completed ${this.currentStep}/${this.totalSteps} steps`);
  }

  fail(errorText?: string) {
    this.progressManager.fail(errorText || `Failed at step ${this.currentStep}/${this.totalSteps}`);
  }

  isComplete(): boolean {
    return this.currentStep >= this.totalSteps;
  }
}
