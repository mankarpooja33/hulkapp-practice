import './styles.scss';
import './sidebar';

//Get scroll container
const scrollContainer = document.querySelector(`#scroll-content`);

//Handle scroll event on scroll container
scrollContainer.addEventListener('scroll', function() {
  const animateContainer = document.querySelector('.animate-container');
  const layerPointer = document.querySelector('.layer-pointer');
  const filterJar = document.querySelector('.jar-container');

  if(this.scrollTop == 0) {
    layerPointer.style.visibility = 'visible';
    layerPointer.style.top = '152px';
  }else if(this.scrollTop > 128) {
    layerPointer.style.visibility = 'visible';
    layerPointer.style.top = '275px';
  } else {
    layerPointer.style.visibility = 'hidden';
  }

  if (this.scrollTop < 145) {
    filterJar.style.display = 'none';
    animateContainer.style.transform = 'translateY('+this.scrollTop+'px)';
  } else if (this.scrollTop > 200 && this.scrollTop < 370){
    filterJar.style.display = 'block';
    filterJar.style.transform = 'translateY(-'+this.scrollTop+'px)';
  }
});

const jsonData= require('./assets/json/products.json'); 
createCards(jsonData);

/*
 * Creates dynamic cards using json
 * @param jsonData - product json data
*/
function createCards(jsonData) {
  let productWrapper = document.querySelector('#product-wrapper');
  let cardTitle, cardBtn, price, colorElement;
  let outerDiv, outerCard, cardImage, colorContainer, cardBody;
  for(let i in jsonData.products) {
    const product = jsonData.products[i]['images'];
    outerDiv = createElement('div', {'class': 'col-3 col-md-3 card-wrapper card-'+jsonData.products[i]['id']});
    outerCard = createElement('div', {'class': 'card'});
    cardBody = createElement('div', {'class': 'card-body'});
    cardTitle = createElement('div', {'class': 'card-title'}, jsonData.products[i]['title']);
    cardBtn = createElement('a', {'href': '#', 'class':'btn text-uppercase add-to-cart', 'data-id': jsonData.products[i]['id']},'Add to cart');
    price = createElement('div', {'class': 'price'}, '$'+jsonData.products[i]['variants'][0]['price']);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(price);

    for(let card in product) {
     let productImg = product[card]['src'];
     cardImage = createElement('img', {'src': productImg, 'class': 'card-img-top' });
    }
    outerCard.appendChild(cardImage);
    outerCard.appendChild(cardBody);

    const colors = jsonData.products[i]['options'];
    for( let color in colors) {
      if(colors[color]['name'] == 'Color') {
        const shirtColor = colors[color]['values'];
        colorContainer = createElement('div', {'class' : 'color-wrapper'})
        for( let c in shirtColor) {
          if(c == 0) {
            colorElement = createElement('button', {'class' : 'btn btn-primary color active', 'data-color-id': jsonData.products[i]['id'],'data-name':shirtColor[c],'style': 'background-color: '+shirtColor[c]})
          } else {
            colorElement = createElement('button', {'class' : 'btn btn-primary color', 'data-color-id': jsonData.products[i]['id'],'data-name':shirtColor[c],'style': 'background-color: '+shirtColor[c]});
          }
          colorContainer.appendChild(colorElement);
        }
        cardBody.appendChild(colorContainer);
      }
    }

    outerCard.appendChild(cardBtn);
    outerDiv.appendChild(outerCard);
    productWrapper.appendChild(outerDiv);
  }
}

// Creates html element
function createElement(element, attributes, text) {
  let newElement = document.createElement(element);
  for(let attr in attributes) {
    newElement.setAttribute(attr, attributes[attr]);
  }
  if(text) {
    newElement.textContent = text;
  }
  return newElement;
}
