const express = require("express");
const path = require("path");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", portfolioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// const express = require("express");
// const axios = require("axios");

// const app = express();


// app.use(express.json());
// app.set("view engine","ejs");
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.render("selector");
// });

// app.get("/portfolio", async (req, res) => {
//     const username = req.query.username;
//     const template = req.query.template || "portfolio";
    
//     try{
//         const user = await axios.get(`https://api.github.com/users/${username}`);
//         const repos = await axios.get(`https://api.github.com/users/${username}/repos`);

//         const topRepos = repos.data.sort((a,b)=>b.stargazers_count - a.stargazers_count).slice(0,5).map(repo=>({
//                 name: repo.name,
//                 star_count: repo.stargazers_count,
//                 language: repo.language || "not specified",
//                 url: repo.html_url
//         }))

//         let language = [];
//         let count = [];

//         for(let i=0;i<repos.data.length;i++){
//             if(repos.data[i].language == null){
//                 continue;
//             }
//             if(language.includes(repos.data[i].language)){
//                 let idx = language.findIndex(x=> x== repos.data[i].language);
//                 count[idx] = count[idx]+1;
//             }else{
//                 language.push(repos.data[i].language);
//                 count.push(1);
//             }
//         }
//         let skills = [];

//         for(let i=0;i<language.length;i++){
//             const newObj = {language: language[i],count: count[i]};
//             skills.push(newObj)
//         }

//         skills = skills.sort((a,b)=>{return b.count-a.count}).slice(0,5);

//         // const followers = await axios.get(`https://api.github.com/users/${username}/followers`);
//         // const following = await axios.get(`https://api.github.com/users/${username}/following`);

//         const stats = {
//             totalRepos: user.data.public_repos,
//             followers: user.data.followers,
//             following: user.data.following
//         }
//         const about = {
//             avatar: user.data.avatar_url,
//             name: user.data.name || user.data.login,
//             bio: user.data.bio || "no bio available",
//             profile_url : user.data.html_url
//         }

//         res.render(template,{
//             about,
//             projects: topRepos,
//             stats,
//             skills
//         });
//     }catch(err){
//         console.error(err.message);
//         res.status(500).json({
//             msg: "Internal Server Error"
//         });
//     }
// })


// app.listen(3000,()=>{
//     console.log(`Listening on port 3000`);
// })