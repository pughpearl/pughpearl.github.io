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

$(document).on('change','.item-table',function(){

  var lookup = {
    'Option 1': ['S','M','L','XL','2XL'],
    'Option 2': ['S','M','L','XL','2XL'],
    'Option 3': ['S','M','L'],
    'Option 4': ['0-3','3-6','6-9','9-12']
  };
    var selectValues = $(this).val();
    var selectValue = selectValues.split('-')[0];
    var id =selectValues.split('-')[1];
    $('#'+id).empty();
    for (i = 0; i < lookup[selectValue].length; i++) {
      $('#'+id).append("<option value='" + lookup[selectValue][i] + "'>" + lookup[selectValue][i] + "</option>");
    }
    var newId = id.slice(-1);
    $("#table-total-"+newId).text('0');
    $("#table-qty-input-"+newId).val(0);
    
});

$(document).on('keyup','.quantity-table',function(){ 
    var quantity = +$(this).val();
    var id = $(this).data("productid");
    var productid = $('#'+id).val();
    if(productid){
      var selectValue = productid.split('-')[0];
      var pricing = {
        'Option 1': 28,
        'Option 2': 27,
        'Option 3': 23,
        'Option 4': 20
      };
      var price = pricing[selectValue];
      var totalTable = (price * quantity).toFixed(2);
      $("#table-total-"+id).text(totalTable);
      var tableSubtotal = parseFloat($('#table-subtotal-hidden').val()) + parseFloat(totalTable);
      $('#table-subtotal-hidden').val(tableSubtotal);
      updateTotalPrice();
      $('#more-order-id-'+id).val('More Order::: Type : '+$('#'+id+' option:selected').text()+', Size:'+ $('#choices'+id).val()+
                ',  Quantity: '+quantity);

    }else{
      alert('Please Select the T-shirt Type and Size!');
    }

  })

  function updateTotalPrice(){
    var subTotal = parseFloat($('#total-signed').html()) + parseFloat($('#total-nonsigned').html()) +
                    parseFloat($('#total-mask').html()) + parseFloat($('#total-men-tshirt').html()) + 
                    parseFloat($('#total-women-tshirt').html()) + parseFloat($('#total-youth-tshirt').html()) +
                    parseFloat($('#total-onesies-tshirt').html()) + parseFloat($('#table-subtotal-hidden').val());
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
$(document).ready(function(){

	$(".checkout").on("keyup", ".quantity", function(){
		var price = +$(this).data("price");
    var quantity = +$(this).val();
    var totalId = $(this).data("totalid");
    var totalPrice  = (price * quantity).toFixed(2);
    $("#"+totalId).text(totalPrice);
    updateTotalPrice();
  })

  $(function () {
    var rowCount=0;
    $("#add-more").click(function(){
      
      rowCount++;

      var div = $("<tr />");
        div.html(GetDynamicTextBox(rowCount));
        $("#TextBoxContainer").append(div);
      
    });
    $("body").on("click", ".remove", function () {
        var id = $(this).data("removeid");
        var presentTotal = $("#table-total-"+id).html();
        var tableSubtotal = parseFloat($('#table-subtotal-hidden').val()) - parseFloat(presentTotal);
        $('#table-subtotal-hidden').val(tableSubtotal);
        updateTotalPrice();
        $(this).closest("tr").remove();
    });
});
function GetDynamicTextBox(value) {
    return '<td><select id="'+value+'" class="item-table">'+
    '<option value="" selected>Select</option>'+
    '<option value="Option 1-choices'+value+'">Men</option>'+
    '<option value="Option 2-choices'+value+'">Women</option>'+
    '<option value="Option 3-choices'+value+'">Youth</option>'+
    '<option value="Option 4-choices'+value+'">Onesie</option>'+
    '</select>'+
    '</td>'+
    '<td>'+
    '<select id="choices'+value+'">'+
    '<option value="" disabled selected>Select</option>'+
    '</select>'+
    '</td>'+ '<td><input type="number" id="table-qty-input-'+value+'" data-productid="'+value+'" class="quantity-table" value="0"/></td>'
    + '<input type="hidden" id="more-order-id-'+value+'" name="more-order-'+value+'" value=""/>'
    + '<td>$<span id="table-total-'+value+'">0</span></td>'+
      '<td><button type="button" data-removeid="'+value+'" class="btn btn-danger remove"><i class="glyphicon glyphicon-remove-sign"></i></button></td>'
}
 
})