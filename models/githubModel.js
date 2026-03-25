const axios = require("axios");

exports.getGitHubPortfolioData = async (username) => {
    const user = await axios.get(`https://api.github.com/users/${username}`);
    const repos = await axios.get(`https://api.github.com/users/${username}/repos`);

    const topRepos = repos.data
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map(repo => ({
            name: repo.name,
            star_count: repo.stargazers_count,
            language: repo.language || "Not Specified",
            url: repo.html_url
        }));

    let language = [];
    let count = [];

    for (let i = 0; i < repos.data.length; i++) {
        if (repos.data[i].language == null) {
            continue;
        }

        if (language.includes(repos.data[i].language)) {
            let idx = language.findIndex(x => x === repos.data[i].language);
            count[idx] = count[idx] + 1;
        } else {
            language.push(repos.data[i].language);
            count.push(1);
        }
    }

    let skills = [];

    for (let i = 0; i < language.length; i++) {
        const newObj = {
            language: language[i],
            count: count[i]
        };
        skills.push(newObj);
    }

    skills = skills.sort((a, b) => b.count - a.count).slice(0, 5);

    const stats = {
        totalRepos: user.data.public_repos,
        followers: user.data.followers,
        following: user.data.following
    };

    const about = {
        avatar: user.data.avatar_url,
        name: user.data.name || user.data.login,
        bio: user.data.bio || "No bio available",
        profile_url: user.data.html_url
    };

    return {
        about,
        projects: topRepos,
        stats,
        skills
    };
};