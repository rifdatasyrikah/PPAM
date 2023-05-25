module.exports = () => {
    if (process.env.APP_ENV === 'prod')  {
        return require("./app.prod.json");
    } else {
        
        return require("./app.dev.json");
    }
}