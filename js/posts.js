async function fetchAllPosts() {
    try {
        const response = await fetch(' https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();

        let postListHTML = "";
        for (let post of posts) {
            let postDate = new Date(post.date)
            let showContent = post.content.slice(0, 100);

            if (post.content.trim() !== "") {
                
                postListHTML += `
                <li id="list-item">
                <br>
                <h2>${post.title}</h2>
                <br>
                <i>${post.author} / ${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()} ${postDate.toLocaleTimeString()}</i>
                <br>
                <br>
                <b>Tags:</b> <span> ${post.tags}</span>
                <br>
                <p>${showContent} <a id="readMore" href="readmore.html?id=${post._id}">...read more</a></p>
                <br>
                </li>
                <hr>
                `
            }
        }
        
        document.getElementById('post-list').innerHTML = postListHTML;

    } catch(error) {
        console.log(error)
    }
}

fetchAllPosts();