import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  get,
  inject: { service }
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  actions: {
    logOut() {
      const session = get(this, 'session');

      session.invalidate();
    }
  }
});
