let inputTask = document.querySelector("#taskInput");
let addBtn = document.querySelector(".addBtn");
let todoContainer = document.querySelector(".todoContainer");

let API = "https://688e6352a459d5566b14cff6.mockapi.io/api/v1/todos";

addBtn.addEventListener("click", postData);
fetchData();
async function fetchData() {
  let response = await fetch(API);
  let data = await response.json();

  if (data) {
    todoContainer.innerHTML = "";
  }

  data.forEach((obj) => {
    let div = document.createElement("div");
    div.className = "todo";
    div.innerHTML = `
           <p id="para">
            ${obj.text}
          </p>
          <input
            type="text"
            name="text"
            value="${obj.text}"
            id="taskInput"
            style = "display:none";
          />
          <div class="btns">
            <button type="button" class="editBtn">EDIT</button>
            <button type="button" class="saveBtn">SAVE</button>
            <button type="button" class="deleteBtn">DELETE</button>
          </div>
  `;
    todoContainer.append(div);
    let deleteBtn = div.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", function () {
      // console.log("clicked");
      deleteData(obj.id);
    });
    let saveBtn = div.querySelector(".saveBtn");
    let editBtn = div.querySelector(".editBtn");
    let text = div.querySelector("#taskInput");
    let para = div.querySelector("#para");
    editBtn.addEventListener("click", function () {
      // console.log("clicked");

      editBtn.style.display = "none";
      saveBtn.style.display = "block";
      text.style.display = "block";
      para.style.display = "none";

      // console.log(obj.id);
    });
    saveBtn.addEventListener("click", async function () {
      // console.log("clicked");
      let editText = text.value;
      let response = await updateData(obj.id, editText);
      if (response.status === 200) {
        await fetchData();
        editBtn.style.display = "block";
        saveBtn.style.display = "none";
        text.style.display = "none";
        para.style.display = "block";
      }
      // console.log(obj.id);
    });
  });
}
// fetchData();

async function postData() {
  let value = inputTask.value;
  let obj = {
    text: value.trim(),
  };
  // console.log(value);
  let response = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  // console.log(response);
  if (response.status === 201) {
    fetchData();
    inputTask.value = "";
  }
}
async function updateData(id, value) {
  console.log(id, value);
  let obj = {
    text: value.trim(),
  };

  console.log(value);
  let response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  // console.log(response);
  // if (response.status === 200) {
  //   fetchData();
  // }
  return response;
}

async function deleteData(id) {
  let response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    fetchData();
  }
}
