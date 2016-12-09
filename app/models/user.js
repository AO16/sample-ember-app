import DS from 'ember-data';

const {
  attr,
  hasMany
} = DS;

export default DS.Model.extend({
  name: attr('string'),
  email: attr('string'),
  password: attr('string'),
  tweets: hasMany('tweet', { async: false })
});
