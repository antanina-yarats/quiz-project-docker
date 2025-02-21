import { configure, renderFile } from "../deps.js";

configure({
    views: `${Deno.cwd()}/views/`,
});

const renderMiddleware = async (context, next) => {
    context.render = async (file, data = {}) => {
        context.response.headers.set("Content-Type", "text/html; charset=utf-8");

        
        const defaultData = {
            currentUser: context.state.currentUser || null,  // currentUser to all templates
        };

        const content = await renderFile(file, { ...defaultData, ...data });

        context.response.body = content || "Template not found";
    };

    await next();
};

export { renderMiddleware };
