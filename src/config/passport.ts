import { AuthService } from "../services/AuthService";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const authService = new AuthService();

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL:  '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const { id, emails, displayName } = profile;

            if (!emails || emails.length === 0) {
                return done(new Error('No email found in Google profile'));
            }

            const { user, token } = await authService.googleLogin(id, emails[0].value, displayName);

            done(null, { user, token });
        } catch (error) {
            done(error);
        }
    })
);

passport.serializeUser(( user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});
