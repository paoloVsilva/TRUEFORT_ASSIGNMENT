var app = (function(){

  const LOCALSTORAGE_KEY = "data";

  let _data = [],
    _this = Object,
    _searchInterval = undefined

  const _catalogListeners = () => {
    $("#addBtn").on("click", _addBtnClicked)
    $("#deleteBtn").on("click", _deleteBtnClicked)
    $("#editBtn").on("click", _editBtnClicked)
    $("#checkAll").on("change", _checkAllChanged)
    $("#searchTxt").on("input", _searchTxtInputted)
  }
  
  const _displayData = () => {
    const template = Handlebars.compile(dataTemplate),
      $dataList = $("#dataList")

    $dataList.empty()
    _data.forEach((data) => {
      const domData = template(data),
        $domData = $(domData)
      $domData.find("input[type=checkbox]").on("change", _checkboxChanged)
      $dataList.append($domData)
    })
  }

  const _processJSON = () => {
    if(localStorage.getItem("applicationInitiated")){
      _data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY, []))
      _displayData()
    } else{
      localStorage.setItem("applicationInitiated", true);
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(initialData));
      _processJSON()
    }
  }

  const _addBtnClicked = (evt) => {
    (new _this.addDialog()).show()
  }

  const _deleteBtnClicked = (evt) => {
    let elements = [], dom = []
    $("#dataList").find("input[type=checkbox]:checked").each(function(){
      const $tr = $(this).parents("tr").first()
      elements.push($tr.index())
      dom.push($tr)
    })

    const dialogOption = {
      title: "Confirmation to delete data",
      message: `Are you sure you want to delete ${elements.length} data?`,
      buttons:{ Yes: _deleteData.bind(null, elements, dom) } 
    }
    app.util.confirmDialog(dialogOption);
  }

  const _deleteData = function(elements, doms) {
    for(const i in elements){
      _data[elements[i]] = {}
      doms[i].remove()
    }
    _data = _data.filter(element => {
      if(Object.keys(element).length === 0){
        return false
      }
      return true
    })
    _saveDataToLocalStorage()
    $("#editBtn").attr("disabled",true)
    $("#deleteBtn").attr("disabled",true)
    $(".dialog").dialog("close")
  }

  const _editBtnClicked = (evt) => {
    $("#dataList").find("input[type=checkbox]:checked").each(function(){
      const index = $(this).parents("tr").first().index(),
        data = _data[index];
      data["INDEX"] = index;
      (new _this.addDialog()).show(_data[index]);
    })
  }

  const _checkboxChanged = (evt) => {
    const totalCheckbox = $("#dataList").find("input[type=checkbox]").length,
      totalChecked = $("#dataList").find("input[type=checkbox]:checked").length

    if(totalChecked < totalCheckbox){
      $("#checkAll").prop("checked", false);
    } else {
      $("#checkAll").prop("checked", true);
    }

    if(totalChecked){
      $("#editBtn").removeAttr("disabled")
      $("#deleteBtn").removeAttr("disabled")
    } else {
      $("#editBtn").attr("disabled",true)
      $("#deleteBtn").attr("disabled",true)
    }
  }

  const _checkAllChanged = () => {

    if($("#checkAll").is(":checked")){
      $("#dataList").find("input[type=checkbox]").prop("checked", true)
      $("#editBtn").removeAttr("disabled")
      $("#deleteBtn").removeAttr("disabled")
    } else {
      $("#dataList").find("input[type=checkbox]").prop("checked", false)
      $("#editBtn").attr("disabled",true)
      $("#deleteBtn").attr("disabled",true)
    }
  }

  const _searchTxtInputted = () => {
    if(_searchInterval){
      clearTimeout(_searchInterval)
    }
    _searchInterval =  setTimeout(_startSearch, 1000);
  }

  const _startSearch = () => {
    const searchText = $("#searchTxt").val();
    _searchInterval = undefined
    
    $("#dataList").find(`marked`).each(function(){
      let text = $(this).parent().html()
      text = text.replaceAll("<marked>", "")
      text = text.replaceAll("</marked>", "")
      $(this).parent().html(text)
    })

    if(searchText  !== ""){
      $("#dataList").children().hide();

      $("#dataList").find(`td:contains(${searchText})`).each(function(){
        let text = $(this).html()
        text = text.replaceAll(searchText, `<marked>${searchText}</marked>`)
        $(this).html(text)
        $(this).parents("tr").first().show()
      });
    } else {
      $("#dataList").children().show();
    }
  }

  const _saveDataToLocalStorage = () => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(_data))
  }

  const init = function() {
    _this = this;
    _processJSON()
    _catalogListeners()
  }

  const appendNewData = (data) => {
    const template = Handlebars.compile(dataTemplate),
    $dataList = $("#dataList")
    data["CREATED_ON"] = (new Date()).toString()
    const domData = template(data),
      $dom = $(domData)
    $dom.find("input[type=checkbox]").on("change", _checkboxChanged)
    $dataList.append($dom)
    _data = _data.concat(data)
    _saveDataToLocalStorage()
  }

  const updateData = (data, index) => {
    const template = Handlebars.compile(dataTemplate),
      $dataList = $("#dataList"),
      $oldDom = $dataList.children().eq(index)
    
    delete data?.INDEX;
    const domData = template(data),
      $dom = $(domData)
    $dom.find("input[type=checkbox]").on("change", _checkboxChanged)
    $oldDom.replaceWith($dom)
    _data[index] = data
    _saveDataToLocalStorage()
  }

  return {
    init,
    appendNewData,
    updateData
  }
})()

$(document).on("ready",() => { 
  app.init()
})
