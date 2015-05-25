app.controller(
	"fileCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		'Upload', '$rootScope', '$http',

		function(scope, filter, timeout, state, Restangular, Upload, rootScope, http) {
			Files = Restangular.all('Files?format=json');
			Slides = Restangular.all('files/slides?format=json');
			loadFileList();
			loadSlidesList();

			scope.progress = [];

			function loadFileList() {
				Files.customGET().then(function(files) {
					console.log(files);
					scope.files = files;
				});
			}

			function loadSlidesList() {
				Slides.customGET().then(function(slides) {
					scope.slides = slides;
				});
			}


			scope.$watch('files', function() {
				scope.upload(scope.files);
			});

			scope.$watch('slides', function() {
				scope.uploadSlides(scope.slides);
			});

			scope.upload = function(files) {
				console.log(Upload);
				if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
						var file = files[i];
						Upload.upload({
							url: 'files',
							fields: {
								'username': rootScope.user.f_name
							},
							file: file
						}).progress(function(evt) {
							var progressPercentage = parseInt(100.0 * evt.loaded /
								evt.total);
							console.log('progress: ' + progressPercentage + '% ' +
								evt.config.file
								.name);
							scope.progress.percentage = progressPercentage;
							scope.progress.file = evt.config.file.name;

						}).success(function(data, status, headers, config) {
							console.log('file ' + config.file.name +
								'uploaded. Response: ' +
								data);
						});
					}
				}
			};


			scope.uploadSlides = function(files) {
				console.log(Upload);
				if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
						var file = files[i];
						Upload.upload({
							url: 'files/slides',
							fields: {
								'username': rootScope.user.f_name
							},
							file: file
						}).progress(function(evt) {
							var progressPercentage = parseInt(100.0 * evt.loaded /
								evt.total);
							console.log('progress: ' + progressPercentage + '% ' +
								evt.config.file
								.name);
							scope.progress.percentage = progressPercentage;
							scope.progress.file = evt.config.file.name;

						}).success(function(data, status, headers, config) {
							console.log('file ' + config.file.name +
								'uploaded. Response: ' +
								data);
						});
					}
				}
			};


			scope.archiveSlide = function archiveSlide(slide) {
				console.log(slide);
			};
			scope.removeSlide = function removeSlide(slide) {
				// console.log();
				//
				http.delete('files/slides', slide)
					.success(function(data, response) {
						console.log(data);
					});
			};
		}
	]
);
