import mysql from 'mysql'
import CONFIG from '../configs'

class Database {
    constructor() {        
        this.connection = mysql.createConnection(CONFIG.mysql)        
        // this.connection = mysql.createPool(CONFIG.mysql)
    }
    
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err )
                resolve( rows )
            } )
        } )
    }
    
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err )
                resolve()
            } )
        } )
    }
}

export default Database