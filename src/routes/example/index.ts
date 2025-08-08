import { FastifyPluginAsync } from 'fastify'
import { Type } from '@sinclair/typebox'

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        querystring: Type.Object({
          name: Type.Optional(Type.String({ minLength: 1 }))
        }),
        response: {
          200: Type.Object({
            message: Type.String()
          })
        }
      }
    },
    async function (request, reply) {
      const { name } = request.query as { name?: string }
      const message = name
        ? `Hello, ${name}! 👋 Welcome to our Fastify app.`
        : `Hello there! You can pass your name like this: /?name=YourName`
      return { message }
    }
  )
}

export default example
