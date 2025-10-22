import { FastifyInstance } from 'fastify'

import { profile } from './controllers/users/profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { register } from './controllers/auth/register'
import { authenticate } from './controllers/auth/authenticate'

import { resetPassword } from './controllers/auth/reset-password'
import { updateUser } from './controllers/users/edit'
import { deleteUser } from './controllers/users/delete'
import { refresh } from './controllers/auth/refresh'
import { verifyUserRole } from './middlewares/verify-user-rola'

// Vehicle controllers
import { createVehicle } from './controllers/vehicles/create'
import { getVehicle } from './controllers/vehicles/get'
import { listVehicles } from './controllers/vehicles/list'
import { updateVehicle } from './controllers/vehicles/update'
import { deleteVehicle } from './controllers/vehicles/delete'


interface GetParams {
  id: string
}

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/login', authenticate)
  app.patch('/token/refresh', refresh)

  /** Authentication required  **/

  // User
  app.get('/me', { onRequest: [verifyJwt] }, profile)
  app.put('/reset-password', { onRequest: [verifyJwt] }, resetPassword)
  app.put<{ Params: GetParams }>(
    '/user/:id',
    {
      onRequest: [verifyJwt],
      config: {
        // Importante: configuração específica para a rota
        multipart: {
          attachFieldsToBody: true,
        },
      },
    },

    updateUser,
  )
  app.delete<{ Params: GetParams }>(
    '/user/:id',
    { onRequest: [verifyJwt] },
    deleteUser,
  )

  // Vehicles
  app.post('/vehicles', { onRequest: [verifyJwt] }, createVehicle)
  app.get('/vehicles', { onRequest: [verifyJwt] }, listVehicles)
  app.get<{ Params: GetParams }>(
    '/vehicles/:id',
    { onRequest: [verifyJwt] },
    getVehicle,
  )
  app.put<{ Params: GetParams }>(
    '/vehicles/:id',
    { onRequest: [verifyJwt] },
    updateVehicle,
  )
  app.delete<{ Params: GetParams }>(
    '/vehicles/:id',
    { onRequest: [verifyJwt] },
    deleteVehicle,
  )
}
