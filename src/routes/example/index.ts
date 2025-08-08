import { FastifyPluginAsync } from 'fastify'
import { Type, Static } from '@sinclair/typebox'

const QuerySchema = Type.Object({
  name: Type.Optional(Type.String({ minLength: 1 }))
})

const ResponseSchema = Type.Object({
  message: Type.String()
})

type QueryType = Static<typeof QuerySchema>

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{
    Querystring: QueryType
    Reply: Static<typeof ResponseSchema>
  }>(
    '/',
    {
      schema: {
        querystring: QuerySchema,
        response: {
          200: ResponseSchema
        }
      }
    },
    async function (request, reply) {
      const { name } = request.query
      const message = name
        ? `Hello, ${name}! 👋 Welcome to our Fastify app.`
        : `Hello there! You can pass your name like this: /?name=YourName`
      return { message }
    }
  )
}

export default example
