
import { Application, ApplicationStage, Resume } from './types';

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: '1',
    company: 'Linear',
    role: 'Senior Frontend Engineer',
    location: 'Remote',
    stage: ApplicationStage.INTERVIEWING,
    dateApplied: '2024-03-15',
    salaryRange: '$160k - $200k',
    description: 'Looking for experts in React, TypeScript, and high-performance UI systems.',
    notes: 'Had initial call with recruiter. Technical round scheduled for Tuesday.',
    resumeVersion: 'Standard-V1',
    logoUrl: 'https://picsum.photos/seed/linear/40/40'
  },
  {
    id: '2',
    company: 'Stripe',
    role: 'Product Designer',
    location: 'San Francisco, CA',
    stage: ApplicationStage.APPLIED,
    dateApplied: '2024-03-20',
    salaryRange: '$180k - $230k',
    description: 'Crafting the future of global commerce through world-class design.',
    notes: 'Referral from Sarah.',
    resumeVersion: 'Design-Focus-V2',
    logoUrl: 'https://picsum.photos/seed/stripe/40/40'
  },
  {
    id: '3',
    company: 'OpenAI',
    role: 'AI Interface Engineer',
    location: 'Hybrid',
    stage: ApplicationStage.WISHLIST,
    description: 'Build intuitive interfaces for powerful foundation models.',
    notes: 'Preparing portfolio before applying.',
    logoUrl: 'https://picsum.photos/seed/openai/40/40'
  }
];

export const MOCK_RESUMES: Resume[] = [
  {
    id: 'r1',
    name: 'Main Resume',
    content: 'Experienced software engineer with 5 years in React and TypeScript. Specializing in high-performance web applications and UI systems. Previously worked at TechCorp and DevStudio.',
    version: 'Standard-V1',
    updatedAt: '2024-03-01'
  },
  {
    id: 'r2',
    name: 'Design-Focused CV',
    content: 'Full-stack designer with a passion for beautiful interfaces. Expert in React, Tailwind CSS, and Figma. 4 years of experience delivering pixel-perfect products.',
    version: 'Design-Focus-V2',
    updatedAt: '2024-03-10'
  }
];

export const STAGE_COLORS: Record<ApplicationStage, string> = {
  [ApplicationStage.WISHLIST]: 'bg-slate-100 text-slate-600',
  [ApplicationStage.APPLIED]: 'bg-blue-50 text-blue-600',
  [ApplicationStage.INTERVIEWING]: 'bg-amber-50 text-amber-600',
  [ApplicationStage.OFFER]: 'bg-emerald-50 text-emerald-600',
  [ApplicationStage.HIRED]: 'bg-indigo-50 text-indigo-600',
  [ApplicationStage.ARCHIVED]: 'bg-gray-100 text-gray-500'
};
