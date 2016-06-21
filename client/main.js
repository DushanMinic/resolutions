import './main.html';
import { Resolutions } from '../imports/collections/resolutions.js';
import { Session } from 'meteor/session';

Template.body.helpers({
	resolutions () {
		if (Session.get('hideFinished')) {
			return Resolutions.find({ checked: { $ne: true } });
		} else {
			return Resolutions.find({}, { sort: { createdAt: -1} });
		}
	},
	hideFinished () {
		return Session.get('hideFinished');
	},
});


Template.body.events({
	'submit .new-resolution'(event) {
		event.preventDefault();

		const title = event.target.title.value;

		Resolutions.insert({
			title : title,
			createdAt: new Date(),
		});

		event.target.title.value = '';
	},
	'change .hide-finished' (event) {
		Session.set('hideFinished', event.target.checked);
	}
});

Template.resolution.events({
	'click .toggle-checked' () {
		Resolutions.update(this._id, { $set: { checked: !this.checked} });
	},
	'click .delete' () {
		Resolutions.remove(this._id);
	},
});