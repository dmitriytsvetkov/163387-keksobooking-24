const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('#avatar');
const photoFileChooser = document.querySelector('#images');

const onInputChange = (evt) => {
  const img = evt.target.closest('.ad-form--upload').querySelector('img');
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    img.src = URL.createObjectURL(file);
  } else {
    img.src = 'img/muffin-grey.svg';
  }
};

const setFilesPreview = () => {
  avatarFileChooser.addEventListener('change', onInputChange);
  photoFileChooser.addEventListener('change', onInputChange);
};

export {setFilesPreview};
