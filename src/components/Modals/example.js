export const CertificationModal = () => {
  return (
    <div>
      <div class="modal fade" id="certificationModal" tabindex="-1" role="dialog"  aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="example-Modal3">CREATE NEW BRANCH</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
									<div class="form-group">
										<label for="recipient-name" class="form-control-label">Branch Name</label>
										<input   type="text" class="form-control" id="recipient-name"/>
									</div> 

									<div class="form-group">
										<label for="recipient-name" class="form-control-label">Address</label>
										<input  type="text" class="form-control" id="recipient-name"/>
									</div>


                    <label for="recipient-name" class="form-control-label">Region</label>
                      <select     class="form-control sel" id="exampleFormControlSelect1">
                          
                      <option value="">Select Region</option>
                      <option value="North Central">North Central</option>
                      <option value="North East">North East</option>
                      <option value="North West">North West</option>
                      <option value="South East">South East</option>
                      <option value="South West">South West</option>
                      <option value="South South">South South</option>
                </select>
 
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
								<button  type="button" class="btn btn-primary" >Create Now</button>
							</div>
						</div>
					</div>
				</div>

    </div>
  )
}