'use strict';

angular.module('mean.upload').directive('meanUpload', function($upload, randomString) {
    return {
        templateUrl: 'upload/views/directives/meanUpload.html',
        scope: {
            fileDest: '=',
            uploadCallback: '&',
            uploadFileCallback: '&'
        },
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            $scope.onFileSelect = function($files) {
                var files = [];
                $scope.files = $files;
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    var rs = randomString(10);
                    console.log("Random String: " + rs);
                    $scope.upload = $upload.upload({
                        url: 'api/meanUpload/upload',
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: {
                            dest:  $scope.fileDest + '/' + rs +'/'
                        },
                        file: file
                    }).progress(function(evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function(data, status, headers, config) {
                        console.log(data);
                        if (data.success) {
                            if (angular.isDefined(attrs.uploadFileCallback)) {
                                console.log("data file src: ");
                                console.log(data.file.src);
                                $scope.uploadFileCallback({
                                    file: data.file
                                });
                            }
                            files.push(data.file);
                        }
                        if (files.length === $files.length) {
                            if (angular.isDefined(attrs.uploadCallback)) {
                                $scope.uploadCallback({
                                    files: files
                                });
                            }
                        }
                    });
                }
            };
        }
    };
});

