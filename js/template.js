var dataTemplate = 
  `<tr>
    <td class="col-sm-1"> <input type="checkbox"/></th>
    <td class="col-sm-1">{{USER_ID}}</td>
    <td class="col-sm-2">{{FIRST_NAME}}</td>
    <td class="col-sm-2">{{LAST_NAME}}</td>
    <td class="col-sm-2">{{EMAIL}}</td>
    <td class="col-sm-2">{{STATUS}}</td>
    <td class="col-sm-2">{{CREATED_ON}}</td>
  </tr>`,

  addEditDialogTemplate = 
  `<div class="addEditDialog dialog">
    <form class="addEditDialogForm">
    <div class="row">
      <fieldset class="mb-2 col-xl-4 col-md-6">
        <label class="form-label"> User ID</label>
        <input type="text" class="form-control form-control-sm" name="USER_ID" required/>
      </fieldset>

      <fieldset class="mb-2 col-xl-4 col-md-6">
        <label class="form-label"> First Name</label>
        <input type="text" class="form-control form-control-sm" name="FIRST_NAME" required/>
      </fieldset>

      <fieldset class="mb-2 col-xl-4 col-md-6">
        <label class="form-label"> Last Name</label>
        <input type="text" class="form-control form-control-sm" name="LAST_NAME" required/>
      </fieldset>

      <fieldset class="mb-2 col-xl-4 col-md-6">
        <label class="form-label"> Email</label>
        <input type="email" class="form-control form-control-sm" name="EMAIL" required/>
      </fieldset>

      <fieldset class="mb-2 col-xl-4 col-md-6">
        <label class="form-label"> Status</label>
        <select class="form-select form-select-sm" name="STATUS">
          <option>INITIATED</option>
          <option>REGISTERED</option>
        </select>
      </fieldset>

      <fieldset class="mb-2 col-xl-4 col-md-6">
        <label class="form-label"> Created On</label>
        <input class="form-control form-control-sm" name="CREATED_ON" readonly placeholder="System Generated"/>
      </fieldset>
    </div>
    <div class="text-end">
      <button class="btn btn-sm btn-info addDialog-addBtn" type="button"><i class="fa fa-plus"></i><text> Add</text></button>
      <button class="btn btn-sm btn-info addDialog-resetBtn" type="button"><i class="fa fa-refresh"></i><text> Reset</text></button>
    </div>
    </form>
  </div>`