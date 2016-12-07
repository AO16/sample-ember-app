import Ember from 'ember';

const {
  get,
  getProperties,
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  session: service(),

  model() {
    return Ember.Object.create({ email: null, password: null });
  },

  actions: {
    loginUser(credentials) {
      const { email, password } = getProperties(credentials, 'email', 'password');
      const session = get(this, 'session');

      return session.authenticate('authenticator:sample', email, password);
    }
  }
});
