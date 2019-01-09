export function parseEpisode(episode,numEpisode){
	const episodeTitle = episode.querySelector('title').textContent,
		id = numEpisode,
		pubDate = new Date(episode.querySelector('pubDate').textContent).toLocaleDateString(),
		durEl = episode.querySelector('duration'),
		duration = durEl? durEl.textContent: '-',
		mptEl = episode.querySelector('enclosure'),				
		mp3 = mptEl.getAttribute('url') ? mptEl.getAttribute('url').textContent: '-',
		descriptionEl = episode.querySelector('description'),
		episodeDescription = descriptionEl ? descriptionEl.textContent: '-';

		return {
			episodeTitle,
			id,
			pubDate,
			duration,
			mp3,
			episodeDescription
		}
}

export function parseEpisodes(podcastDocument) {	    
	let numEpisode = 0,
        episodes = [];
        
	Array.from(podcastDocument.querySelectorAll('rss channel item'))
		.map(episode => {	
			episodes.push(
				parseEpisode(episode,numEpisode++)
			)
	})

	return episodes;
}

export function parsePodcast(podcast) {
	const id = podcast.id.attributes['im:id'],		
		name = podcast['im:name'].label,
		author = podcast['im:artist'].label,
		description = podcast['summary'] ? podcast['summary'].label : 'Description not available',
		img = podcast['im:image'].filter((imageData) => imageData.attributes.height === '170')[0].label;

	return {
		id,
		name,
		author,
		description,
		img,		
	};
}