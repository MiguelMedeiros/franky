'use client';

import { useState } from 'react';
import type { ReportIssueType } from '@/core/pipes/report';
import * as Core from '@/core';
import { POST_ROUTES } from '@/app/routes';
import * as Hooks from '@/hooks';
import { REPORT_POST_STEPS, REPORT_API_ENDPOINT, type ReportPostStep } from './useReportPost.constants';
import type { TUseReportPostReturn } from './useReportPost.types';

/**
 * Hook to handle post reporting to Chatwoot.
 *
 * Manages the two-step reporting flow:
 * 1. Issue selection - user selects the type of issue
 * 2. Reason input - user provides detailed description
 *
 * @param postId - Composite post ID in format "author:postId"
 * @returns Report state and handlers
 */
export function useReportPost(postId: string): TUseReportPostReturn {
  const { currentUserPubky, userDetails } = Hooks.useCurrentUserProfile();
  const parsedId = Core.parseCompositeId(postId);
  const postUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${POST_ROUTES.POST}/${parsedId.pubky}/${parsedId.id}`;

  const [step, setStep] = useState<ReportPostStep>(REPORT_POST_STEPS.ISSUE_SELECTION);
  const [selectedIssueType, setSelectedIssueType] = useState<ReportIssueType | null>(null);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectIssueType = (issueType: ReportIssueType) => {
    setSelectedIssueType(issueType);
    setStep(REPORT_POST_STEPS.REASON_INPUT);
    setError(null);
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
    setError(null);
  };

  const goBackToIssueSelection = () => {
    setStep(REPORT_POST_STEPS.ISSUE_SELECTION);
    setReason('');
    setError(null);
  };

  const submit = async () => {
    const trimmedReason = reason.trim();
    const canSubmit = trimmedReason && selectedIssueType && !isSubmitting;

    if (!canSubmit) return;

    if (!currentUserPubky || !userDetails?.name) {
      setError('User profile not loaded. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(REPORT_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pubky: currentUserPubky,
          postUrl,
          issueType: selectedIssueType,
          reason: trimmedReason,
          name: userDetails.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        const errorMessage = errorData.error || 'Failed to submit report';
        setError(errorMessage);
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting report:', err);
      setError('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep(REPORT_POST_STEPS.ISSUE_SELECTION);
    setSelectedIssueType(null);
    setReason('');
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
  };

  const hasContent = reason.trim().length > 0;

  return {
    step,
    selectedIssueType,
    reason,
    isSubmitting,
    isSuccess,
    error,
    hasContent,
    selectIssueType,
    handleReasonChange,
    goBackToIssueSelection,
    submit,
    reset,
  };
}
