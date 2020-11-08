import imagesLoaded from 'imagesLoaded';

export const loader = (()=>{

let setLoader = ()=> {
  setTimeout( ()=> {
    document.getElementsByTagName("body")[0].classList.add("loaded");
  }, 500);
}

document.getElementById("loader-wrapper").addEventListener("click", ()=>{
  document.getElementsByTagName("body")[0].classList.add("loaded");
});

document.addEventListener("DOMContentLoaded", ()=>{
  console.log('imagesLoaded', imagesLoaded);
  if( imagesLoaded) {
    let progressCount = 0;
    let imgLoaded = imagesLoaded(".product-item"); 
    // TODO: add delay to display

    const progress = (imgLoad) => {
      const progressPercentage = Math.floor(100*imgLoad.progressedCount/imgLoad.images.length);
      console.log(progressPercentage);
      function setWidth(progressPercentage) {
        document.getElementById("loader-progress-bar").style.width = progressPercentage+"%";
        document.getElementById("loader-progress-percentage").innerHTML = progressPercentage+"%";
        // console.log("progressPercentage", progressPercentage);
      }

      for(let i = progressCount; i <= progressPercentage; i++) {
        setWidth(i);
      }

      progressCount = progressPercentage;
    };
    const afterDone = (imgLoad) => {
      setLoader();
    };

    imgLoaded.on("progress", progress);
    imgLoaded.on("always", afterDone);
    
  } else {
    setLoader();
  }

});

})();
