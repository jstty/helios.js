var expect = require('chai').expect;
var g = global.g;

describe('where', function () {

    describe('$eq', function () {
        it("should return id 1 from v", function (done) {
            g.v({name: {$eq: 'marko'}})
                .then(function (result) {
                    expect(result).to.be.an('array').with.deep.property('[0]._id', 1);
                    done();
                });
        });

        it("should return id 1", function (done) {
            g.v().where({name: {$eq: 'marko'}}).then(function (result) {
                expect(result.length).to.be.equal(1);
                expect(result).to.be.an('array').with.deep.property('[0]._id', 1);
                done();
            });
        });
    });

    describe('$btw', function () {
        it("should return id 1 and id 2 from v", function (done) {
            g.v({age: {$btw: ['27', '31']}}).then(function (result) {
                expect(result.length).to.be.equal(2);
                expect(result).to.be.an('array').with.deep.property('[0].age', 29);
                expect(result).to.be.an('array').with.deep.property('[1].age', 27);
                done();
            });

        });

        it("should return id 1 and id 2", function (done) {
            g.v().where({age: {$btw: [27, 31]}}).then(function (result) {
                expect(result.length).to.be.equal(2);
                expect(result).to.be.an('array').with.deep.property('[0].age', 29);
                expect(result).to.be.an('array').with.deep.property('[1].age', 27);
                done();
            });
        });
    });

//
    describe('$includes', function () {
        it("should return id 1 and 2 from v", function (done) {
            g.v({age: {$in: [27, 29]}}).then(function (result) {
                expect(result.length).to.be.equal(2);
                expect(result).to.be.an('array').with.deep.property('[0].age', 29);
                expect(result).to.be.an('array').with.deep.property('[1].age', 27);
                done();
            });
        });

        it("should return id 2", function (done) {
            g.v().where({age: {$in: [27, 29]}}).then(function (result) {
                expect(result.length).to.be.equal(2);
                expect(result).to.be.an('array').with.deep.property('[0].age', 29);
                expect(result).to.be.an('array').with.deep.property('[1].age', 27);
                done();
            });
        });

        it("check array for values", function (done) {
            g.v().where({age: {$in: [27, 29]}}).then(function (result) {
                expect(result.length).to.be.equal(2);
                expect(result).to.be.an('array').with.deep.property('[0].age', 29);
                expect(result).to.be.an('array').with.deep.property('[1].age', 27);
                done();
            });
        });
    });

    describe('$ex', function () {
        it("should return values that don't have any matching values in an array from v", function (done) {
            g.v().where({dow: {$ex: ['fri']}}).then(function (result) {
                expect(result.length).to.be.equal(2);
                expect(result).to.be.an('array').with.deep.property('[0]._id', 1);
                expect(result).to.be.an('array').with.deep.property('[1]._id', 2);
                done();
            });
        });

        it("should return values that don't have any matching values in an array", function (done) {
            g.v().where({dow: {$ex: ['mon', 'wed', 'thu']}}).then(function (result) {
                expect(result.length).to.be.equal(1);
                expect(result).to.be.an('array').with.deep.property('[0]._id', 4);
                done();
            });
        });
    });
    //g.v().where({dow:{$every:['mon','fri']}})
    describe('$every', function () {
        it("should return id 2 from v", function (done) {
            g.v({dow: {$all: ['mon', 'wed']}}).then(function (result) {
                expect(result.length).to.be.equal(1);
                expect(result).to.be.an('array').with.deep.property('[0]._id', 2);
                done();
            });
        });

        it("should return id 2", function (done) {
            g.v().where({dow: {$all: ['mon', 'wed']}}).then(function (result) {
                expect(result.length).to.be.equal(1);
                expect(result).to.be.an('array').with.deep.property('[0]._id', 2);
                done();
            });
        });
    });

    describe('$match', function () {
        it("should return values exactly matching an array from v", function (done) {
            g.v({dow: {$match: ['mon', 'wed', 'thu']}}).then(function (result) {
                expect(result.length).to.be.equal(1);
                expect(result).to.be.an('array').with.deep.property('[0]._id', 2);
                done();
            });
        });

        it("should return values exactly matching an array", function (done) {
            g.v().where({dow: {$match: ['mon', 'wed', 'thu']}}).then(function (result) {
                expect(result.length).to.be.equal(1);
                expect(result).to.be.an('array').with.deep.property('[0]._id', 2);
                done();
            });
        });
    });
});