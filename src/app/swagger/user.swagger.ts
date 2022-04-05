export const getUsers = {
  tags: ['Users'],
  description: 'Returns all users from the system that the user has access to',
  operationId: 'getUsers',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'category list',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              name: {
                type: 'string',
                description: 'user Name',
              },
              family: {
                type: 'string',
                description: 'user family',
              },
              description: {
                type: 'string',
                description: 'user description',
              },
              phone: {
                type: 'string',
                description: 'user phone',
              },
              email: {
                type: 'string',
                description: 'user email',
              },
              role: {
                type: 'object',
                description: 'user role',
              },
            },
          },
        },
      },
    },
  },
};
