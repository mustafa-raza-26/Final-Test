async function ss() {
    const { data, error } = await client.auth.getSession()
    if (error) {
        console.log(error);
    }else{
        console.log(data);
    }
}
ss();
