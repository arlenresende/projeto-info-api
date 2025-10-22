import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(
  request: FastifyRequest,
  reply: FastifyReply,
) {

    await request.jwtVerify({
        onlyCookie: true,
    })

  const role = request.user.role

 
  const parseUserIdtoString = String(request.user.sub)

    const token = await reply.jwtSign(
      {
       role
      },
      {
        sign: {
          sub: parseUserIdtoString,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role
      },
      {
        sign: {
          sub: parseUserIdtoString,
          expiresIn: '7d',
        },
      },
    )

    return reply.setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
    }).status(200).send({
      token,
    })
}
