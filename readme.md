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
		coreKey : coreName
	}
}
var solr = new ss(options);
```

Then you can start using this instance and manage your all cores mentioned in the options

Example : 

```javascript
// manage solr core
// solr.{{coreKey}}.reload()
solr.global.reload();
```
