import { authMiddleware } from './../middlewares/auth.middleware';
import { checkMandatoryFields } from './../utilities/validators';
import express from 'express';
import firebase from 'firebase';
import { db } from '../firebase/config';

const router = express.Router();

export const USER_ROUTES_ERROR_CODES = {
  EMAIL_ALREADY_IN_USE: 'EMAIL_ALREADY_IN_USE',
  WRONG_CREDENTIALS: 'WRONG_CREDENTIALS',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',
};

interface IApiReqUserCreate {
  email: string;
  password: string;
  displayName: string;
}
interface ICreateUserBody {
  email: string;
  id: string;
  displayName: string;
}
interface IApiReqUserLogin {
  email: string;
  password: string;
}

// SIGN UP
router.route('/create').post(async (req, res) => {
  const body: IApiReqUserCreate = req.body;
  const errorMsg: string | null = checkMandatoryFields(['email', 'password', 'displayName'], body);
  if (errorMsg) {
    return res.status(400).json({ message: errorMsg });
  }

  try {
    await firebase.auth().createUserWithEmailAndPassword(body.email, body.password);

    await firebase.auth().currentUser.updateProfile({
      displayName: body.displayName,
    });

    const currentUser = firebase.auth().currentUser;
    const userId: string = currentUser.uid;
    const idToken: string = await currentUser.getIdToken();
    const refreshToken: string = currentUser.refreshToken;

    const userData: ICreateUserBody = {
      id: userId,
      email: body.email,
      displayName: body.displayName,
    };

    await db.collection('users').doc(userId).set(userData);

    return res.status(201).json({ idToken, refreshToken });
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      return res
        .status(402)
        .json({ code: USER_ROUTES_ERROR_CODES.EMAIL_ALREADY_IN_USE, message: err.message });
    }
    return res.json(err.message);
  }
});

router.route('/login').post(async (req, res) => {
  const body: IApiReqUserLogin = req.body;

  const errorMsg: string | null = checkMandatoryFields(['email', 'password'], body);
  if (errorMsg) {
    return res.status(400).json({ message: errorMsg });
  }

  try {
    const currentUser = await firebase.auth().signInWithEmailAndPassword(body.email, body.password);
    const idToken: string = await currentUser.user.getIdToken();
    const refreshToken: string = currentUser.user.refreshToken;

    return res.status(200).json({ idToken, refreshToken });
  } catch (err) {
    if (err.code === 'auth/wrong-password' || 'auth/user-not-found') {
      return res.status(401).json({ code: USER_ROUTES_ERROR_CODES.WRONG_CREDENTIALS });
    }
    return res.status(500).json(err);
  }
});

router.route('/logout').post(authMiddleware, async (req, res) => {
  return res.status(200).json({ code: USER_ROUTES_ERROR_CODES.LOGOUT_SUCCESS });
});

export default router;
