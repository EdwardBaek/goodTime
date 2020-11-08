// set css
import './assets/styles/normalize.css';
import './assets/styles/styles.css';
import 'font-awesome/css/font-awesome.min.css';

// UI Set
import { loader } from './js/loader';
import { scroll }  from './js/scroll';

import { productData } from './js/productData';
import { openModal, closeModal, covertHypenToCamelStyle, relaceHtmlWithJsonData, ProductDetailDataHelper, test } from './js/common';

// set item content
function setItemContent() {
  const productItemIdList = [
    'gas-firepit',
    'wood-firepit',
    'grill-pizza-oven',
    'planter',
    'garden-arch',
    'garden-decoration'
  ]
  
  productItemIdList.map( id => {
    const item = document.querySelector(`#${id} .product-item`);
    item.innerHTML = relaceHtmlWithJsonData(item.innerHTML, productData[covertHypenToCamelStyle(id)]);
  });
}

// set detail 
function setModalEvent() {
  // set modal 
  const itemList = Array.from(document.querySelectorAll('.item-list .product-item a'));
  itemList.map( cur => {
    cur.addEventListener('click', (e) => {
      openModal(cur, setItemDetailContent.bind(this, cur, _detailHelper));
    });
  } );
  
  document.getElementById("overlay").addEventListener("click", closeModal);
  document.getElementById("modal-close").addEventListener("click", closeModal);

}

const _detailHelper = new ProductDetailDataHelper(document.getElementById("item-detail-card"));
function setItemDetailContent(e, helper) {
  const getProductItemData = (e) => {
    let dataKey = covertHypenToCamelStyle(e.getAttribute("data-data")); 
    let id = parseInt(e.getAttribute("data-id"));
    return productData[dataKey].filter(cur => {
      return cur.id === id;
    })[0];
  }
  _detailHelper.getDom().innerHTML = _detailHelper.getCovertedHtml(getProductItemData(e));
}

document.addEventListener('DOMContentLoaded',  ()=> {
  setItemContent();
  setModalEvent();
});