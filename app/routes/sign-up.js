import Ember from 'ember';

const {
  get,
  getProperties,
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  session: service(),

  model() {
    return this.store.createRecord('user');
  },
  actions: {
    addUser(user) {
      const { email, password } = getProperties(user, 'email', 'password');

      return user.save()
        .then(()=> {
          const session = get(this, 'session');

          session.authenticate('authenticator:sample', email, password);
        });
    }
  }
});
