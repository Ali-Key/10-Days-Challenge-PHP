// Ensure the DOM is fully loaded before running the script
$(document).ready(function () {
  // Load the data initially
  loadData();

  btnAction = "Insert"; // Set the default action to insert

  // Show the modal when clicking on 'addModal' button
  $("#addModal").click(function () {
    $("#studentFormModal").modal("show");
  });

  // Form submission event
  $("#studentForm").submit(function (event) {
    event.preventDefault();

    // Get the form data
    let form_data = new FormData($(this)[0]); // Use $(this) to refer to the form

    if (btnAction == "Insert") {
      form_data.append("action", "registerStudent");
    } else {
      form_data.append("action", "updateStudent");
    }

    // AJAX request
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "api.php",
      data: form_data,
      processData: false,
      contentType: false,
      success: function (data) {
        let response = data.data;

        $("#studentForm")[0].reset();

        alert(response);

        btnAction = "Insert";

        $("#studentFormModal").modal("hide"); // Hide the modal after successful form submission
        loadData(); // Reload the data to reflect changes
      },
      error: function (data) {
        console.log("AJAX Error: ", data);
      },
    });
  });

  // Load data function
  function loadData() {
    $("#studentTable tbody").html("");
    let sendData = {
      action: "readAll",
    };

    $.ajax({
      method: "POST",
      dataType: "json",
      url: "api.php",
      data: sendData,
      success: function (data) {
        let response = data.data;

        let tr = "";

        if (data.status) {
          response.forEach((item) => {
            tr += "<tr>";
            for (let i in item) {
              tr += `<td>${item[i]}</td>`;
            }
            tr += `
              <td>
                <a class="btn btn-primary updateInfo" data-id="${item.id}">
                  <i class="fa fa-edit"></i> Update
                </a>
                <a class="btn btn-danger deleteInfo" data-id="${item.id}">
                  <i class="fa fa-trash"></i> Delete
                </a>
              </td>`;
            tr += "</tr>";
          });
          $("#studentTable tbody").html(tr); // Replace content instead of appending to avoid duplication
        }
      },
      error: function (data) {
        console.log("Error loading data: ", data);
      },
    });
  }

  // Fetch info function
  function fetchInfo(id) {
    let sendData = {
      action: "readStudentInfo",
      id: id,
    };

    $.ajax({
      method: "POST",
      dataType: "json",
      url: "api.php",
      data: sendData,
      success: function (data) {
        let response = data.data;

        if (data.status) {
          $("#id").val(response[0].id);
          $("#name").val(response[0].name);
          $("#class").val(response[0].class);

          $("#studentFormModal").modal("show"); // Correct modal ID and method

          btnAction = "Update"; // Set the action
        }
      },
      error: function (data) {
        console.log("error", data);
      },
    });
  }

  // Delete info function
  function deleteInfo(id) {
    let sendData = {
      action: "deleteStudent",
      id: id,
    };

    $.ajax({
      method: "POST",
      dataType: "json",
      url: "api.php",
      data: sendData,
      success: function (data) {
        let response = data.data;

        if (data.status) {
          alert(response);
          loadData(); // Reload the data to reflect changes
        } else {
          alert("Error: " + response);
        }
      },
      error: function (data) {
        console.log("error", data);
      },
    });
  }

  // Handle the update info click event
  $("#studentTable").on("click", "a.updateInfo", function () {
    let id = $(this).data("id"); // Use data attribute instead of attr
    fetchInfo(id);
  });

  // Handle the delete info click event
  $("#studentTable").on("click", "a.deleteInfo", function () {
    let id = $(this).data("id"); // Use data attribute instead of attr

    if (confirm("Are you sure you want to delete this record?")) {
      deleteInfo(id);
    }
  });
});
