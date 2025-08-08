import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
    export interface FastifyRequest {
        user?: {
            id: number;
            email: string;
            name: string;
        };
    }

    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

export default fp(async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
    fastify.decorate("authenticate", async (request, reply) => {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply.unauthorized();
        }

        request.user = {
            id: 1,
            email: "john@doe.com",
            name: "John Doe"
        }
    });
});
