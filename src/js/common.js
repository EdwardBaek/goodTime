export const covertHypenToCamelStyle = (string) => {
  return string.split("-").map( (cur,idx) => {
    if(idx === 0) return cur;

    return cur.slice(0,1).toUpperCase() + cur.substr(1);
  }).join("");
}

export const relaceHtmlWithJsonData = (html, data)=>{
  let dummyHtml = "";
  let dummyHtmlAll = "";
  data.map( cur => {
    dummyHtml = html;
    
    for( let key in cur ) {
      if( !cur.hasOwnProperty(key)) continue;
      dummyHtml = dummyHtml.split(`js-src`).join("src");
      dummyHtml = dummyHtml.split(`{${key}}`).join(cur[key]);
    }
    dummyHtmlAll += dummyHtml;
  })
  return dummyHtmlAll;
}

export const ProductDetailDataHelper = (function(){
  var dom;
  var html;
  var objData;
  var convertedHtml = "";
  function __productDetailDataHelper(dom) {
    this.dom = dom;
    if (!this.html){
      this.setHtml(dom);
    }
  }
  __productDetailDataHelper.prototype.setHtml = function(dom){
    this.html = dom.innerHTML;
  }
  __productDetailDataHelper.prototype.getCovertedHtml = function(objData){
    this.objData = objData;
    this.convertedHtml = this.html.split("js-src").join("src");
    for( let key in objData ) {
      if(!objData.hasOwnProperty(key) ) continue;
      this.convertedHtml = this.convertedHtml.split(`{${key}}`).join(objData[key]);
    }
    return this.convertedHtml;
  }
  __productDetailDataHelper.prototype.getDom = function() {
    return this.dom;
  }

  return __productDetailDataHelper;
})();

export const openModal = (e, callback) => {
  if(typeof callback === 'function') {
    callback(e);
  }
  document.getElementsByTagName("body")[0].classList.add("modal-visible");
}
export const closeModal = (e) => {
  console.log(e);
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  document.getElementsByTagName("body")[0].classList.remove("modal-visible");
}

export const test = (log) => {
  console.log(`test ${log}`);
}
