const supabaseURL = 'https://qqgjdalywbvibvvgwvkf.supabase.co';
const supabaseKey = 'sb_publishable_9RlJxkVD9-n85tF-MOVxwg_gvtMxtRv';
const client = supabase.createClient(supabaseURL,supabaseKey);

let book = document.getElementById("book");
if(book){
    book.addEventListener("click", ()=>{
        // ================= REAL-TIME AUTH LISTENER =================
client.auth.onAuthStateChange((event, session) => {
    if (!session) {
        alert('Sign up For Booking Appoinment');
    }else{
        window.location.href = 'form.html'
    }
    });
})
}