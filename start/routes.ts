import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

/**
 * Verify server running
 */
Route.get('/', async () => {
  return 'Server Running'
})

/**
 * Verify state App
 */
Route.get('health', async ({response}) => {
  const report = await HealthCheck.getReport()
  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route.post('login', 'AuthController.login')
Route.get('register', 'AuthController.register')

Route.group(() => {
  // Profil
  Route.get('me', 'AuthController.me')

  // Recettes
  Route.resource('recipes', 'RecipesController').apiOnly()
}).middleware(['auth'])
