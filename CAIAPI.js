const body = document.getElementById('body');
const btn = document.getElementById('btn');

const getImgInfoFunc = async (dataUrl) => {
  //fetch request function 
  const response = await fetch(dataUrl);
  //converting into json
  const data = await response.json();
  //gathering iiif http link
  const iiif = data.config.iiif_url;
  //getting img id
  const imageId = data.data.image_id;
  //cacheing both
  return {iiif, imageId};
  // use this format to build img urls
  // https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg
}

const buildImgUrlFunc = async () => {
  //gathering both necessary components from prior function. 
  //this needs to be async to allow time for the first function to gather info.
  const {iiif, imageId} = await getImgInfoFunc();
  let img = document.createElement('img');
  //using temporal literate syntax to build url from necessary components.
  img.src = `${iiif}/${imageId}/full/843,/0/default.jpg`;
  // console.log(img.src);
  body.append(img);
}

const getApiUrl = () => {
  // const apiUrl = [];
  for (let i = 1; i < 5; i++) {
    let dataUrl = `https://api.artic.edu/api/v1/artworks?page=${i}&fields=image_id,artist_title,id,iiif_url`;
    console.log(dataUrl);
    getImgInfoFunc(dataUrl);
  }
  // console.log(apiUrl);
  // return apiUrl;
}

// const pickApiUrl = () => {
//   const apiUrl = getApiUrl();
//   for (let i = 0; i <= 3; i++){
//     let indUrl = apiUrl.pop();
//     console.log(indUrl);
//     getImgInfoFunc(indUrl);
//     // let numIndUrl = indUrl
//   }
// }
//to total the number of points create a final string interp saying take sum of total points and add a zero to it (e.g. `your score is ${sum}0`)

btn.addEventListener('click', buildImgUrlFunc);
// const iiif = data.config.iiif_url

// "https://api.artic.edu/api/v1/artworks?page=1&page=100"