class PrivateTestService {
    message: string
    
    constructor() {
        this.message = 'I am an instance'
    }

    async testify() {
        return 'testify'
    }

    async getHomePage() {
        return 'Homepage'
    }

    async getArticlesPage() {
        return 'All articles are here!'
    }

    async getAboutPage() {
        return 'My name is Abby.'
    }
}


export class TestService {
    private static instance: PrivateTestService

    constructor() {
        throw new Error('Use TestService.getInstance()')
    }

    public static getInstance() {

        if (!this.instance) {
            this.instance = new PrivateTestService()
        }

        return this.instance
    }
}