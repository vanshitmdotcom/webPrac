let itemsArray = JSON.parse(localStorage.getItem("todos"))||[];

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  const addTodo = document.querySelector("#submit");
  const listTodos = document.querySelector("#todoElements");
  const input = document.querySelector("#todo");

  renderTodo(listTodos);

  addTodo.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(input.value);
    saveTodo(input.value);
    renderTodo(listTodos);
  });
});

function saveTodo(item) {
  const obj = {
    id: Date.now(),
    completed: false,
    value: item,
  };
  itemsArray.push(obj);
  localStorage.setItem("todos",JSON.stringify(itemsArray));
}

function renderTodo(listTodos) {
//   console.log(listTodos);
  listTodos.innerHTML = "";
  itemsArray.forEach((item) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center px-2 py-1 bg-gray-100 rounded w-full";
    li.textContent = item.value;

    const button = document.createElement("button");
    button.textContent = "Delete";
    button.className = "bg-red-700 text-white p-1 rounded";

    button.addEventListener("click",(e)=>{
        e.stopPropagation();
        console.log(`Delte Clicked for ${item.id}`);
        li.classList.add("opacity-0", "transition-opacity", "duration-500");

        // Wait for animation to finish (~500ms)
        setTimeout(() => {
          removeTodo(item.id); // Remove from data & localStorage
          renderTodo(listTodos); // Re-render list
        }, 500); 
    })

    li.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("li clicked");
      li.classList.add("line-through");
    //   renderTodo(listTodos);
    });

    li.appendChild(button);
    listTodos.appendChild(li);
  });
}

function removeTodo(id) {
  itemsArray=itemsArray.filter((todo) => todo.id !== id);
  localStorage.setItem("todos",JSON.stringify(itemsArray));
}
