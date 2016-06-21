import './main.html';
import { Resolutions } from '../imports/collections/resolutions.js';


Template.body.helpers({
	resolutions () {
		return Resolutions.find({}, { sort: { createdAt: -1} });
	}
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
});