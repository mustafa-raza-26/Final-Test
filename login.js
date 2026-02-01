// let emailValue = document.getElementById('email');
// let passwordValue = document.getElementById('password');
// let eye = document.getElementById('eye');
// let loginBtn = document.getElementById('logBtn');
// let loginbut = document.getElementById('login')
// let logoutBtn = document.getElementById('log');

// if (eye) {
//     eye.addEventListener('click', () =>{
//         if (passwordValue.type === "password") {
//             passwordValue.type = 'text'
//         }else{
//             passwordValue.type = 'password'
//         }
//     })
// }    

// // ================= CHECK AUTH =================
// async function checkAuth() {
//   const { data: { session } } = await client.auth.getSession();

//   if (!loginbut || !logoutBtn) return;

//   if (session) {
//     loginbut.style.display = "none";
//     logoutBtn.style.display = "inline-block";
//   } else {
//     loginbut.style.display = "inline-block";
//     logoutBtn.style.display = "none";
//   }
// }

// checkAuth();

// // ================= LOGIN =================
// if (loginBtn) {
//   loginBtn.addEventListener('click', async () => {

//     if (emailValue.value === "" || passwordValue.value === "") {
//       alert("Email aur Password required hai");
//       return;
//     }

//     const { error } = await client.auth.signInWithPassword({
//       email: emailValue.value,
//       password: passwordValue.value
//     });

//     if (error) {
//       alert(error.message);
//     } else {
//       window.location.href = "/index.html"; // dashboard ya home
//     }
//   });
// }

// // ================= LOGOUT =================
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', async () => {
//     await client.auth.signOut();
//     window.location.reload();
//   });
// }

// // ================= REAL-TIME LISTENER =================
// client.auth.onAuthStateChange((event, session) => {
//   if (!loginBtn || !logoutBtn) return;

//   if (session) {
//     loginbut.style.display = "none";
//     logoutBtn.style.display = "inline-block";
//   } else {
//     loginbut.style.display = "inline-block";
//     logoutBtn.style.display = "none";
//   }
// });

// ================= DOM =================
const emailValue = document.getElementById('email');
const passwordValue = document.getElementById('password');
const eye = document.getElementById('eye');

// const loginBtn = document.getElementById('logBtn'); // form login
// const loginbut = document.getElementById('login'); // navbar login
// const logoutBtn = document.getElementById('log');   // navbar logout

// // ================= PASSWORD TOGGLE =================
// if (eye && passwordValue) {
//   eye.addEventListener('click', () => {
//     passwordValue.type =
//       passwordValue.type === "password" ? "text" : "password";
//   });
// }

// // ================= CHECK AUTH (PAGE LOAD) =================
// async function checkAuth() {
//   const { data: { session } } = await client.auth.getSession();

//   if (!loginbut && !logoutBtn) return;

//   if (session) {
//     if (loginbut) loginbut.style.display = "none";
//     if (logoutBtn) logoutBtn.style.display = "inline-block";
//   } else {
//     if (loginbut) loginbut.style.display = "inline-block";
//     if (logoutBtn) logoutBtn.style.display = "none";
//   }
// }

// checkAuth();

// // ================= LOGIN =================
// if (loginBtn) {
//   loginBtn.addEventListener('click', async () => {

//     if (!emailValue.value || !passwordValue.value) {
//       alert("Email aur Password required hai");
//       return;
//     }

//     const { error } = await client.auth.signInWithPassword({
//       email: emailValue.value,
//       password: passwordValue.value
//     });

//     if (error) {
//       alert(error.message);
//     } else {
//       window.location.href = "/index.html";
//     }
//   });
// }

// // ================= LOGOUT =================
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', async () => {
//     await client.auth.signOut();
//     window.location.href = "/login.html";
//   });
// }

// // ================= REAL-TIME LISTENER =================
// client.auth.onAuthStateChange((event, session) => {
//   if (!loginbut && !logoutBtn) return;

//   if (session) {
//     if (loginbut) loginbut.style.display = "none";
//     if (logoutBtn) logoutBtn.style.display = "inline-block";
//   } else {
//     if (loginbut) loginbut.style.display = "inline-block";
//     if (logoutBtn) logoutBtn.style.display = "none";
//   }
// });

// ================= DOM =================
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("log");
const appointmentList = document.getElementById("appointments");

// ================= CHECK SESSION =================
async function checkAuth() {
  const { data: { session } } = await client.auth.getSession();

  if (session) {
    // login hai
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";

    // appointments load karo
    loadAppointments(session.user.id);

  } else {
    // login nahi
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";

    // appointments clear
    if (appointmentList) appointmentList.innerHTML = "";
  }
}

checkAuth();

// ================= LOAD APPOINTMENTS =================
async function loadAppointments(userId) {
  if (!appointmentList) return;

  const { data, error } = await client
    .from("appointments")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.log(error.message);
    return;
  }

  appointmentList.innerHTML = "";

  if (data.length === 0) {
    appointmentList.innerHTML = "<p>No appointments found</p>";
    return;
  }

  data.forEach(app => {
    appointmentList.innerHTML += `
      <div class="card mb-2">
        <div class="card-body">
          <h5>${app.doctor_name}</h5>
          <p>${app.date} | ${app.time}</p>
        </div>
      </div>
    `;
  });
}

// ================= LOGOUT =================
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await client.auth.signOut();
    window.location.href = "/login.html";
  });
}

// ================= REAL TIME LISTENER =================
client.auth.onAuthStateChange((event, session) => {
  if (!session) {
    if (appointmentList) appointmentList.innerHTML = "";
  }
});
