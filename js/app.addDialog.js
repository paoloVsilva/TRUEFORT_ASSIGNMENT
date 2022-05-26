
app.addDialog = function(){

  const _parent = app;
  let _thisDialog = Object,
    _data;

  const _catalogTemplate = () => {
    const $dialog = $(addEditDialogTemplate);

    $dialog.appendTo("dialog");

    $dialog.dialog({
      autoOpen: true,
      modal: true,
      title: _data ? "Edit Entry" : "Add Entry",
      maxWidth: $(window).width() * 0.8,
      minWidth: 300,
      position: {
        my: "center",
        at: "center",
        of: "body",
      },
      close: function(event, ui) {
        $(this).remove();
      }
    })

    $dialog.dialog({width: $(window).width() * 0.8})
    $dialog.dialog("open")

    if(_data){
      $dialog.find(".addDialog-addBtn").first().html("<i class='fa fa-save'></i> Save");
    } else {
      $dialog.find(".addDialog-addBtn").first().html("<i class='fa fa-plus'></i> Add");
    }
    _thisDialog = $dialog;
  }

  const _catalogListeners = () => {
    _thisDialog.find(".addDialog-addBtn").on("click", addBtnClicked)
    _thisDialog.find(".addDialog-resetBtn").on("click", resetBtnClicked)
  }

  const userIDValidator = (formData) => {
    const isValid = (formData.USER_ID !== "")
    _thisDialog.find("input[name=USER_ID]").removeClass("is-invalid")
    if(!isValid){
      _thisDialog.find("input[name=USER_ID]").addClass("is-invalid")
    }
    return isValid
  }

  const firstNameValidator = (formData) => {
    const isValid = (formData.USER_ID !== "")
    _thisDialog.find("input[name=FIRST_NAME]").removeClass("is-invalid")
    if(!isValid){
      _thisDialog.find("nput[name=FIRST_NAME]").addClass("is-invalid")
    }
    return isValid
  }

  const lastNameValidator = (formData) => {
    const isValid = (formData.USER_ID !== "")
    _thisDialog.find("input[name=LAST_NAME]").removeClass("is-invalid")
    if(!isValid){
      _thisDialog.find("input[name=LAST_NAME]").addClass("is-invalid")
    }
    return isValid
  }

  const emailValidator = (formData) => {
    const isValid = (formData.EMAIL !== "" && /^\S+@\S+$/.test(formData.EMAIL))
    _thisDialog.find("input[name=EMAIL]").removeClass("is-invalid")
    if(!isValid){
      _thisDialog.find("input[name=EMAIL]").addClass("is-invalid")
    }
    return isValid
  }
  const _serializeObject = (data) => {
    const obj = Object.create({}),
      dataArray = data.split("&")
    
      dataArray.forEach(element => {
        let [key, value] = element.split("=")
        value = value.replaceAll(/%40/g, "@")
        obj[key] = value
      })

    return obj
  }

  const _populateForm = (formData) => {
    for(const [key, value] of Object.entries(formData)){
      _thisDialog.find(`input[name=${key}]`).val(value)
    }
  }

  const addBtnClicked = (evt) => {
    const validators = [userIDValidator, firstNameValidator, 
      lastNameValidator, emailValidator]
    const rawFormData = _thisDialog.find(".addEditDialogForm").serialize(),
      objFormData = _serializeObject(rawFormData)
    let isValid = true

    for(const validator of validators){
      if(validator(objFormData)){
        continue;
      }
      isValid = false;
    }

    if(isValid){
      if(_data){
        _parent.updateData(objFormData, _data.INDEX)
      } else {
        _parent.appendNewData(objFormData)
      }
      _thisDialog.dialog("close")
    } else {
      app.util.messageDialog("One or more fields are invalid!", "Error")
    }
  }

  const resetBtnClicked = () => {
    if(_data){
      _populateForm(_data);
    } else {
      _thisDialog.find(".addEditDialogForm").trigger("reset")
    }
  }

  const show = (data) => { 
    _data = data; 
    _catalogTemplate()
    _catalogListeners()
    if(_data){
      _populateForm(_data);
    }
  };

  this.show = show
};