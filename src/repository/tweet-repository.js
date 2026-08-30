import Tweet from '../models/tweet.js'
import CrudRepository from './crud-repository.js'

class TweetRepository extends CrudRepository{
    constructor(){
        super(Tweet);
    }
    async create(data){
        try {
            const tweet= await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    //lean is used so that the object we will get is JS object,otherwise default is mongoDB object
    async getWithComments(id){
         try {
            const tweet= await Tweet.findById(id).populate('comments').lean();
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(offset,limit){
        try {
            const tweet=await Tweet.find().skip(offset).limit(limit);
            return tweet; 
        } catch (error) {
            console.log(error);
        }
    }

    async find(id){
        try {
            const tweet=await Tweet.findById(id).populate({path:'likes'});
            return tweet
        } catch (error) {
            console.log(error);
        }
    }
}

export default TweetRepository;