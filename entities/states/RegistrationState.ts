import SignUpEntity from '../SignUpEntity';
import AuthInfoEntity from '../AuthInfoEntity';

interface RegistrationState {
  signup: SignUpEntity;
  authInfo: AuthInfoEntity;
}

export default RegistrationState;
