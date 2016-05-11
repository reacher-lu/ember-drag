import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',

  setupXbutton: Ember.on('didInsertElement', function() {
    // ...
  }),

  teardownXbutton: Ember.on('willDestroyElement', function() {
    this.get('x-button').destroy();
  }),
});