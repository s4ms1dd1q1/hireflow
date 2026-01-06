
export enum ApplicationStage {
  WISHLIST = 'Wishlist',
  APPLIED = 'Applied',
  INTERVIEWING = 'Interviewing',
  OFFER = 'Offer Extended',
  HIRED = 'Hired',
  ARCHIVED = 'Archived'
}

export interface Application {
  id: string;
  company: string;
  role: string;
  location: string;
  stage: ApplicationStage;
  dateApplied?: string;
  salaryRange?: string;
  description: string;
  notes: string;
  resumeVersion?: string;
  logoUrl?: string;
}

export interface Resume {
  id: string;
  name: string;
  content: string;
  version: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalApplied: number;
  interviewsScheduled: number;
  offersReceived: number;
  successRate: number;
}
