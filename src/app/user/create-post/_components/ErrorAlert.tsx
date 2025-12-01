import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import React from 'react';


interface ErrorAlertProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    errorMessages: { message: string }[];
    setErrorMessages: (messages: { message: string }[]) => void;
}

const ErrorAlert = ({
    open,
    setOpen,
    errorMessages,
    setErrorMessages,
}: ErrorAlertProps) => {

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Error</AlertDialogTitle>
                    <AlertDialogDescription>
                        {errorMessages.map((err, i) => (
                            <React.Fragment key={i}>
                                <span className="text-sm text-red-600">{err.message}</span>
                                <br />
                            </React.Fragment>
                        ))}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={() => {
                            setErrorMessages([]);
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ErrorAlert