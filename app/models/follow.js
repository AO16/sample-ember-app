import DS from 'ember-data';

const { belongsTo } = DS;

export default DS.Model.extend({
  follower: belongsTo('user'),
  following: belongsTo('user')
});
