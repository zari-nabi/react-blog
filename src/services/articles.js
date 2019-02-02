import Axios from 'axios';

import config from '../config';

export default class ArticlesService{
    async getArticleCategories(){
        const response = await Axios.get(`${config.apiUrl}/categories`);

        return response.data.categories;
    }

    createArticle = async (data) => {
     //   console.log(this)
        await this.uploadToCloudinary(data.image);
    }

    async uploadToCloudinary(image){
        const form = new FormData();
        form.append('file',image);
        form.append('upload_preset','nv77svhs');

        const response = await Axios.post('https://api.cloudinary.com/v1_1/zari/image/upload',form);
     //   console.log(response);
        return response.data;
    }
}