/* jshint -W079 */
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Event = mongoose.model('Event');

/**
 * Globals
 */
var user;
var event;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Event:', function() {
    beforeEach(function(done) {
      this.timeout(10000);
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });
      user.save(function() {
        event = new Event({
          title: 'Event Title',
          content: 'Event Content',
          user: user
        });
        done();
      });


    });
    describe('Method Save', function() {

      it('should be able to save without problems', function(done) {
        this.timeout(10000);

        return event.save(function(err, data) {
          expect(err).to.be(null);
          expect(data.title).to.equal('Event Title');
          expect(data.content).to.equal('Event Content');
          expect(data.user.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          done();
        });

      });

      it('should be able to show an error when try to save without title', function(done) {
        this.timeout(10000);
        event.title = '';

        return event.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        this.timeout(10000);
        event.content = '';

        return event.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        this.timeout(10000);
        event.user = null;

        return event.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

    });

    afterEach(function(done) {
      this.timeout(10000);
      event.remove(function() {
        user.remove(done);
      });
    });
  });
});
