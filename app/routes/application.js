import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { get } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    logOut() {
      const session = get(this, 'session');

      session.invalidate();
    }
  }
});
