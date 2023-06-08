/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.get('/me', 'AuthenticationController.me')
      Route.delete('/logout', 'AuthenticationController.logout')
    }).middleware('auth')

    Route.group(() => {
      Route.post('/login', 'AuthenticationController.login')
    }).middleware('guest')
  }).prefix('/authentication')

  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'AccountsController.index')
      Route.get('/:id', 'AccountsController.show')
      Route.post('/', 'AccountsController.store')
      Route.put('/:id', 'AccountsController.update')
      Route.delete('/:id', 'AccountsController.destroy')
    }).prefix('/accounts')

    Route.group(() => {
      Route.get('/', 'RolesController.index')
      Route.get('/:id', 'RolesController.show')
      Route.post('/', 'RolesController.store')
      Route.put('/:id', 'RolesController.update')
      Route.delete('/:id', 'RolesController.destroy')
    }).prefix('/roles')
  }).middleware(['auth'])
}).prefix('/v1')

