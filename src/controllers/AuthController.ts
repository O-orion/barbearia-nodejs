import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import passport from "passport";

export default class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login (req: Request, res: Response) {

        const { email, password } = req.body;
        const { user, token } = await this.authService.login(email, password);
        res.json({ message: 'Login successful', user, token });
    }

    async googleLogin (req: Request, res: Response)  {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);

    }

    async googleLoginCallback (req: Request, res: Response) {

        passport.authenticate('google', { failureRedirect: '/login' }, (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: 'Authentication failed' });
            }
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Login failed' });
                }
                return res.redirect(`/auth/success?token=${user.token}`); // Redirect to the desired page after successful login
            });
        })(req, res);


    }

    success (req: Request, res: Response)  {
        const token = req.query.token as string;
        res.json({ message: 'Login successful', token });

    }

}
