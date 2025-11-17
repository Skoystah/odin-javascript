const container = document.querySelector('#container');

para = document.createElement("p");
para.textContent = "Hey, I'm red!";
para.style.color = "red";

container.appendChild(para)

h3 = document.createElement("h3");
h3.textContent = "I'm a blue h3!";
h3.style.color = "blue";

container.appendChild(h3);

div = document.createElement("div");

h1 = document.createElement("h1");
h1.textContent = "I'm in a div";

para = document.createElement("p");
para.textContent = "ME TOO!";

div.appendChild(h1);
div.appendChild(para);

div.style.border = "2px solid red";
container.appendChild(div);

div.addEventListener("click", (e) => {
    e.target.style.background = "red";
    alert(`Hello world! ${e.target}`);

});

