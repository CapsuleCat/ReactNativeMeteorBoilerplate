import { Mongo } from 'meteor/mongo';

const Items = new Mongo.Collection('items');

Meteor.methods({
  'items.addOne': ({ name }) => {
    return Items.insert({ name });
  },
});

Meteor.publish('items', () => {
  return Items.find();
});

export default Items;
