'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DUMMY_AVATAR = 'img/muffin-grey.svg';

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var advertPhotoChooser = document.querySelector('#images');
  var advertPhotoPreview = document.querySelector('.ad-form__photo');

  var onChooserChange = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (fileChooser === avatarFileChooser) {
          avatarPreview.src = reader.result;
        }

        if (fileChooser === advertPhotoChooser) {
          advertPhotoPreview.style.backgroundImage = 'url(' + reader.result + ')';
          advertPhotoPreview.style.backgroundSize = 'cover';
        }
      });

      reader.readAsDataURL(file);
    }
  };

  var cleanImages = function () {
    avatarPreview.src = DUMMY_AVATAR;
    advertPhotoPreview.style.backgroundImage = 'none';
  };

  avatarFileChooser.addEventListener('change', onChooserChange);
  advertPhotoChooser.addEventListener('change', onChooserChange);

  window.images = {
    reset: cleanImages
  };
}
)();
