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
		Resolutions.remove(id);
	},
	'updateResolution' (id, checked) {
		Resolutions.update(id, { $set: { checked: checked} });
	},
});