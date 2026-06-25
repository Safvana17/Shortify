export class UserEntity {
    id: string
    name: string
    email: string
    password: string
    isVerified: boolean
    refreshToken: string[]

    constructor( id: string, name: string, email: string, password: string, isVerified: boolean, refreshToken: string[] = [] ) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.isVerified = isVerified
        this.refreshToken = refreshToken
    }
}