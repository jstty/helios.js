var expect = require('chai').expect;
var Helios = require('../helios.js');
var g;
before(function (done) {
    var graph = new Helios.GraphDatabase();
    var testData = {
        "graph": {
            "mode": "NORMAL",
            "vertices": [
                {
                    "name": "marko",
                    "age": 29,
                    "_id": 1,
                    "_type": "vertex",
                    "dow": ["mon", "tue"],
                    "dob": "1984-05-05",
                    "active": true,
                    "salary": "$120,000",
                    "device": {"qty": 3, "mobile": {"phone": ["iphone", "samsung"], "tablet": ["galaxy"]}}
                },
                {
                    "name": "vadas",
                    "age": 27,
                    "_id": 2,
                    "_type": "vertex",
                    "dow": ["mon", "wed", "thu"],
                    "dob": "1986-03-12",
                    "active": false,
                    "salary": "$100,000",
                    "device": {"qty": 1, "mobile": {"phone": ["iphone"]}}
                },
                {"name": "lop", "lang": "java", "_id": 3, "_type": "vertex"},
                {
                    "name": "josh",
                    "age": 32,
                    "_id": 4,
                    "_type": "vertex",
                    "dow": ["fri"],
                    "dob": "1981-09-01T00:00:00.000Z",
                    "active": true,
                    "salary": "$80,000",
                    "device": {"qty": 2, "mobile": {"phone": ["iphone"], "tablet": ["ipad"]}}
                },
                {"name": "ripple", "lang": "java", "_id": 5, "_type": "vertex"},
                {
                    "name": "peter",
                    "age": 35,
                    "_id": 6,
                    "_type": "vertex",
                    "dow": ["mon", "fri"],
                    "dob": "1978-12-13",
                    "active": true,
                    "salary": "$70,000",
                    "device": {"qty": 2, "mobile": {"phone": ["iphone"], "tablet": ["ipad"]}}
                }
            ],
            "edges": [
                {"weight": 0.5, "_id": 7, "_type": "edge", "_outV": 1, "_inV": 2, "_label": "knows"},
                {"weight": 1.0, "_id": 8, "_type": "edge", "_outV": 1, "_inV": 4, "_label": "knows"},
                {"weight": 0.4, "_id": 9, "_type": "edge", "_outV": 1, "_inV": 3, "_label": "created"},
                {"weight": 1.0, "_id": 10, "_type": "edge", "_outV": 4, "_inV": 5, "_label": "created"},
                {"weight": 0.4, "_id": 11, "_type": "edge", "_outV": 4, "_inV": 3, "_label": "created"},
                {"weight": 0.2, "_id": 12, "_type": "edge", "_outV": 6, "_inV": 3, "_label": "created"}
            ]
        }
    };

    graph.init().then(function () {
        return graph.loadGraphSON(testData);
    }).then(function (_g) {
        g = _g;

        global.g = g;
        require('./specs/where.spec.js');
        require('./specs/filter.spec.js');

        done();
    });
});

after(function () {
    g.shutdown();
});

