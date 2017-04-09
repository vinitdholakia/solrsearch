# Solr Search Manager

A small wrapper to manage all your solr cores and querying data with simplicity

## Installing

Easy way install solrsearch is to use npm and type the following in your terminal

```sh
npm install solrsearch
```

## Usage and Getting Started

First things first . Enter your cores in options param as a object and create a instance

In the JavaScript file:
```javascript
// import the module
var ss = require('solrsearch');
var options = {
	host : 'localhost',
	port : 8983,
	cores : {
		coreKey : coreName,
		demo : "demoCore"
	}
}
var solr = new ss(options);
```

Then you can start using this instance and manage your all cores mentioned in the options

Example : 

```javascript
// manage solr core
// solr.{{coreKey}}.reload()
solr.demo.reload();
```

## Things to do

Note : All functions accept a callback function as the last parameter
Sample callbackFunction : 
```javascript
function callbackFunction(err,result){
	if(err){
	 	// do something with error
	}else{
		// do something with the result
	}
}
```


### Core Properties

1. Status of the core

```javascript
solr.demo.status(/*callbackFunction*/);
```

2. Load of the core

```javascript
solr.demo.load(/*callbackFunction*/);
```

3. Reload of the core

```javascript
solr.demo.reload(/*callbackFunction*/);
```

### Schema Properties

1. list all fields of the core schema

```javascript
solr.demo.schema.fields(/*callbackFunction*/);
```

2. Add a field to the schema

```javascript
solr.demo.schema.add({name : "newField",type :"string"},/*callbackFunction*/);
```

3. Update a field 

```javascript
solr.demo.schema.update({name : "newField",type :"boolean"},/*callbackFunction*/);
```

4. Remove a field from the schema

```javascript
solr.demo.schema.remove({name : "newField"},/*callbackFunction*/);
```
