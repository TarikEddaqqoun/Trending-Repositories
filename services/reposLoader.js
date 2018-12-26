import axios from 'axios';
import React from 'react';
import {Alert} from 'react-native';

const reposLoader = {

    async loadRepos()
    {

        
        
        let page = this.state.page;
        let oneDay = 86400000; // a day in miliseconds
        var currentDate = new Date(); 
        currentDate -= 30*oneDay; // we substraction 30 days from the current day
        let date = new Date(currentDate);
        let dateString = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); // and this is the day from where we are looking for
        let url ='https://api.github.com/search/repositories?q=created:>'+dateString+'&sort=stars&order=desc&page='+page;
        let reponse;
        try
        {
            reponse = await axios.get(url);
            this.setState({reposList : [...this.state.reposList,...reponse.data.items]})
        } catch(e)
        {
            console.log(e);
        }
    }
};

export default reposLoader;
