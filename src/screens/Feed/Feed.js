import React, {useState, useCallback, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import api from '#api';

export const Feed = ({navigation}) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: 'asqwdqwdd',
    },
    {
      id: 2,
      text: 'asdaqwdq dw qwd wqdwdqwsd',
    },
    {
      id: 3,
      text: 'asdasd',
    },
    {
      id: 4,
      text: 'asdasd',
    },
    {
      id: 5,
      text: 'asdasd',
    },
    {
      id: 6,
      text: 'asdasd',
    },
    {
      id: 7,
      text: 'asdasd',
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = useCallback(async () => {
    try {
      const response = await api.get('post');
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPosts();
    setRefreshing(false);
  }, []);

  const renderItem = ({item}) => {
    const {id, text, user, images} = item;

    return (
      <Pressable
        style={styles.renderItem}
        onPress={() => navigation.navigate('Post', {id})}>
        <Image
          source={{uri: 'https://picsum.photos/200'}}
          style={styles.image}
        />
        <View style={styles.user}>
          <Text>{user?.nickname}</Text>
          <TouchableOpacity>
            <Text>asd</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        style={styles.flatList}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={{paddingTop: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 5,
  },
  user: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  renderItem: {
    flex: 1,
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
});
