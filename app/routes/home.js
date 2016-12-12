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
  ajax: service(),

  model() {
    const { authenticated: { user_id: userId } } = get(this, 'session.data');

    return hash({
      newTweet: this.store.createRecord('tweet'),
      user: this.store.findRecord('user', userId),
      tweets: get(this, 'ajax').request(`/api/users/${userId}/timeline`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      })
        .then((result)=> {
          return this.store.pushPayload(result);
        })
    });
  },

  actions: {
    submitTweet(tweet) {
      const user = get(this, 'controller.model.user');

      set(tweet, 'user', user);

      return tweet.save()
        .then(()=> {
          set(this, 'controller.model.newTweet', this.store.createRecord('tweet'));
          this.refresh();
        });
    }
  }
});
