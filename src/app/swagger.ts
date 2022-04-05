const { getUsers } = require('./swagger/user.swagger');

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '0.1.0',
    title: 'APIs Documents for Base-Shop project',
    description: 'your description here',
    termsOfService: '',
    contact: {
      name: 'Amirhosein Zare',
      email: 'zareamirhosein.dev@gmail.com',
      url: 'https://thisisamir.ir',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'The production API server',
      variables: {
        env: {
          default: 'app-dev',
          description: 'DEV Environment',
        },
        port: {
          enum: ['8000'],
          default: '8000',
        },
        basePath: {
          default: '/api',
        },
      },
    },
  ],
  tags: [
    {
      name: 'Products',
    },
    {
      name: 'Users',
    },
    {
      name: 'Category',
    },
  ],
  paths: {
    '/api/user': {
      get: getUsers,
    },
  },
};
