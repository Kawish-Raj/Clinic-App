import {supabase} from "./components/supabase";

const login_form = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

login_form.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log("email: " + email.value);
    console.log("password: " + password.value);

    signIn(email.value, password.value);
});

async function signIn(email, password) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert(error.message);
    } else {
        // email.value = "";
        // password.value = "";
        window.location.href = "/dashboard.html";
    }
}

