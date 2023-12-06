document.getElementById('create-post-form').addEventListener('submit', createPost);

async function createPost(e) {
    e.preventDefault();

    let form = e.target;
    
    try{
        let formData = new FormData(form)
        let data = {"content": formData.get('content')};

        await fetch (`https://blog-api-assignment.up.railway.app/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            });

            location.replace('index.html');


    }catch(error){
        console.log(`ERROR: ${error}`)
    }
}