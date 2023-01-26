const listItems = document.querySelectorAll(".listItem"),
  channelPreviews = Array.from(document.querySelectorAll(".channelPreview")),
  titleInput = document.querySelector("#titleInput"),
  descriptionInput = document.querySelector("#descriptionInput"),
  cardTitles = [...document.querySelectorAll(".cardTitle")],
  imageInput = document.querySelector("#imageInput"),
  cardImages = document.querySelectorAll(".channelImage"),
  generateMetaTagsBtn = document.querySelector("#generateMetaTagsBtn"),
  cardDescriptions = document.querySelectorAll(".cardDescription");

const disableActiveElement = (element) => {
  element.classList.remove("listItemActive");
};

const enableActiveElement = (element) => {
  element.classList.add("listItemActive");
};

const isElementActive = (element) => {
  return element.classList.contains("listItemActive");
};

const switchListItemStatus = (listItem) => {
  isElementActive(listItem)
    ? disableActiveElement(listItem)
    : enableActiveElement(listItem);
};

const enableChannelPreview = (element) => {
  element.classList.add("channelPreviewActive");
};

const disableChannelPreview = (element) => {
  element.classList.remove("channelPreviewActive");
};

const updatePreview = (listItem) => {
  const channelPreview = channelPreviews.find(({ id }) => {
    return id === listItem.id;
  });

  isElementActive(listItem)
    ? enableChannelPreview(channelPreview)
    : disableChannelPreview(channelPreview);
};

const updateCardTitles = (value) => {
  cardTitles.forEach((cardTitle) => {
    cardTitle.textContent = value;
  });
};

const updateCardDescriptions = (value) => {
  cardDescriptions.forEach((cardDescription) => {
    cardDescription.textContent = value;
  });
};

const updateCardImage = (url) => {
  cardImages.forEach((cardImage) => {
    cardImage.style.backgroundImage = `url(${url})`;
  });
};

const getUrlImageByFile = (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    if (file) reader.readAsDataURL(file);
  });
};

const getMetaTagsText = () => {
  const { value: title } = titleInput;
  const { value: description } = descriptionInput;

  return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://metatags.io/">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
  `;
};

listItems.forEach((listItem) => {
  listItem.addEventListener("click", () => {
    // Switch List Item Status
    switchListItemStatus(listItem);

    // Update preview
    updatePreview(listItem);
  });
});

titleInput.addEventListener("input", (event) => {
  const {
    target: { value },
  } = event;

  updateCardTitles(value);
});

descriptionInput.addEventListener("input", ({ target: { value } }) => {
  updateCardDescriptions(value);
});

imageInput.addEventListener("change", async ({ target }) => {
  try {
    const { files } = target;
    const [file] = files;

    const url = await getUrlImageByFile(file);

    updateCardImage(url);
  } catch (error) {
    console.log("🚀 ~ imageInput.addEventListener ~ error", error);
  }
});

generateMetaTagsBtn.addEventListener("click", () => {
  const metaTagsText = getMetaTagsText();

  navigator.clipboard
    .writeText(metaTagsText)
    .then(() => console.log("Vinculo copiado al portapapeles."))
    .catch(console.error);
});
