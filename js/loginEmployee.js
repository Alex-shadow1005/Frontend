const out = function (str){
    console.log(str);
}

document.addEventListener('DOMContentLoaded', createFormEventListener);

let employeeLoginForm;

function createFormEventListener(){
    employeeLoginForm = document.getElementById("newLoginForm");
    employeeLoginForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    out("hej1");
    const form = event.currentTarget;
    const url = form.action;
    out(form);
    out(url);
    try {
        const formData = new FormData(form);
        out(formData);
        const responseData = await postFormDataAsJson(url, formData);
        out(responseData);

    } catch (err) {
        alert(err.message);
        out(err);
    }
}

async function postFormDataAsJson(url, formData) {
    out(formData.entries());
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: formDataJsonString
    };

    const response = await fetch(url, fetchOptions);
    if (!response) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    if(response.status == "400"){
        alert("Forkert email eller password, prøv igen");
    }else{
        window.location.href = "index.html";
    }






}