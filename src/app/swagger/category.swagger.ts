export const getPets = {
    tags: ['Pets'],
    description: "Returns all category from the system that the user has access to",
    operationId: 'getPets',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "category list",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            pet_name: {
                                type: 'string',
                                description: 'Pet Name'
                            },
                            pet_age: {
                                type: 'string',
                                description: 'Pet Age'
                            }
                        }
                    }
                }
            }
        }
    }
} 