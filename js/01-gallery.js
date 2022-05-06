import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);

galleryRef.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();

  const isGalleryImageEl = event.target.classList.contains("gallery__image");
  if (!isGalleryImageEl) {
    return;
  }
  const originalImageURL = event.target.dataset.source;

  createModalImageEl.show();
}

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

const createModalImageEl = basicLightbox.create(
  `
    <img src="${originalImageURL}" width="800" height="600">
`,
  {
    onShow: (instance) => {
      instance.onclick = instance.close;
    },
  }
);
