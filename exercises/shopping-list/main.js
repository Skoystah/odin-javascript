const addItemButton = document.getElementById("add-item-submit");

// DOM
addItemButton.addEventListener("click", addItem);

// FUNCTIONS
function addItem(event) {
    event.preventDefault();
    const itemContent = document.getElementById("item-name");
    if (!itemContent.value) {
        alert("Item name mandatory!");
        return
    }
    const item = document.createElement("li");
    const itemTitle = document.createElement("span");
    itemTitle.textContent = itemContent.value;
    item.appendChild(itemTitle);

    const itemDeleteButton = document.createElement("button");
    itemDeleteButton.textContent = "Delete";
    itemDeleteButton.addEventListener("click", deleteItem);
    item.appendChild(itemDeleteButton);

    const itemList = document.getElementById("item-list");
    itemList.appendChild(item);
    itemContent.value = "";
    itemContent.focus();
}
function deleteItem(event) {
    event.target.parentNode.remove();
}
