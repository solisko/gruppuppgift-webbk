async function fetchAllPosts() {
    try {
        const response = await fetch(' https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();

        let postListHTML = "";
        for (let post of posts) {
            let postDate = new Date(post.date)
            let showContent = post.content.slice(0, 100);

            postListHTML += `
            <li id="list-item">
            <h2>${post.title}</h2> <br>
            <p>${post.author} <span class="date"> / ${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()} ${postDate.toLocaleTimeString()}</span></p><br>
            <p>Tags: ${post.tags}</p> <br>
            <p>${showContent} <a href="readmore.html?id=${post.id}">read more...</a> </p>
            </li>
            <hr>
            `
        }

        document.getElementById('post-list').innerHTML = postListHTML;
    } catch(error) {
        console.log(error)
    }
}

fetchAllPosts();