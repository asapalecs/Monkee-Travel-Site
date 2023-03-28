const fortuneCookies = [
    "Quote1",
    "Quote2",
    "Quote3",
    "Quote4",
    "Quote5",
    "Quote6"
]

exports.getFortune = () =>{
    const idx = Math.floor(Math.random()*fortuneCookies.length);
    return fortuneCookies[idx];
}