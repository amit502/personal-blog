import { Alert, Snackbar } from '@mui/material';
import {
    useSetStatus,
    useStatusMessage,
    useStatusType,
} from '../context/statusContext';
import { useEffect, useState } from 'react';

export const SNACKBAR_TYPE = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    INFO: 'INFO',
};

const GlobalAlert = () => {
    const setStatus = useSetStatus();
    const type = useStatusType();
    const message = useStatusMessage();

    const [display, setDisplay] = useState(type && message ? true : false);

    const handleSetStatus = (d: boolean, t: string, m: string) => {
        setDisplay(d);
        setStatus(t, m);
    };

    useEffect(() => {
        if (type && message) {
            setDisplay(true);
        } else {
            setDisplay(false);
        }
    }, [type, message]);

    return (
        <Snackbar
            open={display}
            autoHideDuration={3000}
            onClose={() => handleSetStatus(false, '', '')}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <Alert
                onClose={() => handleSetStatus(false, '', '')}
                severity={
                    type === SNACKBAR_TYPE.SUCCESS
                        ? 'success'
                        : type === SNACKBAR_TYPE.ERROR
                        ? 'error'
                        : type === SNACKBAR_TYPE.INFO
                        ? 'info'
                        : 'warning'
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
export default GlobalAlert;
