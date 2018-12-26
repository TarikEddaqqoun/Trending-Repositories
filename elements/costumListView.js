import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';

import reposLoader from '../services/reposLoader';


class ReposList extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      reposList: [],
    };
    this.loadRepos = reposLoader.loadRepos.bind(this);
  }
  componentDidMount() {
    this.loadRepos();
  }
  
  handleLoadMore() 
  {
    this.setState(state=>({page:state.page+1}),()=>this.loadRepos());
  }
  handleRefresh()
  {
    //TO AVOID INIFINIT LOOP ( DONT DO ANYTHING WHEN THE DATA IS REFRESHED )
  }
  render() {
    return (
      <View style={styles.container}>
        <CustomListview itemList={this.state.reposList} pere={this} />
      </View>
    );
  }
}

const handleOpenURL = (url) =>
{
  Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
}

const CustomListview = ({ itemList, pere }) => (
    <FlatList
      data={itemList}
      onEndReached={()=>pere.handleLoadMore()}
      onEndReachedThreshold={1}
      onRefresh={pere.handleRefresh()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.button} onPress={() => {handleOpenURL(item.html_url)}}>
        
          <CustomRow
            title={item.name}
            description={item.description}
            owner={item.owner.login}
            stars={
              item.stargazers_count >= 1000
                ? item.stargazers_count / 1000 + 'k'
                : item.stargazers_count
            }
            avatar={item.owner.avatar_url}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
);

const CustomRow = ({ title, description, owner, stars, avatar }) => (
  <View style={styles.containerRow}>
    <View style={styles.container_text}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.container_bot}>
        <View style={styles.owner}>
          <Image
            style={styles.image}
            source={{uri: avatar}}
          />
          <Text style={styles.owner}>{owner}</Text>
        </View>
        <View style={styles.stars}>
          <Icon style={styles.starIcon} name='star'/>
          <Text style={styles.nbStars}> {stars}</Text>
        </View>
        
      </View>
    </View>
  </View>
);

export default class CostumListView extends React.Component {
  render() {
    return <ReposList />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  container_bot: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  containerRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  title: {
    fontSize: 20,
    color: '#ff0000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 13,
    margin: 5,
  },
  owner: {
    flexDirection : 'row',
    frontSize: 5,
    left: 5,
  },
  stars: {
    flexDirection: 'row'
  },
  image: {
    width: 20, 
    height: 20,
    padding : 10
  },
  nbStars:
  {
    fontSize : 20
  },
  starIcon:
  {
    height : 5
  }

});
