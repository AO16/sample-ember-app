import Ember from 'ember';

const {
  get,
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  session: service(),

  model({ id }) {
    return this.store.findRecord('user', id, { include: 'tweets' });
  },

  actions: {
    followUser(user) {
      const { authenticated: { user_id: userId } } = get(this, 'session.data');
      const currentUser = this.store.peekRecord('user', userId);
      const follow = this.store.createRecord('follow', {
        following: user,
        follower: currentUser
      });

      follow.save();
    }
  }
});
