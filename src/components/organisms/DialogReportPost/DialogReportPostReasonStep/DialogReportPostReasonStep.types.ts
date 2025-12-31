import type { ReportIssueType } from '@/core/pipes/report';

export interface DialogReportPostReasonStepProps {
  /** Selected issue type */
  issueType: ReportIssueType;
  /** Current reason text */
  reason: string;
  /** True if reason has content */
  hasContent: boolean;
  /** True if submission is in progress */
  isSubmitting: boolean;
  /** Error message if any */
  error: string | null;
  /** Handler for reason textarea onChange */
  onReasonChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Handler to cancel/close the dialog */
  onCancel: () => void;
  /** Handler to submit the report */
  onSubmit: () => void;
}
