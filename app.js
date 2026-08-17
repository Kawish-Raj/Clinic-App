import { supabase } from "./components/supabase";

async function initLogin() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        window.location.href = "/dashboard.html";
        return;
    }
    document.body.style.display = "block";

    const login_form = document.querySelector("#login-form");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    login_form.addEventListener('submit', (event) => {
        event.preventDefault();

        console.log("email: " + email.value);
        console.log("password: " + password.value);

        signIn(email.value, password.value);
    });
}

initLogin();

async function signIn(email, password) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert(error.message);
    } else {
        window.location.href = "/dashboard.html";
    }
}

