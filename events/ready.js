module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Client is ready\nLogged in as ${client.user.tag}`);
    },
};
