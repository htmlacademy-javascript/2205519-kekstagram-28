import {renderPictures} from './picture-modal.js';
import {getData, sendData} from './api.js';
import {showAlert, debounce} from './util.js';
import {onFormSubmit, closeModal, showFullSuccessMessage, showFullErrorMessage} from './form-edit.js';
import {initFilterListeners} from './filter.js';
import './uploaded-photo.js';

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showFullSuccessMessage();
  } catch {
    showFullErrorMessage();
  }
});

try {
  const data = await getData();
  renderPictures(data);
  initFilterListeners(data, debounce(renderPictures));
} catch (err) {
  showAlert(err.message);
}
