const Router = require('nextjs-dynamic-routes')

const router = new Router()

const publicRoutes = ['home']

const isPublicRoute = route => publicRoutes.find(r => r === route)
const findPage = page => {
    return router.routes.find(r => r.page === page)
}
const isPublicPage = page => {
    const { name } = findPage(page) || {}
    return name && isPublicRoute(name)
}

router
    .add({
        name: 'home',
        pattern: '/',
        page: '/',
    })
    .add({
        name: 'sign-up',
        pattern: '/sign-up',
        page: '/sign-up',
    })
    .add({
        name: 'register',
        pattern: '/register/:barcode?',
        page: '/register',
    })

module.exports = { router, isPublicRoute, isPublicPage, findPage }
