import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);

galleryRef.addEventListener("click", onGalleryItemClick);

function createGalleryMarkup(items) {
  return items
    .map(({ original, preview, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
    </div>`;
    })
    .join("");
}

function onGalleryItemClick(event) {
  event.preventDefault();

  const isGalleryImageEl = event.target.classList.contains("gallery__image");
  if (!isGalleryImageEl) {
    return;
  }

  const originalImageURL = event.target.dataset.source;
  createModalImage(originalImageURL);
}

function createModalImage(src) {
  window.addEventListener("keydown", onEscKeyPress);
  basicLightbox
    .create(
      `
		<img src="${src}" width="1280" height="852">
	`
    )
    .show();
}

function onCloseModal(src) {
  window.removeEventListener("keydown", onEscKeyPress);
  basicLightbox
    .create(
      `
		<img src="${src}" width="1280" height="852">
	`
    )
    .close();
}

function onEscKeyPress(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}
