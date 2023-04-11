import {renderPictureModal} from './picture-modal.js';
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {onFormSubmit, closeModal, showFullSuccessMessage, showFullErrorMessage} from './form-edit.js';

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
  renderPictureModal(data);
} catch (err) {
  showAlert(err.message);
}
