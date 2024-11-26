var sitnameinput = document.getElementById("Bookmark");
var siturlinput = document.getElementById("Site");
var prodlist = [];

if (localStorage.getItem("prodlist") != null) {
  prodlist = JSON.parse(localStorage.getItem("prodlist")) || [];
  display_data();
}

function addprod() {
  var sitename = sitnameinput.value.trim();
  var siteurl = siturlinput.value.trim();

  if (!validateInputs(sitename, siteurl)) {
    return;
  }

  var prod = {
    sitname: sitename,
    siturl: siteurl,
  };

  prodlist.push(prod);
  localStorage.setItem("prodlist", JSON.stringify(prodlist));

  clear();
  display_data();
}

function validateInputs(sitename, siteurl) {
  if (sitename === "") {
    alert("Site name cannot be empty!");
    return false;
  }

  if (siteurl === "") {
    alert("Site URL cannot be empty!");
    return false;
  }

  if (!isValidURL(siteurl)) {
    alert("Please enter a valid URL!");
    return false;
  }

  return true;
}

function isValidURL(url) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)" +
      "((([a-zA-Z0-9$-_@.&+!*\\(\\),]+\\.)+[a-zA-Z]{2,})" +
      "|((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%._+~#=]*)*" +
      "(\\?[;&a-zA-Z0-9%_+~#=]*)?" +
      "(\\#[-a-zA-Z0-9@:%._+~#=]*)?$",
    "i"
  );

  return pattern.test(url);
}

function clear() {
  sitnameinput.value = "";
  siturlinput.value = "";
}

function display_data() {
  var container = "";

  for (var i = 0; i < prodlist.length; i++) {
    container += `<tr>
                <td>${i + 1}</td>
                <td>${prodlist[i].sitname}</td>
                <td>
                  <a href="${
                    prodlist[i].siturl
                  }" target="_blank" rel="noopener noreferrer">
                    <button class="px-2 rounded-3 bot_vst border-0">
                      <span><i class="mx-1 fa-solid fa-eye"></i></span> Visit
                    </button>
                  </a>
                </td>
                <td>
                  <button onclick="deleteProd(${i});" class="px-2 rounded-3 bot_dlt border-0">
                    <span><i class="mx-1 fa-solid fa-trash-can"></i></span>Delete
                  </button>
                </td>
              </tr>`;
  }

  document.getElementById("tbody").innerHTML = container;
}

function deleteProd(index) {
  prodlist.splice(index, 1);

  localStorage.setItem("prodlist", JSON.stringify(prodlist));
  display_data();
}
