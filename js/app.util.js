app.util = (function(){

  const messageDialog = function (message, title) {
    const dialogOption = {
      modal: true,
      title: title || "Message",
      autoOpen: true,
      width: 'auto',
      resizable: false,
      buttons: {
        OK: function() {
          $(this).dialog("close");
        }
      },
      close: function(event, ui) {
        $(this).remove();
      }
    };

    $('<div class="dialog"></div>').appendTo('body')
    .html('<div><h6>' + message + '</h6></div>')
    .dialog(dialogOption);
  }

  const confirmDialog = function (option) {
    const defaultOption = {
      modal: true,
      title: "Confirmation",
      autoOpen: true,
      width: 'auto',
      resizable: false,
      buttons: {
        Yes: function() {
          $(this).dialog("close");
        },
        No: function() {
          $(this).dialog("close");
        }
      },
      close: function(event, ui) {
        $(this).remove();
      }
    };
    const dialogOption = $.extend(true, {}, defaultOption, option);
    $('<div class="dialog"></div>').appendTo('body')
    .html('<div><h6>' + option.message + '</h6></div>')
    .dialog(dialogOption);
  }

  return {
    messageDialog,
    confirmDialog
  }
})()