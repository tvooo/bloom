import passport from 'passport';
import { Router } from 'express';
const router = Router();
import auth from '../auth';
import { setPassword, toAuthJSON } from '../../database/users';

import db from '../../database/db';

router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const leuser = {...user};
  setPassword(leuser, user.password);
  console.log(leuser);
  db.run("INSERT INTO users (username, salt, hash) VALUES (?, ?, ?)", [leuser.username, leuser.salt, leuser.hash], (error) => {
  if (error) {
      return console.log('error', error)
  }
  return console.log('success')
});


  res.json({ user: toAuthJSON(leuser) });
  // const finalUser = new Users(user);

  // finalUser.setPassword(user.password);

  // return finalUser.save()
  //   .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

// //POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      console.log(user);
      // user.token = passportUser.generateJWT();

      return res.json({ user: toAuthJSON(user) });
    }

    return res.status(400).json(info);
  })(req, res, next);
});

export default router;
