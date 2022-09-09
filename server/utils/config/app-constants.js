module.exports = {
    ROUTES :{
        HOME:'/',
        USER:{
            LOGIN :'/login',
            REGISTER:'/register'
        },
        POLL:{
            CREATE_POLL:'/create-poll',
            VIEW_POLL:'/view-poll',
            SPECIFIC_POLL:'/:id',
            USERS_POLL:'/user',
        }
    },
    STATUS_CODE:{
        SUCCESS:200,
        INTERNAL_SERVER_ERROR:500,
        NOT_FOUND : 404,
        UNAUTHORIZED : 400

    },
    SCHEMAS:{
        USERS:'users'
    }
}