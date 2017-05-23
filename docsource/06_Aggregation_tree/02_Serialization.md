Aggregation tree formed of records and collections is serializable by default. Record corresponds to an object in JSON, while the collection is represented as an array.

## Serialization API

### recordOrCollection.toJSON()

Produces the JSON for the aggregation tree of the record or collection. May be overriden in particular record or collection.

### new RecordOrCollection( json, { parse : true } )

Constructs an aggregation tree from its JSON representation.

### recordOrCollection.set( json, { parse : true } )

Update an aggregation tree from its JSON representation.

### recordOrCollection.parse( json )

May be overriden to add custom JSON transformation.

## Attribute-level serialization control

Serialization can be controlled for the specific attribute in the Recrod's attribute definition.

### `attrDef` attr : Type.has.toJSON( false )

Exclude attribute from the resulting JSON.

### `attrDef` attr : Type.has.toJSON( ( value, name ) => json )

Override the default toJSON() method for the selected record's attribute.

### `attrDef` attr : Type.has.parse( ( json, name ) => value )

Transform the data before it will be passed to the record's attribute.

