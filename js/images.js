'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var advertFileChooser = document.querySelector('#images');
  var advertPhotoPreview = document.querySelector('.ad-form__photo');

  var onImageLoad = function (evt) {
    console.log(evt.target);
  };

  avatarFileChooser.addEventListener('change', onImageLoad);

  // avatarFileChooser.addEventListener('change', function () {
  //   var file = avatarFileChooser.files[0];
  //   var fileName = file.name.toLowerCase();
  //
  //   var matches = FILE_TYPES.some(function (it) {
  //     return fileName.endsWith(it);
  //   });
  //
  //   if (matches) {
  //     var reader = new FileReader();
  //
  //     reader.addEventListener('load', function () {
  //       avatarPreview.src = reader.result;
  //     });
  //
  //     reader.readAsDataURL(file);
  //   }
  // });

  advertFileChooser.addEventListener('change', function () {
    var file = advertFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        advertPhotoPreview.style.backgroundImage = 'url(' + reader.result + ')';
        advertPhotoPreview.style.backgroundSize = 'cover';
      });

      reader.readAsDataURL(file);
    }
  });
}
)();
