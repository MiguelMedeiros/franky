import type { ReportIssueType } from '@/core/pipes/report';
import type { ReportPostStep } from './useReportPost.constants';

/**
 * Return type of useReportPost hook
 */
export interface TUseReportPostReturn {
  /** Current step in the report flow */
  step: ReportPostStep;
  /** Selected issue type, null if not selected */
  selectedIssueType: ReportIssueType | null;
  /** Reason text entered by user */
  reason: string;
  /** True while submission is in progress */
  isSubmitting: boolean;
  /** True after successful submission */
  isSuccess: boolean;
  /** Error message if submission failed */
  error: string | null;
  /** True if reason has non-whitespace content */
  hasContent: boolean;
  /** Select an issue type and advance to reason step */
  selectIssueType: (issueType: ReportIssueType) => void;
  /** Handler for reason textarea onChange */
  handleReasonChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Go back to issue selection step */
  goBackToIssueSelection: () => void;
  /** Submit the report */
  submit: () => Promise<void>;
  /** Reset all state to initial values */
  reset: () => void;
}
