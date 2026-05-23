const supabaseURL = 'https://escflpzgeayghspqdkcr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzY2ZscHpnZWF5Z2hzcHFka2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTI3MDUsImV4cCI6MjA5NDMyODcwNX0.Uw7p0b9KtNSxX-vf3_pJQ0ZmstXJbYtZR98x0RzNDKk';
const client = supabase.createClient(supabaseURL,supabaseKey);
console.log(client);

let book = document.getElementById("book");
if(book){
    book.addEventListener("click", ()=>{

    client.auth.onAuthStateChange((event, session) => {
    if (!session) {
        alert('Sign up For Booking Appoinment');
    }else{
        window.location.href = 'https://mustafa-raza-26.github.io/Final-Test/form.html'
    }
    });
})
}