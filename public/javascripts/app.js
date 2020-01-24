//  Jquery Ajax Helper for PUT and DELETE method
//
jQuery.each(["put", "delete"], function(i, method) {
  jQuery[method] = function(url, data, callback, type) {
    if (jQuery.isFunction(data)) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});

//  Potion Social Jquery code
//  for handling async tasks
//
(function($) {
  // Textarea of status form
  var statusTextarea = $("#message");
  // Send button of status form
  var statusSend = $("#message_send");
  // Stream container
  var stream = $("#stream");
  // Dropdown of users in navbar
  var userDropdown = $("#user_dropdown");
  // Dropdown button of users in navbar
  var userDropdownButton = userDropdown.find(".btn");
  // Dropdown menu of users in navbar
  var userDropdownMenu = userDropdown.find(".dropdown-menu");
  // Users returned from potion API
  var availableUsers = [];
  // Current user form status form
  var currentUserID = null;

  activate();

  function activate() {
    // Watch input for status form textarea
    statusTextarea.on("input", handleStatusTextarea);
    // Click binding for send behaviour for status form
    statusSend.on("click", handleStatusSend);
    // Click binding for select currentUserID
    $(document).on("click", ".user-selector", handleUserSelect);
    // Click binding for status delete
    $(document).on("click", ".status-delete", handleStatusDelete);
    // Click binding for status delete
    $(document).on("click", ".status-like", handleStatusLike);
    // Retrieve users
    getUsers();
  }

  //  Like/Unlike a status
  //
  function handleStatusLike(e) {
    e.preventDefault();
    var $this = $(this);
    var statusID = $this.attr("data-id");
    var statusLiked = $this.attr("data-liked");
    if (statusID) {
      if (statusLiked === "true") {
        $.put(
          "/statuses/" + statusID + "/unlike?user_id=" + currentUserID,
          function(response) {
            $this.attr("data-liked", "false");
            $this.removeClass("text-danger").addClass("text-secondary");
            $this
              .children()
              .first()
              .removeClass("fa-heart")
              .addClass("fa-heart-o");
          }
        );
      } else {
        $.put(
          "/statuses/" + statusID + "/like?user_id=" + currentUserID,
          function(response) {
            $this.attr("data-liked", "true");
            $this.removeClass("text-secondary").addClass("text-danger");
            $this
              .children()
              .first()
              .removeClass("fa-heart-o")
              .addClass("fa-heart");
          }
        );
      }
    }
  }

  //  Delete a status
  //
  function handleStatusDelete(e) {
    e.preventDefault();
    var statusID = $(this).attr("data-id");
    var statusDOM = $(".status-" + statusID);
    if (statusID) {
      $.delete("/statuses/" + statusID + "?user_id=" + currentUserID, function(
        response
      ) {
        statusDOM.fadeOut(300, function() {
          statusDOM.remove();
        });
      });
    }
  }

  //  Enable or Disable send button on status form
  //
  function handleStatusTextarea(e) {
    var value = e.target.value;
    if (value && value !== "") {
      statusSend.removeAttr("disabled");
    } else {
      statusSend.attr("disabled", "disabled");
    }
  }

  //  Send status and prepend data in stream
  //
  function handleStatusSend(e) {
    e.preventDefault();

    var value = statusTextarea.val();
    if (value && value !== "") {
      statusSend.toggleClass("is-loading");
      statusTextarea.val("");

      $.post(
        "/statuses",
        {
          message: value,
          user_id: currentUserID,
          owner_type: "User",
          owner_id: currentUserID
        },
        function(response) {
          statusSend.toggleClass("is-loading");
          stream.prepend(response.data);
        }
      );
    }
  }

  //  Select a user from dropdown and set it as currentUserID
  //
  function handleUserSelect() {
    var userID = $(this).attr("data-id");
    if (userID !== currentUserID) {
      var selectedUser = availableUsers.find(function(user) {
        return user.id === userID;
      });
      setUser(selectedUser);
      getStatuses();
    }
  }

  //  Set a user as current user
  //
  function setUser(user) {
    currentUserID = user.id;
    $(userDropdownMenu)
      .children()
      .each(function(key, item) {
        $(item).removeClass("text-primary");
      });

    $(userDropdownMenu)
      .find("[data-id='" + currentUserID + "']")
      .addClass("text-primary");
  }

  //  Get users and populate navbar dropdown
  //
  function getUsers() {
    userDropdownButton.toggleClass("is-loading");
    $.get("/users", function(response) {
      availableUsers = response.data.items;
      if (response.data.total_items === 0) {
      } else {
        $.each(response.data.items, function(key, user) {
          var $html =
            '<a class="dropdown-item user-selector" data-key="' +
            key +
            '" data-id="' +
            user.id +
            '" href="#">' +
            user.nickname +
            "</a>";
          userDropdownMenu.append($html);
        });
        setUser(response.data.items[0]);
        getStatuses();
      }
      userDropdownButton.toggleClass("is-loading");
    });
  }

  //  Get users and populate navbar dropdown
  //
  function getStatuses() {
    stream.html('<div class="loader"></div>');
    $.get("/statuses?for_user_id=" + currentUserID, function(response) {
      stream.html(response.data);
    });
  }
})(jQuery);
