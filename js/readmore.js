console.log('Query string:',  location.search);
const urlParams = new URLSearchParams(location.search)

readPost();

async function readPost() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'));
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
            // throw new Error('Something when wrong');
        }
        
        const post = await response.json();
        
        document.getElementById('post-content').innerHTML = `
        <h1>${post.title}</h1>
        <i>${post.author} / ${new Date(post.date).toLocaleString()}</i>
        <p>${post.content}</p>
        <b>Tags:</b> <span> ${post.tags.join(', ')}</span>
        `

    } catch(error) {
        console.log(`ERROR: ${error}`)
    }  
}