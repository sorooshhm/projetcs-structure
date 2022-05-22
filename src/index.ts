import App from './app/index';
import envVars from './env/env';

envVars()
const env = process.env;
const app = new App(env);

app.setUpRedis(env);
app.setUpServer(env)
