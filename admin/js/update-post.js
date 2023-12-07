console.log('Query string:',  location.search);
const urlParams = new URLSearchParams(location.search)
console.log(urlParams.get('id'))

fetchPost();

async function fetchPost() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'));
        const post = await response.json();
        console.log(post);

        document.getElementById('title').value = post.title;
        document.getElementById('content-textarea').value = post.content;
        document.getElementById('author').value = post.author;
        document.getElementById('tags').value = post.tags;
    } catch(error) {
        console.log(error)
    }  
}

document.getElementById('update-post-form').addEventListener('submit', updatePost);

async function updatePost(e) {
    e.preventDefault();
    const form = e.target;

    try {
        const formData = new FormData(form)
        const data = {
            "title": formData.get("title"),
            "content": formData.get("content"),
            "author": formData.get("author"),
            "tags": formData.get("tags"),
        };

        await fetch('https://blog-api-assignment.up.railway.app/posts/'+ urlParams.get('id'), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
            
            location.replace('index.html');
        } catch(error) {
            console.log(error);
        } 
    }