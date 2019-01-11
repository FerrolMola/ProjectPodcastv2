export function parseEpisode(episode, numEpisode){
	const episodeTitle = episode.querySelector('title').textContent,
		id = numEpisode,
		pubDate = new Date(episode.querySelector('pubDate').textContent).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
		durEl = episode.querySelector('duration'),		
		enclosureEl = episode.querySelector('enclosure'),
		mp3 = enclosureEl ? enclosureEl.getAttribute('url') : null,	
		descriptionEl = episode.querySelector('description'),
		episodeDescription = descriptionEl ? descriptionEl.textContent: '-';
	let duration = durEl ? durEl.textContent: '-';

	if (!isNaN(duration)) {
		duration = formatTime(duration);
	}

	return {
		episodeTitle,
		id,
		pubDate,
		duration,
		mp3,
		episodeDescription
	};
}

function formatTime(n) {
	const num = n,
		hours = Math.floor(num / (60 * 60)),		
		rhours = `${hours}`,
		minutes = Math.floor((num % (60*60)) / 60),
		rminutes = `${minutes}`,
		seconds = minutes % 60,
		rseconds = `${seconds}`,
		strDuration = `${rminutes.padStart(2, '0')}:${rseconds.padStart(2, '0')}`;

	return hours > 0 ?  `${rhours}:${strDuration}` : strDuration;
}
	

export function parseEpisodes(podcastDocument) {	    
	let numEpisode = 0,
		episodes = [];
        
	Array.from(podcastDocument.querySelectorAll('rss channel item'))
		.map(episode => {	
			episodes.push(
				parseEpisode(episode,numEpisode++)
			);
		});

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