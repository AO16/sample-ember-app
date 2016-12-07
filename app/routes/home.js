import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  get,
  inject: { service }
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    const { authenticated: { user_id: userId } } = get(this, 'session.data');

    return this.store.find('user', userId);
  },

  actions: {
    logOut() {
      const session = get(this, 'session');

      session.invalidate();
    }
  }
});
