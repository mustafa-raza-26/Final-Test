let card = document.getElementById('card')
let cancelBtn = document.querySelectorAll('.cancel')

async function fetchAppointments() {

  const { data: { user } } = await client.auth.getUser();

  if (!user) {
    console.log('Login required');
    return;
  }

  const { data, error } = await client
    .from('appoinmentForm')
    .select('*')

  if (error) {
    console.log('Error:', error.message);
  } else {
    console.log('User appointments:', data);
  }

  for (let i = 0; i < data.length; i++) {
    card.innerHTML += `
    <div class="card col-10 col-md-3 p-3" >
        <span class="d-flex"><h5>Patient Name: </h5> <h5> ${data[i].name}</h5></span>
        <span class="d-flex"><h5>Doctor Name: </h5><h5> ${data[i].doctor}</h5></span>
        <span class="d-flex"><h5>Date & Time: </h5><h5> ${data[i].date}</h5></span>
        <span class="d-flex"><h5>Reason: </h5><h5> ${data[i].reason}</h5></span>
        <button class="col-8 col-md-6 cancel">Cancel</button>
    </div>
    `
  }
}
fetchAppointments();

if (cancelBtn) {
    cancelBtn.addEventListener('click', async () => {   
        const { data, error } = await client
        .from('appoinmentForm')
        .delete()
        .eq('name', 'doctor', 'date', 'reason');

        if (error) {
            console.log('Delete error:', error.message);
        } else {
            console.log('Deleted:', data);
        }
});

}