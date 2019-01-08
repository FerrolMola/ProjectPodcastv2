const Podcast = {

    getHtml(podcast) {
        return `<section class="sidebar-section">
                    <div class="section sidebar">
                        <div class="podcast-cover text-center">
                            <a href="${`/podcast/${podcast.id}`}">
                                <img src="${podcast.img}" alt="${podcast.name}">
                            </a>
                        </div>
                        <hr/>
                        <div class="podcast-title">
                            <a href="${`/podcast/${podcast.id}`}">
                                <div class="title">${podcast.name}</div>
                                <div class="author"><span>by&nbsp;</span>${podcast.author}</div>
                            </a>
                        </div>
                        <hr/>
                        <div class="podcast-description">
                            <div>Description:</div>
                            <p>${podcast.description}</p>
                        </div>
                    </div>
                </section>`;
    },
}

export default Podcast;