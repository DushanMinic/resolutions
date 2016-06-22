import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Resolutions = new Mongo.Collection('resolutions');

Meteor.methods({
	'addResolution' (title) {
		check(title, String);

		Resolutions.insert({
			title : title,
			createdAt: new Date(),
			
		});
	},
	'deleteResolution' (id) {
		const res = Resolutions.findOne(id);

		if(res.owner !== Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		} 

		Resolutions.remove(id);
	},
	'updateResolution' (id, checked) {
		const res = Resolutions.findOne(id);

		if(res.owner !== Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		} 
		
		Resolutions.update(id, { $set: { checked: checked} });
	},
	'setPrivate' (id, private) {
		const res = Resolutions.findOne(id);

		if(res.owner !== Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		} 

		Resolutions.update(id, { $set: { private: private} });
	},
});

if (Meteor.isServer) {
	Meteor.publish('resolutions', function ()  {
		return Resolutions.find({
		 $or: [
		 { private: { $ne: true } },
		  { owner: this.userId }]}, 
		  { sort: { createdAt: -1} });
	});
}


