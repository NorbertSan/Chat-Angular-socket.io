import express from 'express';
import firebase from 'firebase';
import db from '../firebase/config';

const router = express.Router();

const USER_ROUTES_ERROR_CODES = {
  EMAIL_ALREADY_IN_USE: 'EMAIL_ALREADY_IN_USE',
};

interface IUserCreate {
  id: string;
  email: string;
  displayName: string;
}

interface ICreateUserBody {
  email: string;
  password: string;
  displayName: string;
}

// SIGN UP
router.route('/create').post(async (req, res) => {
  const body: ICreateUserBody = req.body;

  if (!body.email || !body.password || !body.displayName) {
    return res.status(400).json({ message: 'email,password,displayName fields are required' });
  }
  try {
    await firebase.auth().createUserWithEmailAndPassword(body.email, body.password);

    await firebase.auth().currentUser.updateProfile({
      displayName: body.displayName,
    });

    const userId: string = firebase.auth().currentUser.uid;
    const token: string = await firebase.auth().currentUser.getIdToken();

    const userData: IUserCreate = {
      id: userId,
      email: body.email,
      displayName: body.displayName,
    };

    await db.collection('users').doc(userId).set(userData);

    return res.status(201).json(token);
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      return res
        .status(402)
        .json({ code: USER_ROUTES_ERROR_CODES.EMAIL_ALREADY_IN_USE, message: err.message });
    }
    return res.json(err.message);
  }
});

export default router;
