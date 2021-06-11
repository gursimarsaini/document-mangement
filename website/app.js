$(document).ready(function() {
    initialize();
  });
  
  function generatedHash(callback) {
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
        callback(null, hash);
      };
      fr.readAsArrayBuffer(file);
    }
  };
  
  function addTranscript () {
    generatedHash(function (err, hash) {
        findTranscriptHash(hash, function(err, resultOp){
            if (resultOp.blockNum != 0) {
                $("#responseText").html("<p>File fingerprint found on Ethereum blockchain.</p>"
                  + "<p>File Hash Value: " + hash + "</p>"
                  + "<p>Block No.: " + resultOp.blockNum + "</p>"
                  + "<p>Adding Time: " + resultOp.timestamp + "</p>"
                );   
            }else{
                generatedHash(function (err, hash) {
                    sendTranscriptHash(hash, function(err, tx) {
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
  };
  
  function findTranscript () {
    generatedHash(function (err, hash) {
        findTranscriptHash(hash, function(err, resultOp) {
        if (resultOp.blockNum != 0) {
          $("#responseText").html("<p>File fingerprint found on blockchain.</p>"
            + "<p>File Hash Value: " + hash + "</p>"
            + "<p>Block No.: " + resultOp.blockNum + "</p>"
            + "<p>Time added: " + resultOp.timestamp + "</p>"
          );
        } else {
          $("#responseText").html("<p>File fingerprint not found on Ethereum blockchain.</p>"
            + "<p>File Hash Value: " + hash + "</p>"
          );
        }
      });
    });
  };