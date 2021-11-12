const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const ImgSettings = {
  SIZE: '70',
  CLASS: 'ad-form__photo',
  DEFAULT_SRC: 'img/muffin-grey.svg',
};

const avatarInput = document.querySelector('#avatar');
const photosInput = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photosContainer = document.querySelector('.ad-form__photo-container');

const clearImages = () => {
  const containers = document.querySelectorAll(`.${ImgSettings.CLASS}`);

  containers.forEach((container) => {
    container.remove();
  });
};

const createImgContainer = () => {
  const block = document.createElement('div');
  block.classList.add(ImgSettings.CLASS);

  return block;
};

const addPicture = (preview) => {
  const container = createImgContainer();
  const img = document.createElement('img');

  img.setAttribute('src', URL.createObjectURL(preview));
  img.setAttribute('width', ImgSettings.SIZE);
  img.setAttribute('height', ImgSettings.SIZE);

  container.append(img);
  photosContainer.append(container);
};

const clearPreviews = () => {
  avatarPreview.src = ImgSettings.DEFAULT_SRC;
  clearImages();
  photosContainer.append(createImgContainer());
};

const onAvatarChange = (evt) => {
  const img = avatarPreview;
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    img.src = URL.createObjectURL(file);
  }
};

const onPhotosChange = () => {
  const preview = photosInput.files[0];
  clearImages();
  addPicture(preview);
};

const setFilesPreview = () => {
  avatarInput.addEventListener('change', onAvatarChange);
  photosInput.addEventListener('change', onPhotosChange);
};

export {setFilesPreview, clearPreviews};
