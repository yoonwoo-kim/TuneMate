import { ConcertSearchOption } from "@/types/concert";
import { Group } from "@/types/group";
import { Meeting } from "@/types/meeting";
import { Friend } from "@/types/social";
import { UserInfo } from "@/types/user";

export const QueryKey = Object.freeze({
  // user
  useLoginQuery: () => ["useLoginQuery"],
  useReissueTokenQuery: () => ["useReissueTokenQuery"],
  useUserInfoQuery: (userId: UserInfo["userId"]) => [
    "useUserInfoQuery",
    userId,
  ],

  // social
  useChatsQuery: (relationId: Friend["relationId"]) => [
    "useChatsQuery",
    relationId,
  ],
  useMyChatRoomsQuery: () => ["usemyChatRooms"],
  useSendSocialFriendRequestsQuery: () => ["useSendSocialFriendRequestsQuery"],
  useSocialFriendRequestsQuery: () => ["useSocialFriendRequestsQuery"],
  useSocialFriendsQuery: () => ["useSocialFriendsQuery"],

  //   recommendataion
  useRecommendationFriendsQuery: () => ["useRecommendationFriendsQuery"],
  useRecommendationSongsQuery: () => ["useRecommendationSongsQuery"],

  //   music
  useCommonPlayListQuery: (playlistId: string) => [
    "useCommonPlayListQuery",
    playlistId,
  ],
  useIndividualPlayListRepresentativeQuery: () => [
    "useIndividualPlayListRepresentativeQuery",
  ],
  useIndividualPlayListsQuery: (userId: UserInfo["userId"]) => [
    "useIndividualPlayListsQuery",
    userId,
  ],

  //   meeting
  useMeetingsQuery: (relationId: Meeting["relationId"]) => [
    "useMeetingsQuery",
    relationId,
  ],

  //   group
  useGroupQuery: (groupId: Group["groupId"]) => ["useGroupQuery", groupId],
  useGroupReceivedParticipationsQuery: () => [
    "useGroupReceivedParticipationsQuery",
  ],
  useGroupSentParticipationsQuery: () => ["useGroupSentParticipationsQuery"],
  useGroupsQuery: () => ["useGroupsQuery"],
  useMyGroupsQuery: () => ["useMyGroupsQuery"],

  //   concert
  useConcertsQuery: (concertSearchOption: ConcertSearchOption) => [
    "useConcertsQuery",
    concertSearchOption,
  ],
});
