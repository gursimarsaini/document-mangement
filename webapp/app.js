
$(document).ready(function() {
  notary_init();
});

function hashForFile(callback) {
  input = document.getElementById("hashFile");
  if (!input.files[0]) {
    alert("Please select a file first");
  }
  else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = function (e) {
      content = e.target.result;
      var shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
      shaObj.update(content);
      var hash = "0x" + shaObj.getHash("HEX");
      alert(hash);
      callback(null, hash);
    };
    fr.readAsArrayBuffer(file);
  }
};

function send () {
  // alert('find method')
  hashForFile(function (err, hash) {
    notary_find(hash, function(err, resultObj) {
      if (resultObj.blockNumber != 0) {
        $("#responseText").html("<p>File already exist on Blockchian.</p>"
          + "<p>File Hash Value: " + hash + "</p>"
          + "<p>Block No.: " + resultObj.blockNumber + "</p>"
          + "<p>Timestamp: " + resultObj.mineTime + "</p>"
        );
      } else {
        hashForFile(function (err, hash) {
    notary_send(hash, function(err, tx) {
      $("#responseText").html("<p>File successfully fingreprinted onto Ethereum blockchain.</p>"
        + "<p>File Hash Value: " + hash +"</p>"
        + "<p>Transaction ID: " + tx +"</p>"
        + "<p>Available at contract address: " + address +"</p>"
        + "<p><b>Please alow a few minutes for transaction to be mined.</b></p>"
      );
    });
  });
      }
    });
  });
  // alert("No Ethereum interface injected into browser. Read-only access");
  
};

function find () {
  // alert('find method')
  hashForFile(function (err, hash) {
    notary_find(hash, function(err, resultObj) {
      if (resultObj.blockNumber != 0) {
        $("#responseText").html("<p>File fingerprint found on Ethereum blockchain.</p>"
          + "<p>File Hash Value: " + hash + "</p>"
          + "<p>Block No.: " + resultObj.blockNumber + "</p>"
          + "<p>Timestamp: " + resultObj.mineTime + "</p>"
        );
      } else {
        $("#responseText").html("<p>File fingerprint not found on Ethereum blockchain.</p>"
          + "<p>File Hash Value: " + hash + "</p>"
        );
      }
    });
  });
};