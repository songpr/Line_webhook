// Import Fastify
const fastify = require('fastify')({ logger: true });

let got; // Declare got at the top to make it accessible in routes

/**
 * root route
 */
fastify.get('/', async (request, reply) => {
  return { message: 'Hello, World!' };
});

/**
 * google route
 */
fastify.get('/google', async (request, reply) => {
  const query = request.query.q || 'example';
  const response = await got(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
  return reply.type('text/html').send(response.body);
});

// Start the server
const start = async () => {
  try {
    // Dynamically import got during server startup
    const { default: importedGot } = await import('got');
    got = importedGot;

    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();