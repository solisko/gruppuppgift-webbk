console.log('Query string:',  location.search);
const urlParams = new URLSearchParams(location.search)
console.log(urlParams.get('id'))

fetchPost();

async function fetchPost() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'));
        const post = await response.json();
        
        document.getElementById('title').value = post.title;
        document.getElementById('content-textarea').value = post.content;
        document.getElementById('author').value = post.author;
        
        const tagsSelect = document.getElementById('tags');
        const postTags = post.tags.join(', ');

    for (let i = 0; i < tagsSelect.options.length; i++) {
        const optionValue = tagsSelect.options[i].value;
    
        if (postTags.includes(optionValue)) {
        tagsSelect.options[i].selected = true;
        }
    }

        console.log(post.tags)
    } catch(error) {
        console.log(error)
    }
}

document.getElementById('update-post-form').addEventListener('submit', updatePost);

async function updatePost(e) {
    e.preventDefault();
    const form = e.target;
    
    
    try {
        let formData = new FormData(form)

        let tags = [];
        for(const tag of formData.getAll('tags')) {
            tags.push(tag);
        }
        const data = {
            "title": formData.get("title"),
            "content": formData.get("content"),
            "author": formData.get("author"),
            "tags": tags.join(', ')
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


updatePost();