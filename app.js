import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qiabcdpgczndotliyyxm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_r_f_YsI0lqf0m8xr9uZO9Q_MweADSWC';

// Full VS Code autocomplete activates automatically on 'supabase'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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
        window.location.href = "pages/dashboard.html";
    }
}

