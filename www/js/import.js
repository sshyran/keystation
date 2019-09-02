(function() {
   window.pinType = "import";

   $("#importBtn").on('click', function() {
      var account = $("#account").val();
      var mnemonics = $("#mnemonics").val();

      if ($.trim(account) == "") {
         $("#formInfoMessage").hide();
         $("#errorOnImport").show().find('span').text("Invalid account.");
         return;
      }

      if ($.trim(mnemonics) == "") {
         $("#formInfoMessage").hide();
         $("#errorOnImport").show().find('span').text("Invalid mnemonics.");
         return;
      }

      $(".pin-wrap").addClass("open");
   })

   $("#importBtn2").on('click', function(){
      submitForm();
   })

})();

function copyAddress() {
   var copyText = document.getElementById("encrypted-mnemonics-for-copy");
   copyText.select();
   document.execCommand("copy");
   alert("Encrypted mnemonic phrase is copied.");
}

function getParameterByName(name, url) {
   if (!url) url = window.location.href;
   name = name.replace(/[\[\]]/g, '\\$&');
   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
       results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// submit
function submitForm() {
   var account     = $("#hidden-account").val();
   var mnemonics	   = $("#mnemonics").val();

   if ($.trim(account) == "") {
      $("#formInfoMessage").hide();
      $("#errorOnImport").show().find('span').text("Invalid account.");
      return;
   }

   if ($.trim(mnemonics) == "") {
      $("#formInfoMessage").hide();
      $("#errorOnImport").show().find('span').text("Invalid mnemonics.");
      return;
   }

   // Check encrypted mnemonic phrase and pasted value
   if (document.getElementById("encrypted-mnemonics").innerText != $("input[type=password]").val() ) {
      alert("Invalid encrypted mnemonics");
      return;
   }

   // loader
   $("#importBtn").html('<i class="fa fa-spinner fa-spin"></i>');

   window.lcd = getParameterByName('lcd');
   var hdPath = getParameterByName('path');

   var hdPathArr = hdPath.split("/");
   var hdPathResult = "";
   for (var i = 0; i < hdPathArr.length; i++) {
      hdPathResult += String(hdPathArr[i]);
      if (i < 3) {
         // 44, 118, 0
         if (hdPathArr[i].indexOf("'") == -1) {
            hdPathResult += "'";
         }
      }

      if (i < hdPathArr.length - 1) {
         hdPathResult += "/";
      }
   }

   var prefix = getParameterByName('payload');

   var address = getKeyStationMainAddress($.trim(mnemonics), hdPathResult, prefix);
   $("input[name=payload]").val(address);

   $('.keystation-form').submit();
}
