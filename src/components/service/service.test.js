/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });
const Promise = require('bluebird');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const Services = require('./service.db');
const { client } = require('../../db/db.client');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('Service', () => {
  after(async () => {
    server.close();
    await Services.reset();
    await client.destroy();
  });

  beforeEach(async () => {
    await Services.reset();
  });

  it('should return json on GET', async () => chai
    .request(server)
    .get('/service')
    .send()
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      should.exist(res.body);
    }));

  it('should return json on GET with correct query params', async () => chai
    .request(server)
    .get('/service?service_id=iron_bank')
    .send()
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      should.exist(res.body);
    }));

  it('should allow POST with valid body on /report', async () => chai
    .request(server)
    .post('/service/report')
    .send({
      service_id: 'iron_bank',
      service_name: 'Iron Bank',
      service_level: 2,
      service_status: 200,
      service_path: 'https://iron-bank:123'
    })
    .then((res) => {
      res.should.have.status(200);
      should.exist(res.body);
    }));

  it('should reject POST with missing id in body on /report', async () => chai
    .request(server)
    .post('/service/report')
    .send({
      service_name: 'Iron Bank',
      service_level: 2,
      service_status: 200,
      service_path: 'https://iron-bank:123'
    })
    .then((res) => {
      res.should.have.status(422);
      should.exist(res.body);
    }));

  it('should reject POST with missing name in body on /report', async () => chai
    .request(server)
    .post('/service/report')
    .send({
      service_id: 'iron_bank',
      service_level: 2,
      service_status: 200,
      service_path: 'https://iron-bank:123'
    })
    .then((res) => {
      res.should.have.status(422);
      should.exist(res.body);
    }));

  it('should reject POST with missing level in body on /report', async () => chai
    .request(server)
    .post('/service/report')
    .send({
      service_id: 'iron_bank',
      service_name: 'Iron Bank',
      service_status: 200,
      service_path: 'https://iron-bank:123'
    })
    .then((res) => {
      res.should.have.status(422);
      should.exist(res.body);
    }));

  it('should reject POST with missing path in body on /report', async () => chai
    .request(server)
    .post('/service/report')
    .send({
      service_id: 'iron_bank',
      service_name: 'Iron Bank',
      service_level: 2,
      service_status: 200,
    })
    .then((res) => {
      res.should.have.status(422);
      should.exist(res.body);
    }));

  it('should correctly add entity to db on POST and return the new entity on GET', async () => {
    const requester = chai.request(server).keepOpen();

    await requester
      .post('/service/report')
      .send({
        service_id: 'iron_bank',
        service_name: 'Iron Bank',
        service_level: 2,
        service_status: 200,
        service_path: 'https://iron-bank:123'
      });

    await requester
      .get('/service?service_id=iron_bank')
      .send()
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.body);
        res.body[0].should.have.property('service_id');
        res.body[0].service_id.should.equal('iron_bank');
      });

    requester.close();
  });

  it('should correctly update entity in db on POST at /report when entity exists', async () => {
    const requester = chai.request(server).keepOpen();
    let d1;
    let d2;

    await requester
      .post('/service/report')
      .send({
        service_id: 'iron_bank',
        service_name: 'Iron Bank',
        service_level: 2,
        service_status: 200,
        service_path: 'https://iron-bank:123'
      });

    await requester
      .get('/service?service_id=iron_bank')
      .send()
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.body);
        res.body[0].should.have.property('service_id');
        res.body[0].service_id.should.equal('iron_bank');
        res.body[0].should.have.property('service_name');
        res.body[0].service_name.should.equal('Iron Bank');
        res.body[0].should.have.property('service_level');
        res.body[0].service_level.should.equal(2);
        res.body[0].should.have.property('service_status');
        res.body[0].service_status.should.equal(200);
        res.body[0].should.have.property('service_path');
        res.body[0].service_path.should.equal('https://iron-bank:123');
        res.body[0].should.have.property('updated_at');
        d1 = new Date(res.body[0].updated_at);
      });

    // Wait one second
    await Promise.delay(1000);

    await requester
      .post('/service/report')
      .send({
        service_id: 'iron_bank',
        service_name: 'Iron Bank AB',
        service_level: 1,
        service_status: 400,
        service_path: 'https://iron-bank:456'
      });

    await requester
      .get('/service?service_id=iron_bank')
      .send()
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.body);
        res.body[0].should.have.property('service_id');
        res.body[0].service_id.should.equal('iron_bank');
        res.body[0].should.have.property('service_name');
        res.body[0].service_name.should.equal('Iron Bank AB');
        res.body[0].should.have.property('service_level');
        res.body[0].service_level.should.equal(1);
        res.body[0].should.have.property('service_status');
        res.body[0].service_status.should.equal(400);
        res.body[0].should.have.property('service_path');
        res.body[0].service_path.should.equal('https://iron-bank:456');
        res.body[0].should.have.property('updated_at');
        d2 = new Date(res.body[0].updated_at);
        expect(d2).to.be.above(d1);

      });
    requester.close();
  });

  it('should correctly remove entity in db on DELETE at /:service_id when entity exists', async () => {
    const requester = chai.request(server).keepOpen();

    await requester
      .post('/service/report')
      .send({
        service_id: 'iron_bank',
        service_name: 'Iron Bank',
        service_level: 2,
        service_status: 200,
        service_path: 'https://iron-bank:123'
      });

    await requester
      .get('/service?service_id=iron_bank')
      .send()
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.body);
        res.body[0].should.have.property('service_id');
        res.body[0].service_id.should.equal('iron_bank');
        res.body[0].should.have.property('service_name');
        res.body[0].service_name.should.equal('Iron Bank');
        res.body[0].should.have.property('service_level');
        res.body[0].service_level.should.equal(2);
        res.body[0].should.have.property('service_status');
        res.body[0].service_status.should.equal(200);
        res.body[0].should.have.property('service_path');
        res.body[0].service_path.should.equal('https://iron-bank:123');
        res.body[0].should.have.property('updated_at');
      });

    await requester
      .delete('/service/iron_bank')
      .send();

    await requester
      .get('/service?service_id=iron_bank')
      .send()
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.body);
        res.body.length.should.equal(0);
      });
    requester.close();
  });
});
