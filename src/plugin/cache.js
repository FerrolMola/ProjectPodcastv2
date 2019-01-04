export function save(key, data, ttl) {
    const podcasts = {
        data: data,
        expiration: ttl,
    }
    localStorage.setItem(key, JSON.stringify(podcasts));
}

export function load(key, ttl) {
    const podcasts = JSON.parse(localStorage.getItem(key)) || {};   
    if (podcasts.data && podcasts.expiration && podcasts.expiration > ttl){
        localStorage.removeItem(key);
    }
    return podcasts;
}

