/*global define */
var app = app || { };

(function  () {
	function ApiConnection(url) {
		var self = this;

		self.getAll = function (callback) {
			$.getJSON(url).done(callback);
		};

		self.getById = function (id, callback) {
			$.getJSON(url + '/' + id).done(callback);
		};

		self.update = function (entity) {
			return $.ajax({ type: 'put', data: entity, url: url });
		};

		self.add = function (entity, callback) {
			$.post(url, entity).done(callback);

		};

		self.remove = function (entity, callback) {
			$.ajax({ type: 'delete', data: entity, url: url }).done(callback);
		};

		self.hallo = function() {
			console.log("hallo");
		};

		return self;
	}

	app.ApiConnection = ApiConnection;
}());