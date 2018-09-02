$(document).ready(function(){

  $('#id_div_login').submit(function(e){
    e.preventDefault();
    $.post('/', $(this).serialize(), function(data){
      if (data.ok ){
        alert(data.msg);
      }else{
        alert(data.msg);
      }
    }, 'json');
  });

  });
