import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserSavedPosts } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import useAppwrite from '../../lib/useAppwrite';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { useGlobalContext } from '../../context/GlobalProvider';

const BookMark = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserSavedPosts(user.$id));

  useEffect(() => {
    refetch();
  }, [query]);

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
            <View className="flex my-6 px-4">
              <Text className="text-2xl text-white font-psemibold">
                Your Saved Videos
              </Text>
              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found in your bookmarks."
          />
        )}
      />
    </SafeAreaView>
  );
};

export default BookMark