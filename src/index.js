const { createLocalServer } = require('./server');

const server = createLocalServer();

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
