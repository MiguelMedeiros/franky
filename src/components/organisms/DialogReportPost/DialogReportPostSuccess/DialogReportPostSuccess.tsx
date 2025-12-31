'use client';

import * as Atoms from '@/atoms';
import * as Libs from '@/libs';
import type { DialogReportPostSuccessProps } from './DialogReportPostSuccess.types';

export function DialogReportPostSuccess({ onOpenChange }: DialogReportPostSuccessProps) {
  return (
    <>
      <Atoms.DialogHeader>
        <Atoms.DialogTitle>Report Submitted</Atoms.DialogTitle>
        <Atoms.DialogDescription className="sr-only">
          Thank you for your report. We will review it and take appropriate action.
        </Atoms.DialogDescription>
      </Atoms.DialogHeader>
      <Atoms.DialogFooter className="flex-row justify-end">
        <Atoms.DialogClose asChild>
          <Atoms.Button
            variant="dark-outline"
            size="lg"
            onClick={() => onOpenChange(false)}
            className="rounded-full"
            aria-label="Close dialog"
          >
            <Libs.Check className="mr-2 h-4 w-4" aria-hidden="true" />
            Done
          </Atoms.Button>
        </Atoms.DialogClose>
      </Atoms.DialogFooter>
    </>
  );
}
