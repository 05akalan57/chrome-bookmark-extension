document.addEventListener("DOMContentLoaded", function () {
  var img = document.querySelector("img");
  var input = document.querySelector("input");
  var button = document.querySelector("button");
  var rawDate = new Date();
  var dd = String(rawDate.getDate()).padStart(2, "0");
  var mm = String(rawDate.getMonth() + 1).padStart(2, "0");
  var yyyy = rawDate.getFullYear();
  date = dd + "/" + mm + "/" + yyyy;
  chrome.tabs.captureVisibleTab(null, { quality: 0 }, function (image) {
    img.src = image;
  });
  chrome.tabs.getSelected(null, function (tab) {
    input.value = tab.url;
    button.addEventListener("click", function () {
      firebase.initializeApp({
        databaseURL: "https://akalan-db.firebaseio.com",
      });
      firebase
        .database()
        .ref("bookmarks/" + tab.title.replace(/[|/&;.$%@"<>()+,]/g, ""))
        .set({
          img: img.src,
          title: tab.title,
          url: tab.url,
          timestamp: date,
        });
      button.innerHTML = "Saved";
    });
  });
});
