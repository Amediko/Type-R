import { Record } from './transaction.ts' 
import { GenericAttribute } from './attribute.ts'
import { Owner, free, aquire, Transactional, TransactionOptions, TransactionalConstructor } from '../transactions.ts'
import { log } from '../objectplus/index.ts' 

export class TransactionalType extends GenericAttribute {
    type : TransactionalConstructor

    canBeUpdated( prev : Transactional, next : any ) : boolean {
        // If an object already exists, and new value is of incompatible type, let object handle the update.
        return prev && next && !( next instanceof this.type );
    }

    convert( value : any, options : TransactionOptions, record : Record ) : Transactional {
        // Invoke class factory to handle abstract classes
        return value == null || value instanceof this.type ? value : this.type.create( value, options, record );
    }

    validate( record : Record, value : Transactional ){
        var error = value && value.validationError;
        if( error ) return error;
    }

    create() : Transactional {
        return new (<any>this.type)(); // this the subclass of Transactional here.
    }

    initialize( options ){
        options.changeHandlers.unshift( this._handleChange );
    }

    _handleChange( next : Transactional, prev : Transactional, record : Record ){
        prev && free( record, prev );
        
        if( next && !aquire( record, next, this.name ) ){
            log.error( '[Aggregation error] Assigned value already has an owner. Use shared attribute type.' );
        }
    }
}

Record._attribute = TransactionalType;