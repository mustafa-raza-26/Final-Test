let user_name = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let number = document.getElementById('num');
let signupBtn = document.getElementById('signBtn');
let googleBtn = document.getElementById('googleBtn');
let fbBtn = document.getElementById('fbBtn');

// -------------------- SIGN UP --------------------
if (signupBtn) {
  signupBtn.addEventListener('click', async () => {

    if (user_name.value == "" || email.value == "" || password.value == "") {
      alert('Fill all fields before signup');
      return;
    }

    const { error1 } = await client
    .from('user')
    .insert({ 
      name: user_name.value,
      email: email.value,
      number: number.value
     })
     if (error1) {
      console.log('error', error1.message);
     }

    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        // emailRedirectTo: "https://mustafa-raza-26.github.io/Login-Signup_by_supabase/dashboard.html",
        emailRedirectTo: "http://127.0.0.1:5500/index.html",
        data: {
          displayName: user_name.value,
          number: number.value
        }
      }
    });

    if (error) {
      alert("Signup Error: " + error.message);
      console.error("Signup Error:", error.message);
    } else {
      alert('Your account is created.........');
      // window.location.href = "https://mustafa-raza-26.github.io/Login-Signup_by_supabase/dashboard.html";
      window.location.href = "http://127.0.0.1:5500/index.html"
    }

    // Reset fields
    user_name.value = "";
    email.value = "";
    password.value = "";
    number.value = "";

  });
}


// -------------------- GOOGLE LOGIN --------------------
if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://mustafa-raza-26.github.io/Login-Signup_by_supabase/dashboard.html"
      }
    });

    if (error) {
      console.error("Google Error:", error.message);
      alert("Google Login Error: " + error.message);
    }
  });
}


// -------------------- FACEBOOK LOGIN --------------------
if (fbBtn) {
  fbBtn.addEventListener('click', async () => {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "https://mustafa-raza-26.github.io/Login-Signup_by_supabase/dashboard.html"
      }
    });

    if (error) {
      console.error("Facebook Error:", error.message);
      window.location.href = 'https://mustafa-raza-26.github.io/Login-Signup_by_supabase/signup.html'
      return;
    }
  });
}