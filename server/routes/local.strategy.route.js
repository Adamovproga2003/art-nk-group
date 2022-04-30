const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('./../controllers/auth.controller')

router.post(
    '/sign-up',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        if (req.authInfo.message) {
            return res.status(400).json({
                errors: [{ message: req.authInfo.message }]
            })
        }
        if (req.user) {
            const body = { _id: req.user._id, email: req.user.email };
            const token = jwt.sign({ user: body }, 'TOP_SECRET', { expiresIn: '1d' });
            return res.status(200).json({
                message: 'Signup successful',
                user: req.user,
                token
            })
        }
    }
);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        console.log(err)
                        return res.status(400).json({
                            errors: [{ message: info.message }]
                        })
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);

                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, 'TOP_SECRET', { expiresIn: '1d' });

                            return res.status(200).json({ token, user, message: 'Logged in Successfully' });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

router.post('/profile', passport.authenticate('jwt', { session: false }),
    function (req, res) {
        return res.status(200).json({
            message: 'Authorization completed successfully',
            user: req.user
        })
    }
);

module.exports = router;