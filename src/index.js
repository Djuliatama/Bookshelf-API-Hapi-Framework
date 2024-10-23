const Hapi = require('@hapi/hapi');
const routes = require('./routes'); 

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 9000,
        host: 'localhost'
    });

    
    server.route(routes);

 
    await server.start();
    console.log(`Server is running on http://localhost:${server.info.port}`);
};


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});


init();
