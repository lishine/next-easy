const prod = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'

module.exports = {
    'process.env.HASURA_ADMIN_KEY': 'myadminsecretkey',
    'process.env.API_URL': prod ? 'https://sbs.vim55k1.now.sh' : 'http://localhost:8080',
    'process.env.DB_GRAPHQL_URL': prod
        ? 'https://hasura-sbs.herokuapp.com/v1alpha1/graphql'
        : 'http://localhost:8090/v1alpha1/graphql',
}
