const handleLikes = async (link)=>{
    await fetch(link)
    document.location.reload()
}