const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('#avatar');
const photoFileChooser = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoPreview = document.querySelector('.ad-form__photo img');

const setFilesPreview = () => {
  avatarFileChooser.addEventListener('change', () => {
    const file = avatarFileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });

  photoFileChooser.addEventListener('change', () => {
    const file = photoFileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      photoPreview.src = URL.createObjectURL(file);
    }
  });
};

export {setFilesPreview};
