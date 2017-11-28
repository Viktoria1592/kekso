(function() {
var container = document.querySelector('.hotels-list')




hotels.forEach(function(hotel) {
       var element = getElementFromTemplate(hotel);
    container.appendChild(element);
               });



 

function getElementFromTemplate(data) {
     var template = document.querySelector('#hotel-template');
    if ('content' in template) {
    var element = template.content.children[0].cloneNode(true);
    } else {
        var element = template.children[0].cloneNode(true);
    }
       element.querySelector('.hotel-name').textContent = data.name;
    element.querySelector('.hotel-distance').textContent = data.distance;
    element.querySelector('.hotel-rating').textContent = data.rating;
    element.querySelector('.hotel-price').textContent = data.price;
    
    var backgroundImage = new Image();
    backgroundImage.onload = function() {
        clearTimeout(imageLoadTimeout);
        element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
    };
     backgroundImage.onerror = function() {
      element.classList.add('hotel-nophoto');
    };

    /**
     * @const
     * @type {number}
     */
    var IMAGE_TIMEOUT = 10000;

    // Установка таймаута на загрузку изображения. Таймер ожидает 10 секунд
    // после которых он уберет src у изображения и добавит класс hotel-nophoto,
    // который показывает, что у отеля нет фотографий.
    var imageLoadTimeout = setTimeout(function() {
      backgroundImage.src = ''; // Прекращаем загрузку
      element.classList.add('hotel-nophoto'); // Показываем ошибку
    }, IMAGE_TIMEOUT);
    
    backgroundImage.src = '/' + data.preview;
      return element;
   
   
//    element.innerHTML = '' +
//    '<span class="hotel-stars">' + data.stars + '</span>' +
//    '<h3 class="hotel-name">' + data.name + '</h3>' +
//    '<div class="hotel-distance">' + data.distance + '<span class="hotel-distance-kilometers"></span> до центра</div>' +
//    '<span class="hotel-rating">' + data.rating + '</span>' +
//    '<span class="hotel-favourite"></span>' +
//    '<a href="#" class="hotel-price"><span class="hotel-price-value">' + data.price + '</span>&nbsp;<span class="rouble">руб.</span></a>';
   
}
    })();