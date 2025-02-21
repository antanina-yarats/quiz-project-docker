import * as userManager from '../managers/userManager.js';

const userMiddleware = async ( context, next ) => {
    
    if (!context.state.session) {
        console.error("Session not initialized yet.");
        await next();  
        return;
    }

    const sessionUser = await context.state.session.get("currentUser");

    if (sessionUser) {
        const fullUser = await userManager.findUserbyEmail(sessionUser.email);
        context.currentUser = fullUser;
        context.state.currentUser = fullUser;
    } else {
        context.currentUser = null;
        context.state.currentUser = null;
    }

    await next();
};

export { userMiddleware };
