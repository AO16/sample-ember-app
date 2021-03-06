import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sign-up');
  this.route('log-in');
  this.route('home', { path: '/' }, function() {
    this.route('user', { path: '/user/:id' });
    this.route('users');
  });
});

export default Router;
