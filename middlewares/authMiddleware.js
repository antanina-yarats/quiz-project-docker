const restrictedPaths = ["/topics", "/quiz"];

const authMiddleware = async (context, next) => {
    const user = await context.state.session.get("currentUser");

    if(!user && restrictedPaths.some(path=> context.request.url.pathname.startsWith(path))) {
        context.response.redirect("/auth/login");
        return;
    }

    await next();
}

export { authMiddleware };