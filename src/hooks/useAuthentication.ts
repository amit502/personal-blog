import { useContext } from 'react';
import { AuthenticationContext } from '../context/authenticationContext';

const useAuthentication = () => {
    const user = useContext(AuthenticationContext);
    return user;
};

export default useAuthentication;
