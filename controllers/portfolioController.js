const githubModel = require("../models/githubModel");

exports.getSelectorPage = (req, res) => {
    res.render("selector");
};

exports.getPortfolio = async (req, res) => {
    const username = req.query.username;
    const template = req.query.template || "portfolio";

    if (!username) {
        return res.status(400).json({
            msg: "Username is required"
        });
    }

    try {
        const data = await githubModel.getGitHubPortfolioData(username);

        res.render(template, {
            about: data.about,
            projects: data.projects,
            stats: data.stats,
            skills: data.skills
        });
    } catch (err) {
        console.error(err.message);

        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};