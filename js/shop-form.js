// shipping function
$("#is-shipping-same").change(function() {
    if ($(this).val() == "no") {
      $('#shipping-streetaddressDiv').show();
      $('#shipping-streetaddress').attr('required', '');
      $('#shipping-streetaddress').attr('data-error', 'This field is required.');
    } else {
      $('#shipping-streetaddressDiv').hide();
      $('#shipping-streetaddress').removeAttr('required');
      $('#shipping-streetaddress').removeAttr('data-error');
    }
  });
  $("#is-shipping-same").trigger("change");
  //gift message function
  $("#send-as-gift").change(function() {
    if ($(this).val() == "yes") {
      $('#gift-messageDiv').show();
      $('#recipient-firstname ').attr('required', '');
      $('#recipient-firstname ').attr('data-error', 'This field is required.');
      $('#recipient-lastname').attr('required', '');
      $('#recipient-lastname').attr('data-error', 'This field is required.');
      $('#recipient-giftmessage').attr('required', '');
      $('#recipient-giftmessage').attr('data-error', 'This field is required.');
    } else {
      $('#gift-messageDiv').hide();
      $('#recipient-firstname').removeAttr('required');
      $('#recipient-firstname').removeAttr('data-error');
      $('#recipient-lastname').removeAttr('required');
      $('#recipient-lastname').removeAttr('data-error');
      $('#recipient-giftmessage').removeAttr('required');
      $('#recipient-giftmessage').removeAttr('data-error');
    }
  });
  $("#send-as-gift").trigger("change");

  $(function() {
		$('.pop').on('click', function() {
			$('.imagepreview').attr('src', $(this).find('img').attr('src'));
			$('#imagemodal').modal('show');   
		});		
});

$(document).ready(function(){
	$(".checkout").on("keyup", ".quantity", function(){
		var price = +$(this).data("price");
    var quantity = +$(this).val();
    var totalId = $(this).data("totalid");
    var totalPrice  = (price * quantity).toFixed(2);
    $("#"+totalId).text(totalPrice);
    updateTotalPrice();
  })
  function updateTotalPrice(){
    var subTotal = parseFloat($('#total-signed').html()) + parseFloat($('#total-nonsigned').html()) +
                    parseFloat($('#total-mask').html()) + parseFloat($('#total-men-tshirt').html()) + 
                    parseFloat($('#total-women-tshirt').html()) + parseFloat($('#total-youth-tshirt').html()) +
                    parseFloat($('#total-onesies-tshirt').html());
   if(subTotal>0){
      var taxes = parseFloat(0.06*subTotal).toFixed(2);
      var total = (parseFloat(subTotal) + parseFloat(taxes) + parseFloat(8.25)).toFixed(2);
      $('#subtotal-calc').text(subTotal);
      $('#tax-calc').text(taxes);
      $('#shipping-fees').text('8.25');
      $('#final-total').text(total);
      $('#order-total').val('SubTotal:  $'+subTotal+', Tax:  $'+taxes+', Shipping Fees: $8.25'+', Total: $'+total);
    }else{
      $('#subtotal-calc').text(0.00);
      $('#tax-calc').text(0.00);
      $('#shipping-fees').text(0.00);
      $('#final-total').text(0.00);
      $('#order-total').val('SubTotal: $0,  Tax: 0$, Shipping Fees: $0, Total: $0');
    }
  }

})