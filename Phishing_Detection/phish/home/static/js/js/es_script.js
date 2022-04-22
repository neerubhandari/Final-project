$(document).ready(function() {
	
	// Global variables
	$baseURL = 'http://list.youthforblood.org/';
	$ajaxURL = 'http://list.youthforblood.org/dashboard/ajax';
	$ajaxImgSrc = $('.spin_img').attr('src');

	$('#district').on('change', function() {
		$district = $(this).val();
		
	var bGroup = $.ajax({
					url: $ajaxURL,
					type: 'POST',
					//data: 'action=blood_group&district='+$district
					data : {
						action : 'blood_group',
						district : $district,
						}
				});
				
				$('#progress').html('<img src="'+$ajaxImgSrc+'"/>');
				
				bGroup.done(function(data) {
					$('#progress').html(' ');
					$('#select_group').html('');
					$defaultOption = '<option value="">Select Blood Group</option>';
					$defaultOption += '<option value="">All</option>';
					$('#select_group').html($defaultOption);
					$.each(data, function(index,value) {
						blood_group_select_option = '<option value="'+value.blood_group+'">'+value.blood_group+'</option>';
						$('#select_group').append(blood_group_select_option);
					});
				});
					
				bGroup.fail(function(jqXHR, textStatus) {
					$('#progress').html('<p class="text-danger">Error</p>');
				});
				
				// end ajax request 1 to get blood group on the basis of district

		}); // end on change function to get blood group and org list

		var lOrg = $.ajax({
					url: $ajaxURL,
					type: 'POST',
					//data: 'action=org&district='+$district
					data : {
						action : 'org'
						}
				});
				
				$('#progress').html('<img src="'+$ajaxImgSrc+'"/>');
				
				lOrg.done(function(data) {
					$('#progress').html(' ');
					$('#select_org').html('');
					$defaultOption = '<option value="">Select Organisation</option>';
					$defaultOption += '<option value="">All</option>';
					$('#select_org').html($defaultOption);
					$.each(data, function(index,value) {
						org_select_option = '<option value="'+value.name+'">'+value.name+'</option>';
						$('#select_org').append(org_select_option);
					});
				
				});
					
				lOrg.fail(function(jqXHR, textStatus) {
					$('#progress').html('<p class="text-danger">Error</p>');
				});
				
				// end ajax request 2 to get org on the basis of district
				

	$('#load_btn').click(function() {
		$district = $('#district').val();
		$blood_group = $('#select_group').val();
		$org = $('#select_org').val();
		$limit = $('#input_limit').val();


			var pageLoad = $.ajax({
					//url: $baseURL + 'dashboard/list_all_users',
					url: $ajaxURL,
					type: 'POST',
					data : {
						action : 'show_list',
						district : $district,
						blood_group : $blood_group,
						org : $org,
						limit : $limit
						},
					dataType : 'html'
					});
					
					$('#progress').html('<img src="'+$ajaxImgSrc+'"/>');
					
					pageLoad.done(function(data) {
						$('#progress').html(' ');

						$('#filter_district').html($district);
						$('#filter_blood_group').html($blood_group);
						$('#filter_org').html($org);

						$('#list_result').html(data);
	
					// Load the dataTables plugin
					$('#admin_table').dataTable(
							{
							"bJQueryUI": true
							//"sPaginationType": "full_numbers"
							}
						);
					});
					
					pageLoad.fail(function(jqXHR, textStatus) {
						$('#progress').html('<p class="text-danger">Error</p>');
					});

		}); // end click function to load the users table data

	
	// load the organisation list as soon as the document is ready 
	// $('.reg_page_district').on('change', function() {

			var loadRegOrg = $.ajax({
					url: $baseURL + 'dashboard/get_org_list',
					//url: $ajaxURL,
					type: 'POST',
					data : {
						action : 'org'
						}
					});
					
					//$('#progress').html('<img src="'+$ajaxImgSrc+'"/>');
					
					loadRegOrg.done(function(data) {
						//$('#progress').html(' ');
						$('.reg_page_org').html('');
						$defaultOption = '<option value="none">Select Organisation</option>';
						$defaultOption += '<option value="none">None</option>';
						$('.reg_page_org').html($defaultOption);
						$.each(data, function(index,value) {
							org_select_option = '<option value="'+value.name+'">'+value.name+'</option>';
							$('.reg_page_org').append(org_select_option);
						});
					
					});
					
					loadRegOrg.fail(function(jqXHR, textStatus) {
						//$('#progress').html('<p class="text-danger">Error</p>');
					});
		// }); // end change function to load the org list for registration page
	
	$('#search_btn').click(function() {
		
		$query = $('#search').val();

			var searchResults = $.ajax({
					url: $ajaxURL,
					type: 'POST',
					data : {
						action : 'search',
						query : $query
						},
					dataType : 'html'
					});
					
					$('#progress').html('<img src="'+$ajaxImgSrc+'"/>');
					
					searchResults.done(function(data) {
						$('#progress').html(' ');
						$('#filter_name').html($query);
						$('#list_result').html(data);

					// Load the dataTables plugin
					$('#admin_table').dataTable(
							{
							"bJQueryUI": true
							//"sPaginationType": "full_numbers"
							}
						);
					});
					
					searchResults.fail(function(jqXHR, textStatus) {
						$('#progress').html('<p class="text-danger">Error</p>');
					});
	});
	
	// enable or disable the submit button on registration page on 
	// the basis of terms agreement.
	$('#accept_terms').click(function() {
		var checked = $(this).prop('checked');
 		
		if (checked) {
			$('#register_btn' ).prop('disabled', false);
		} else {
			$('#register_btn' ).prop('disabled', true);
		}
	});
	
}); // end ready function