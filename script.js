//相当于保存的输入用js 静态用html
window.onload = function () {
  const dateInput = document.getElementById("dateInput");

  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
    showEntries();
  }
};
//输入
function saveEntry() {
  const date = document.getElementById("dateInput").value;
  const link = document.getElementById("linkInput").value;
  const title = document.getElementById("titleInput").value;
  const image =document.getElementById("imageInput").value;
  const reply = document.getElementById("replyInput").value;

  if (!reply.trim()) {
    alert("还没有写回信。");
    return;
  }
//保存
  const entry = {
    date: date,
    link: link,
    title: title,
    image:image,
    reply: reply
  };

  let entries = JSON.parse(localStorage.getItem("xumoEntries")) || [];
  entries.unshift(entry);

  localStorage.setItem("xumoEntries", JSON.stringify(entries));

  document.getElementById("linkInput").value = "";
  document.getElementById("titleInput").value = "";
  document.getElementById("replyInput").value = "";

  showEntries();
}

function showEntries() {
  const entriesBox = document.getElementById("entries");
  if (!entriesBox) return;

  let entries = JSON.parse(localStorage.getItem("xumoEntries")) || [];

  entriesBox.innerHTML = "";
//显示
  entries.forEach(function (entry,index) {//每次输入自动编号
    const div = document.createElement("div");
    div.className = "entry";

    div.innerHTML = `
      <div class="entry-date">${entry.date}</div>
      <div class="entry-title">${entry.title || "未命名动态"}</div>
      <div class="entry-link">
        ${entry.link ? `<a href="${entry.link}" target="_blank">查看原微博</a>` : ""}
      <div class="entry-image">
        ${entry.image ? `<img class="weibo-image" src="${entry.image}">` : ""}
      <div class="entry-reply">${entry.reply}</div>
      <button class="delete-button" onclick="deleteEntry(${index})"> 删除这条回信
      </button>
      </div>
    `;//结尾符

    entriesBox.appendChild(div);
    
  });
}

function deleteEntry(index) {

  let entries =
    JSON.parse(
      localStorage.getItem("xumoEntries")
    ) || [];

  const confirmDelete =
    confirm("确定删除这条回信吗？");

  if (!confirmDelete) {
    return;
  }

  entries.splice(index, 1);

  localStorage.setItem(
    "xumoEntries",
    JSON.stringify(entries)
  );

  showEntries();
}

function waterPlant() {

  const today =
    new Date().toISOString().split("T")[0];

  const lastWatered =
    localStorage.getItem(
      "plantLastWatered"
    );

  if (today === lastWatered) {
    alert("今天已经浇过水了。");
    return;
  }

  localStorage.setItem(
    "plantLastWatered",
    today
  );

  alert("植物喝到水啦 🌱");
}