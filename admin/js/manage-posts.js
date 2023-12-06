
fetchAllPosts();


async function fetchAllPosts(){
    try{
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();

        let blogPosts = "";
        for (let post of posts){
            blogPosts += `
            <tr>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${post.tags}</td>
                <td>${post.date}</td>
                <td>
                    <a href="update-post.html">Update</a>
                    <a href="#">Delete</a>
                </td>
            </tr>
            `
        }

        document.getElementById('table-body').innerHTML = blogPosts;

    }catch(error){
        console.log(`ERROR: ${error}`)
    }
}