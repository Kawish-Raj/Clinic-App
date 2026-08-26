import { supabase } from "./components/supabase";
import './index.css';

const login_form = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");


login_form.addEventListener('submit',(event)=>handleLoginFormSubmission(event));

async function initLogin() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        window.location.href = "/dashboard.html";
        return;
    }
    document.body.style.display = "block";
}

initLogin();

async function handleLoginFormSubmission(event){
    event.preventDefault();

        console.log("email: " + email.value);
        console.log("password: " + password.value);

        await signIn(email.value, password.value);
}


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

