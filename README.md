# HeliosDB
[![Build Status](https://secure.travis-ci.org/jstty/heliodb.png)](http://travis-ci.org/jstty/heliosdb) [![Dependency Status](https://david-dm.org/jstty/heliosdb.png?theme=shields.io)](https://david-dm.org/jstty/heliosdb) [![devDependency Status](https://david-dm.org/jstty/heliosdb/dev-status.png?theme=shields.io)](https://david-dm.org/jstty/heliosdb#info=devDependencies) [![NPM](https://nodei.co/npm/heliosdb.png)](https://nodei.co/npm/heliosdb/)
=====

FORKED from [HeliosJS](https://github.com/entrendipity/helios.js)

HeliosDB is an in-memory graph database for NodeJS. It employs a non-blocking asynchronous architecture through the use of Promises and Web Workers. This enables HeliosJS to download and process large data sets without blocking the UI.

```sh
npm install heliosdb
```

In order to traverse the graph, HeliosJS uses a [Gremlin](http://gremlin.tinkerpop.com) inspired graph traversal language to query, analyze and manipulate the graph. Gremlin is an open source project maintained by [TinkerPop](http://tinkerpop.com). For more information on Gremlin, see the [Gremlin wiki](https://github.com/tinkerpop/gremlin/wiki).

__Please see the [website](http://entrendipity.github.com/helios.js/) for full documentation of the current version (0.2.0).__

## License  

(MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
