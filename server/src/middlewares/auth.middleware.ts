import { USER_ROUTES_ERROR_CODES } from './../routes/userRouter';
import { admin } from '../firebase/config';
import firebase from 'firebase';

interface DecodedIdToken {
  aud: string;
  auth_time: number;
  email?: string;
  email_verified?: boolean;
  exp: number;
  firebase: {
    identities: {
      [key: string]: any;
    };
    sign_in_provider: string;
    sign_in_second_factor?: string;
    second_factor_identifier?: string;
    tenant?: string;
    [key: string]: any;
  };
  iat: number;
  iss: string;
  phone_number?: string;
  picture?: string;
  sub: string;
  uid: string;
  [key: string]: any;
}

export const authMiddleware = async (req, res, next) => {
  const token: string = req.headers.authorization?.split('Bearer ')?.[1];

  try {
    const decodedIdToken: DecodedIdToken = await admin.auth().verifyIdToken(token);
    if (new Date().getTime() > decodedIdToken.exp * 1000) {
      await firebase.auth().signOut();
      return res.status(401).json({ code: USER_ROUTES_ERROR_CODES.TOKEN_EXPIRED });
    }

    next();
  } catch {
    return res.json(401).json({ code: USER_ROUTES_ERROR_CODES.INVALID_TOKEN });
  }
};
