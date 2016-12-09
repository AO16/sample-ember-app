import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  get,
  inject: { service },
  RSVP: { hash },
  set
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    const { authenticated: { user_id: userId } } = get(this, 'session.data');

    return hash({
      newTweet: this.store.createRecord('tweet'),
      user: this.store.findRecord('user', userId, { include: 'tweets' })
    });
  },

  actions: {
    logOut() {
      const session = get(this, 'session');

      session.invalidate();
    },
    submitTweet(tweet) {
      const user = get(this, 'controller.model.user');

      set(tweet, 'user', user);

      return tweet.save()
        .then(()=> {
          set(this, 'controller.model.newTweet', this.store.createRecord('tweet'));
        });
    }
  }
});
