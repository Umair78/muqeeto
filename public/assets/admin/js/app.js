document.addEventListener('DOMContentLoaded', function (event) {

	'use strict';

	// Initialise resize library
	var resize = new window.resize();
	resize.init();

	// Upload photo
	var upload = function (pid, photo, fileExt, callback) {
		var formData = new FormData();
		formData.append('photo', photo);
		formData.append('projectID', pid);
		formData.append('fileExt', fileExt);
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				callback(request.response);
			}
		}
		request.open('POST', './process.php');
		request.responseType = 'json';
		request.send(formData);
	};

	var fileSize = function (size) {
		var i = Math.floor(Math.log(size) / Math.log(1024));
		return i;
		// return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
	};

	document.querySelector('#submitForm').addEventListener('click', function (event) {
		event.preventDefault();

		// var files = event.target.files;
		var file_s = document.getElementById('image-picker').files;
		var pid = document.getElementById('project_id').value;
		var fileExt = document.getElementById('image-picker').value;
		// alert(file_s);
		for (var i in file_s) {

			if (typeof file_s[i] !== 'object') return false;

			(function () {

				var initialSize = file_s[i].size;

				resize.photo(file_s[i], 1200, 'file', function (resizedFile) {

					var resizedSize = resizedFile.size;

					upload(pid, resizedFile, fileExt, function (response) {
							var check_img = document.getElementById("check_img"),
					        check_thumb = document.getElementById("check_thumb"),
					        check_file = document.getElementById("check_file"),
					        file_name = document.getElementById("fileName").value,
					        file_desc = document.getElementById("fileDesc").value;
					        var img = check_img.checked;
					        var thumb = check_thumb.checked;
					        var file = check_file.checked;

					    if (file_name == "" || file_name == null ||
					        file_desc == "" || file_desc == null) {
					        alert("Please enter values to Add");
					    return false;
					    }

						var rowElement = document.createElement('tr');
						rowElement.innerHTML = '<td>'+file_name+'</td><td>'+file_desc+'</td><td>'+file+'</td><td>'+thumb+'</td><td>'+img+'</td><td style="visibility: hidden; width: 0px;">'+response.url+'</td><td class="align-middle text-center"><img src="../'+response.url+'" width="70%"></td><td><a onclick="deleteRowFile(this)"><span class="fa fa-trash"></span></a></td>';
						document.querySelector('table.images tbody').appendChild(rowElement);
						readDataFile();
					    $('#fileUploadModal').modal("hide");

					});

					// This is not used in the demo, but an example which returns a data URL so yan can show the user a thumbnail before uploading th image.
					resize.photo(resizedFile, 600, 'dataURL', function (thumbnail) {
						console.log('Display the thumbnail to the user: ', thumbnail);
					});

				});

			}());

		}

	});

});
