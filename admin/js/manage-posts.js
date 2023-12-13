// hämtar alla posts och lägger in de i en table

fetchAllPosts();

async function fetchAllPosts(){
    try{
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();

        let blogPosts = "";
        for (let post of posts){
            let postDate = new Date(post.date);
            // eftersom alla posts inte är våra så la jag till att det står nedan ist för null om taggarna inte funkar
            let tags = post.tags ? post.tags : 'Update post to select tags.';
            
            blogPosts += `
            <tr>
                <td>${post.title}</td>
                <td class="author-td">${post.author}</td>
                <td>${tags}</td>
                <td class="date-time">
                    ${postDate.toLocaleDateString()}<br>
                    ${postDate.toLocaleTimeString()}
                </td>                
                <td class="links">
                    <a href="update-post.html?id=${post._id}">Update</a><br>
                    <hr>
                    <a href="#" data-id="${post._id}" class="delete-links">Delete</a>
                </td>
            </tr>
            `
        }

        document.getElementById('table-body').innerHTML = blogPosts;

    }catch(error){
        console.log(`ERROR: ${error}`)
    }

    // delete länken tar bort om response är OK
    const deleteLinks = document.getElementsByClassName('delete-links');

    for (let link of deleteLinks){
        link.addEventListener('click', async function (e) {
            e.preventDefault();

            let postId = e.target.dataset.id;

            const response = await fetch (`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
                method: 'DELETE'
            });  

            if (response.ok) {
                e.target.parentNode.parentNode.remove(); 
            } 
        })
    }

}