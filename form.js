const dbReq = indexedDB.open("MyDatabase", 1);

dbReq.onupgradeneeded = function (e) {

  const db = e.target.result;

  db.createObjectStore("Answers", { keyPath: "id", autoIncrement: true });

};

dbReq.onsuccess = function () {

  const db = dbReq.result;

  document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();
    const feelingAnswer = document.getElementById("feelingAnswer").value;
    const doAnswer = document.getElementById("doAnswer").value;
    const tx = db.transaction("Answers", "readwrite");
    tx.objectStore("Answers").add({ feelingAnswer, doAnswer });
    tx.oncomplete = () => {
      document.getElementById("save").innerText = "Saved!";
    };
  });
  
};