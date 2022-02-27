$(document).ready(function () {
  $('#sidebar').hide();
  //Set active color
  $('.color').on('click', function(){
    let currentId = this.getAttribute('data-color-id');
    $('[data-color-id = '+currentId+']').each(function(){
      $(this).removeClass('active');
    });
    $(this).addClass('active');
  });

  $('.add-to-cart').on('click', function(e) {
    e.preventDefault();
    let counter = 1;
    let currentId = $(this).attr('data-id');
    let color = $('.card-'+currentId+' .color-wrapper .active').attr('data-name');

    if($('[data-cart-id='+currentId+'-'+color+']').length != 0) {
      let quantity = parseInt($('[data-cart-id='+currentId+'-'+color+'] .quantity').text());
      quantity = quantity + 1;
      $('[data-cart-id='+currentId+'-'+color+'] .quantity').text(quantity);
    } else {
      let image = $('.card-'+currentId+' img').attr('src');
      let title = $('.card-'+currentId+' .card-title').text();
      let color = $('.card-'+currentId+' .color-wrapper .active').attr('data-name');
      let price = $('.card-'+currentId+' .price').text();
      $(".cart-container").append(`<div class="cart-item" data-cart-id="`+currentId+`-`+color+`">
        <button type="button" class="close delete-item" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <img class="cart-image float-left" src="`+image+`">
        <div class="cart-details float-left">
          <p class="cart-title">`+title+`</p>
          <p class="cart-color `+color+`">Color: `+color+`</p>
          <div>
            <span class="quantity-counter">
              <button class="minus-quantity btn">-</button><span class="quantity">`+counter+`</span><button class="add-quantity btn">+</button>
            </span>
            <p class="cart-price float-right">`+price+`</p>
          </div>
        </div>
      </div>`);
    }
    countTotalItem();
    calculateSubtotal();
  });

  //Counts total number of item
  function countTotalItem() {
    let count = 0;
    $('.quantity').each(function(){
     count = count + parseInt($(this).text());
    });

    $('#item-count').text(count+' ITEM');
  }

  //calculates subtotal
  function calculateSubtotal() {
    let subtotal = 0;
    $('.cart-item').each(function(){
      let productId = $(this).attr('data-cart-id');
      let price = $('[data-cart-id = '+productId+'] .cart-price').text();
      let quantity = parseInt($('[data-cart-id = '+productId+'] .quantity').text());
      subtotal = subtotal + (price.split('$')[1] * quantity);
    });

    $('.subtotal').text('$'+subtotal);
  }

  $(document).on('click','button.delete-item', function() {
    $(this).parent().remove();
    countTotalItem();
    calculateSubtotal();
  })

  $(document).on('click','button.add-quantity', function() {
    let quantity = parseInt($(this).prev().text());
    $(this).prev().text(quantity + 1);
    countTotalItem();
    calculateSubtotal();
  });

  $(document).on('click','button.minus-quantity', function() {
    let quantity = parseInt($(this).next().text());
    if(quantity > 1) {
      $(this).next().text(quantity - 1);
    }
    countTotalItem();
    calculateSubtotal();
  });

  $('.close-sidebar').on('click', function(e) {
    $('#sidebar').hide();
  });

  $('.cart-icon').on('click', function(e) {
    $('#sidebar').show();
  });
});