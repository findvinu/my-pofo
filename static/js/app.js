const form = document.querySelector("#contactForm");
let messagePara = document.querySelector('#resp')

function formHandler(e) {
  e.preventDefault();

  let data = {
    name: document.querySelector("input[name=name]").value,
    email: document.querySelector("input[name=email]").value,
    mobile: document.querySelector("input[name=mobile]").value,
    description: document.querySelector("#desc").value,
  };

  console.log(data);

  fetch("/contact", {
    method: "POST",
    headers: {
      "Contact-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
        messagePara.innerHTML = data.message;
        messagePara.style.backgroundColor= 'green';
        messagePara.style.padding='7px';
        messagePara.style.color= 'white';
     // console.log(data);
    })
    .catch((err) => {
        messagePara.innerHTML = data.message;
        messagePara.style.backgroundColor='red';
        messagePara.style.padding= '7px';
        messagePara.style.color= 'white';
     // console.log("Error", err);
    });
}

form.addEventListener("submit", formHandler);
