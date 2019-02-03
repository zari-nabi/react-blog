/*import Axios from 'axios';
import {validateAll} from 'indicative';

import config from '../config';

export default class ArticlesService {
    async getArticleCategories() {
        const response = await Axios.get(`${config.apiUrl}/categories`);

        return response.data.categories;
    }

    createArticle = async (data, token) => {
        const rules ={
            title:'required',
            image:'required',
            content:'required',
            category:'required',
        }
        const messages= {
            required :'the {{field}} is required',
        }

        validateAll(data, rules, messages);

        const image = await this.uploadToCloudinary(data.image);
        try {
            const response = await Axios.post(`${config.apiUrl}/articles`, {
                title: data.title,
                content: data.content,
                category_id: data.category,
                imageUrl: image.secure_url,
            }, {
                    headers: {
                        Autorization: `Bearer ${token}`,
                    }
                })
            console.log(response)
            return response.data;

        } catch (errors) {
            if(errors.response){
               return Promise.reject(errors.response.data);
            }
            return Promise.reject(errors);
        }
    }

    async uploadToCloudinary(image) {
        const form = new FormData();
        form.append('file', image);
        form.append('upload_preset', 'nv77svhs');

        const response = await Axios.post('https://api.cloudinary.com/v1_1/zari/image/upload', form);
        return response.data;
    }

}*/
import Axios from 'axios';
import { validateAll } from 'indicative';

import config from '../config';

export default class ArticlesService {
  async getArticleCategories() {
    const response = await Axios.get(`${config.apiUrl}/categories`);

    return response.data.categories;
  }

  createArticle = async (data, token) => {
    if (!data.image) {
      return Promise.reject([{
        message: 'The image is required.',
      }]);
    }

    try {
      const rules = {
        title: 'required',
        content: 'required',
        category: 'required',
      };

      const messages = {
        required: 'The {{ field }} is required.',
      };

      await validateAll(data, rules, messages);

      const image = await this.uploadToCloudinary(data.image);
      const response = await Axios.post(`${config.apiUrl}/articles`, {
        title: data.title,
        content: data.content,
        category_id: data.category,
        imageUrl: image.secure_url,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      return response.data;
    } catch (errors) {
      if (errors.response) {
        return Promise.reject(errors.response.data);
      }

      return Promise.reject(errors);
    }
  }

  async uploadToCloudinary(image) {
    const form = new FormData();
    form.append('file', image);
    form.append('upload_preset', 'nv77svhs');

    const response = await Axios.post('https://api.cloudinary.com/v1_1/zari/image/upload', form);

    return response.data;
  }
}