describe('Simple Transform', function () {

    describe('id', function () {
        it("should return all ids", function (done) {
            g.v().id()
                .then(function (result) {
                    expect(result).to.eql([1, 2, 3, 4, 5, 6]);
                    done();
                });
        });
    });

    describe('label', function () {
        it("should return created", function (done) {
            g.v(6).outE().label()
                .then(function (result) {
                    expect(result).to.eql(['created']);
                    done();
                });
        });
    });

    describe('key', function () {
        it("should return name property = lop", function (done) {
            g.v(3).property('name')
                .then(function (result) {
                    expect(result).to.eql(['lop']);
                    done();
                });
        });
    });

    describe('v', function () {

        it("should return all vertices", function (done) {
            g.v()
                .then(function (result) {
                    expect(result.length).to.equal(6);
                    expect(result).to.have.deep.property('[0].name', 'marko');
                    done();
                });
        });

        it("should get id 1", function (done) {
            g.v(1)
                .then(function (result) {
                    expect(result.length).to.equal(1);
                    expect(result).to.have.deep.property('[0].name', 'marko');
                    done();
                });
        });

        it("should return id 1 & 4", function (done) {
            g.v(1, 4)
                .then(function (result) {
                    expect(result.length).to.equal(2);
                    expect(result).to.have.deep.property('[0].name', 'marko');
                    expect(result).to.have.deep.property('[1].name', 'josh');
                    done();
                });
        });

        it("should return lang=java", function (done) {
            g.v({'lang': {$eq: 'java'}})
                .then(function (result) {
                    expect(result.length).to.equal(2);
                    expect(result).to.have.deep.property('[0].name', 'lop');
                    expect(result).to.have.deep.property('[1].name', 'ripple');
                    done();
                });
        });

        it("should return empty Array", function (done) {
            g.v({'lang': {$eq: 'something'}})
                .then(function (result) {
                    expect(result).to.have.length(0);
                    done();
                });
        });

    });

    describe('e', function () {

        it("should return all vertices", function (done) {
            g.e()
                .then(function (result) {
                    expect(result.length).to.equal(6);
                    expect(result).to.have.deep.property('[0]._id', 7);
                    done();
                });
        });

        it("should get id 1", function (done) {
            g.e(7)
                .then(function (result) {
                    expect(result.length).to.equal(1);
                    done();
                });
        });

        it("should return empty Array", function (done) {
            g.e({'lang': {$eq: 'something'}})
                .then(function (result) {
                    expect(result).to.have.length(0);
                    done();
                });
        });

        it("should return id 7 & 7", function (done) {
            g.e(7, 7)
                .then(function (result) {
                    expect(result.length).to.equal(2);
                    done();
                });
        });

        it("should return lang=java", function (done) {
            g.v({'lang': {$eq: 'java'}})
                .then(function (result) {
                    expect(result.length).to.equal(2);
                    expect(result).to.have.deep.property('[0].name', 'lop');
                    expect(result).to.have.deep.property('[1].name', 'ripple');
                    done();
                });
        });

    });

    describe('v.out', function () {

        it("should get all out vertices", function (done) {
            g.v().out().then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                done();
            });
        });

        it("should filter for 'knows'", function (done) {
            g.v().out('knows').then(function (result) {
                expect(result.length).to.equal(2);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                done();
            });
        });

        it("should filter for 'knows' as array", function (done) {
            g.v().out(['knows']).then(function (result) {
                expect(result.length).to.equal(2);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                done();
            });
        });

        it("should filter for 'knows' & 'created'", function (done) {
            g.v().out('knows', 'created').then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'lop');
                done();
            });
        });

        it("should filter for 'knows' & 'created' as array", function (done) {
            g.v().out(['knows', 'created']).then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'lop');
                done();
            });
        });

        it("should get out vertices from id 1", function (done) {
            g.v(1).out().then(function (result) {
                expect(result.length).to.equal(3);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                done();
            });
        });

        it("should return out vertices from id 1 & 4", function (done) {
            g.v(1, 4).out().then(function (result) {
                expect(result.length).to.equal(5);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                expect(result).to.have.deep.property('[1].name', 'josh');
                done();
            });
        });

        it("should return out vertices from id 1 & 4 passed in as array", function (done) {
            g.v([1, 4]).out().then(function (result) {
                expect(result.length).to.equal(5);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                expect(result).to.have.deep.property('[1].name', 'josh');
                done();
            });
        });

        it("should return out vertices from name=marko", function (done) {
            g.v({'name': {$eq: 'marko'}}).out().then(function (result) {
                expect(result.length).to.equal(3);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                done();
            });
        });

    });

    describe('v.outE.inV', function () {

        it("should get all out vertices", function (done) {
            g.v().outE().inV().then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                done();
            });
        });

        it("should filter for 'knows'", function (done) {
            g.v().outE('knows').inV().then(function (result) {
                expect(result.length).to.equal(2);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                done();
            });
        });

        it("should filter for 'knows' as array", function (done) {
            g.v().outE(['knows']).inV().then(function (result) {
                expect(result.length).to.equal(2);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                done();
            });
        });

        it("should filter for 'knows' & 'created'", function (done) {
            g.v().outE('knows', 'created').inV().then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'lop');
                done();
            });
        });

        it("should filter for 'knows' & 'created' as array", function (done) {
            g.v().outE(['knows', 'created']).inV().then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'lop');
                done();
            });
        });

        it("should get out vertices from id 1", function (done) {
            g.v(1).outE().inV().then(function (result) {
                expect(result.length).to.equal(3);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                done();
            });
        });

        it("should return out vertices from id 1 & 4", function (done) {
            g.v(1, 4).outE().inV().then(function (result) {
                expect(result.length).to.equal(5);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                expect(result).to.have.deep.property('[1].name', 'josh');
                done();
            });
        });

        it("should return out vertices from id 1 & 4 passed in as array", function (done) {
            g.v([1, 4]).outE().inV().then(function (result) {
                expect(result.length).to.equal(5);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                expect(result).to.have.deep.property('[1].name', 'josh');
                done();
            });
        });

        it("should return out vertices from name=marko", function (done) {
            g.v({'name': {$eq: 'marko'}}).outE().inV().then(function (result) {
                expect(result.length).to.equal(3);
                expect(result).to.have.deep.property('[0].name', 'vadas');
                done();
            });
        });

    });

    describe('v.in', function () {

        it("should get all in vertices", function (done) {
            g.v().in().then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'marko');
                expect(result).to.have.deep.property('[1].name', 'marko');
                done();
            });
        });

        it("should filter for 'knows'", function (done) {
            g.v().in('knows').then(function (result) {
                expect(result.length).to.equal(2);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should filter for 'knows' as array", function (done) {
            g.v().in(['knows']).then(function (result) {
                expect(result.length).to.equal(2);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should filter for 'knows' & 'created'", function (done) {
            g.v().in('knows', 'created').then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should filter for 'knows' & 'created' as array", function (done) {
            g.v().in(['knows', 'created']).then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should get in vertices from id 3", function (done) {
            g.v(3).in().then(function (result) {
                expect(result.length).to.equal(3);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should return in vertices from id 3 & 4", function (done) {
            g.v(3, 4).in().then(function (result) {
                expect(result.length).to.equal(4);
                expect(result).to.have.deep.property('[0].name', 'marko');
                expect(result).to.have.deep.property('[1].name', 'josh');
                done();
            });
        });

        it("should return in vertices from id 3 & 4 passed in as array", function (done) {
            g.v([3, 4]).in().then(function (result) {
                expect(result.length).to.equal(4);
                expect(result).to.have.deep.property('[0].name', 'marko');
                expect(result).to.have.deep.property('[1].name', 'josh');
                done();
            });
        });

        it("should return in vertices from name=lop", function (done) {
            g.v({'name': {$eq: 'lop'}}).in().then(function (result) {
                expect(result.length).to.equal(3);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

    });

    describe('v.inE.outV', function () {

        it("should get all out vertices", function (done) {
            g.v().inE().outV().then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should filter for 'knows'", function (done) {
            g.v().inE('knows').outV().then(function (result) {
                expect(result.length).to.equal(2);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should filter for 'knows' as array", function (done) {
            g.v().inE(['knows']).outV().then(function (result) {
                expect(result.length).to.equal(2);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should filter for 'knows' & 'created'", function (done) {
            g.v().inE('knows', 'created').outV().then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should filter for 'knows' & 'created' as array", function (done) {
            g.v().inE(['knows', 'created']).outV().then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should get out vertices from id 3", function (done) {
            g.v(3).inE().outV().then(function (result) {
                expect(result.length).to.equal(3);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

        it("should return out vertices from id 3 & 4", function (done) {
            g.v(3, 4).inE().outV().then(function (result) {
                expect(result.length).to.equal(4);
                expect(result).to.have.deep.property('[0].name', 'marko');
                expect(result).to.have.deep.property('[1].name', 'josh');
                done();
            });
        });

        it("should return out vertices from id 3 & 4 passed in as array", function (done) {
            g.v([3, 4]).inE().outV().then(function (result) {
                expect(result.length).to.equal(4);
                expect(result).to.have.deep.property('[0].name', 'marko');
                expect(result).to.have.deep.property('[1].name', 'josh');
                done();
            });
        });

        it("should return out vertices from name=lop", function (done) {
            g.v({'name': {$eq: 'lop'}}).inE().outV().then(function (result) {
                expect(result.length).to.equal(3);
                expect(result).to.have.deep.property('[0].name', 'marko');
                done();
            });
        });

    });

    describe('v.both', function () {

        it("should get all out vertices", function (done) {
            g.v().both().then(function (result) {
                expect(result.length).to.equal(12);
                done();
            });
        });

        it("should filter for 'knows'", function (done) {
            g.v().both('knows').then(function (result) {
                expect(result.length).to.equal(4);
                done();
            });
        });

        it("should filter for 'knows' as array", function (done) {
            g.v().both(['knows']).then(function (result) {
                expect(result.length).to.equal(4);
                done();
            });
        });

        it("should filter for 'knows' & 'created'", function (done) {
            g.v().both('knows', 'created').then(function (result) {
                expect(result.length).to.equal(12);
                done();
            });
        });

        it("should filter for 'knows' & 'created' as array", function (done) {
            g.v().both(['knows', 'created']).then(function (result) {
                expect(result.length).to.equal(12);
                done();
            });
        });

        it("should get both vertices from id 4", function (done) {
            g.v(4).both().then(function (result) {
                expect(result.length).to.equal(3);
                done();
            });
        });

        it("should return both vertices from id 3 & 4", function (done) {
            g.v(3, 4).both().then(function (result) {
                expect(result.length).to.equal(6);
                done();
            });
        });

        it("should return both vertices from id 3 & 4 passed in as array", function (done) {
            g.v([3, 4]).both().then(function (result) {
                expect(result.length).to.equal(6);
                expect(result).to.have.deep.property('[0].name', 'marko');
                expect(result).to.have.deep.property('[1].name', 'josh');
                done();
            });
        });

        it("should return both vertices from name=josh", function (done) {
            g.v({'name': {$eq: 'josh'}}).both().then(function (result) {
                expect(result.length).to.equal(3);
                done();
            });
        });

    });

    describe('v.bothE.bothV', function () {

        it("should get return bothE", function (done) {
            g.v().bothE().then(function (result) {
                expect(result.length).to.equal(12);
                done();
            });
        });

        it("should get all both vertices", function (done) {
            g.v().bothE().bothV().then(function (result) {
                expect(result.length).to.equal(24);
                done();
            });
        });

        it("should filter for 'knows'", function (done) {
            g.v().bothE('knows').bothV().then(function (result) {
                expect(result.length).to.equal(8);
                done();
            });
        });

        it("should filter for 'knows' as array", function (done) {
            g.v().bothE(['knows']).bothV().then(function (result) {
                expect(result.length).to.equal(8);
                done();
            });
        });

        it("should filter for 'knows' & 'created'", function (done) {
            g.v().bothE('knows', 'created').bothV().then(function (result) {
                expect(result.length).to.equal(24);
                done();
            });
        });

        it("should filter for 'knows' & 'created' as array", function (done) {
            g.v().bothE(['knows', 'created']).bothV().then(function (result) {
                expect(result.length).to.equal(24);
                done();
            });
        });

        it("should get both vertices from id 4", function (done) {
            g.v(4).bothE().bothV()
                .then(function (result) {
                    expect(result).to.have.length(6);
                    done();
                });
        });

        it("should return both vertices from id 1 & 4", function (done) {
            g.v(1, 4).bothE().bothV()
                .then(function (result) {
                    expect(result).to.have.length(12);
                    done();
                });
        });

        it("should return both vertices from id 1 & 4 passed in as array", function (done) {
            g.v([1, 4]).bothE().bothV()
                .then(function (result) {
                    expect(result).to.have.length(12);
                    done();
                });
        });

        it("should return both vertices from name=marko", function (done) {
            g.v({'name': {$eq: 'marko'}}).bothE().bothV().then(function (result) {
                expect(result.length).to.equal(6);
                done();
            });
        });
    });

    describe('hash', function () {

        it("should contain JSON object with keys 1 & 4", function (done) {
            g.v(1, 4).hash().then(function (result) {
                expect(result).to.be.an('object');
                expect(result).to.include.keys('1', '4');
                done();
            });
        });
    });

});
