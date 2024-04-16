import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserPosts, signOut } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import useAppwrite from '../../lib/useAppwrite';
import EmptyState from '../../components/EmptyState';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setIsLogged, setUser } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  useEffect(() => {
    refetch();
  }, []);

  const logout = async () => {
    await signOut();
    setIsLogged(false);
    setUser(null);
    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.users.username}
            avatar={item.users.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="w-full justify-center items-center mt-6 mb-12 px-14">
              <TouchableOpacity
                className="self-end mb-10"
                onPress={logout}
              >
                <Image source={icons.logout} resizeMode='contain' className="w-6 h-6"/>
              </TouchableOpacity>
              
              <View className="w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center">
                <Image source={{uri: user.avatar}} resizeMode='cover' className="w-[90%] h-[90%] rounded-lg"/>
              </View>

              <Text className="text-lg font-psemibold text-white mt-5">
                {user.username}
              </Text>

              <View className="flex-row mt-5">
                <InfoBox 
                  title={posts.length || 0}
                  subtitle="Posts"
                  containerStyles="mr-10"
                  titleStyles="text-xl"
                />
                <InfoBox 
                  title="1.4k"
                  subtitle="Views"
                  containerStyles=""
                  titleStyles="text-xl"
                />
              </View>
              
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile