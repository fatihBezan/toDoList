let experiences;
const addButton = document.querySelector("button#add");
const inputElement = document.querySelector(".list");
const ulElement = document.querySelector(".list-group");
const clearButton = document.querySelector("#clear");
const updateButton = document.querySelector("#update");
const deleteButton = document.querySelector("button#delete");
const updatedInput = document.querySelector(".updatedlist");




clearButton.addEventListener("click", () => {
    localStorage.clear();
    createList();
})

addButton.addEventListener("click", () => {
    let value = inputElement.value;
    if (localStorage.getItem("experiences") === null) {
        experiences = [];
    } else {
        experiences = JSON.parse(localStorage.getItem("experiences"));
    }
    if (experiences.includes(value)) {
        alert("Girilen Değer Daha Önce Tanımlanmış...")
    }
    else {
        experiences.push(value);
    }

    localStorage.setItem("experiences", JSON.stringify(experiences));
    inputElement.value = " ";
    inputElement.focus();
    createList();
})

const createList = () => {
    let newList = JSON.parse(localStorage.getItem("experiences"));
    ulElement.innerHTML = "";
    newList.forEach((element, index) => {
        const liElement = document.createElement("li");
        liElement.classList.add("list-group-item");
        liElement.innerHTML = element;
        liElement.addEventListener("click", () => {
            inputElement.value = liElement.textContent;


        })
        ulElement.prepend(liElement);

    });

}
createList();

deleteButton.addEventListener("click", () => {
    const newList = JSON.parse(localStorage.getItem("experiences"));
    newList.forEach((item, index) => {
        if (item === inputElement.value) {

            newList.splice(index, 1)
        }
    })
    localStorage.setItem("experiences", JSON.stringify(newList));
    inputElement.value = "";
    inputElement.focus();
    createList();

});


updateButton.addEventListener("click", () => {
    const newList = JSON.parse(localStorage.getItem("experiences"));
    const oldValue = inputElement.value;
    let newValue = updatedInput.value;
    newList.forEach((item, index) => {

        if (item === oldValue) {

            newList[index] = newValue;

        }


    })
    localStorage.setItem("experiences", JSON.stringify(newList));
    alert(" liste başarıyla güncellendi!");
})

