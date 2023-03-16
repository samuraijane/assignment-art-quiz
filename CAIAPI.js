const body = document.getElementById('body');
const btn = document.getElementById('btn');

const getImgInfoFunc = async (dataUrl) => {
  const imgIdArr = [];
  //fetch request function 
  const response = await fetch(dataUrl);
  //converting into json
  const data = await response.json();
  console.log(data);
  //gathering iiif http link
  const iiif = data.config.iiif_url;
  //separating each imgs info
  const indImgInfo = () => {
    data.data.forEach(image_id => 
      imgIdArr.push(image_id)
    );
    return imgIdArr;
  }
  console.log(imgIdArr);
  return {indImgInfo, iiif};
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

const getApiUrl = async () => {
  // const apiUrl = [];
  for (let i = 1; i < 5; i++) {
    let dataUrl = `https://api.artic.edu/api/v1/artworks?page=${i}&fields=image_id,artist_title,id,iiif_url`;
    // console.log(dataUrl);
    await getImgInfoFunc(dataUrl);
    // buildImgUrlFunc()
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

btn.addEventListener('click', getApiUrl);
// const iiif = data.config.iiif_url

// "https://api.artic.edu/api/v1/artworks?page=1&page=100"