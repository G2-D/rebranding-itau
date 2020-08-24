import "../scss/app.scss";

feather.replace();

var renderContactList = async function () {
  var templateList = document.getElementById("contact_list_template").content;
  var contactList = document.getElementById("contact_list");
  var list = (await getContactList()) || [];

  console.log(list);
  list.results.forEach(function (item) {
    var template = templateList.cloneNode(true);

    template
      .querySelector("a")
      .setAttribute("title", item.name.first + " " + item.name.last);
    template.querySelector("img").setAttribute("src", item.picture.medium);

    contactList.appendChild(template);
  });
};

var getContactList = function () {
  return fetch("https://randomuser.me/api/?results=9").then(function (
    response
  ) {
    return response.json();
  });
};

var init = function () {
  renderContactList();
};

init();
