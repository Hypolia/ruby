import type { ApplicationService } from '@adonisjs/core/types'
import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'
import Mongo from '#apps/shared/services/mongo'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {
    const uri = 'mongodb://127.0.0.1:27117,127.0.0.1:27118/'
    const mongo = new Mongo(uri)
    await mongo.init('hypolia')

    await this.app.ready((application) => {
      application.container.singleton('ws', () => {
        return new Server(server.getNodeServer())
      })
      application.container.singleton('mongo', () => {
        return mongo
      })
    })
  }

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
