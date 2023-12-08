fetchAllPosts();

async function fetchAllPosts(){
    try{
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();

        let blogPosts = "";
        for (let post of posts){
            let postDate = new Date(post.date);
            
            blogPosts += `
            <tr>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${post.tags.join(', ')}</td>
                <td class="date-time">
                    ${postDate.getDate()}-${postDate.getMonth()+1}-${postDate.getFullYear()}<br>
                    ${postDate.toLocaleTimeString()}
                </td>                
                <td>
                    <a href="update-post.html?id=${post._id}">Update</a>
                    <a href="#" data-id="${post._id}" class="delete-links">Delete</a>
                </td>
            </tr>
            `
        }

        document.getElementById('table-body').innerHTML = blogPosts;

    }catch(error){
        console.log(`ERROR: ${error}`)
    }


    const deleteLinks = document.getElementsByClassName('delete-links');

    for (let link of deleteLinks){
        link.addEventListener('click', async function (e) {
            e.preventDefault();

            let postId = e.target.dataset.id;
            // console.log(postId);
            const response = await fetch (`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
                method: 'DELETE'
            });  

            if (response.ok) {
                e.target.parentNode.parentNode.remove(); 
            } 
            // else {
            //     throw new Error(`Can not remove post!`);
            // }
        })
    }

}