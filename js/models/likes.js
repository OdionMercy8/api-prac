export default class Like {
    constructor(){
        this.likes = []
    };

    addLike(id, title, veg, image){
        let like = {id, title, veg, image};
        this.likes.push(like)

        this.getStorage()

        return like
    };

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index , 1)
        this.getStorage()
       
    };

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    };

    getNumLikes(){
        return this.likes.length
    };

    getStorage(){
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    readStorage(){
        let storage = JSON.parse(localStorage.getItem('likes'))
        if (storage) this.likes = storage
    }
}
