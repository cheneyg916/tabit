import { ReactElement, ReactNode } from 'react';

export interface DetailProps {
  baseBackupUrl?: string;
  fallbackComponent?: ReactElement;
  isAutoJump?: boolean;
  project: string;
  children: ReactNode;
}
