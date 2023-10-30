import { NewCommonPlayList, PlayList } from '@/types/playList';
import { authApi } from '..';
import { ChangeTrackIndex } from '@/types/spotify';

const COMMON_PLAYLISTS_URL = 'music/common/playlists';

// 공동 플레이리스트 조회
const getCommonPlayList = async (
  playlistId: PlayList['id'],
): Promise<PlayList> => {
  const response = await authApi.get<PlayList>(
    `${COMMON_PLAYLISTS_URL}/${playlistId}`,
  );
  return response.data;
};
// 공동 플레이리스트 생성
const createCommonPlayList = async (newCommonPlayList: NewCommonPlayList) => {
  await authApi.post<void>(COMMON_PLAYLISTS_URL, newCommonPlayList);
};
// 공동 플레이리스트 트랙 추가
const createCommonPlayListTrack = async (
  playlistId: PlayList['id'],
  uris: string[],
  position: number,
) => {
  await authApi.post<void>(`${COMMON_PLAYLISTS_URL}/${playlistId}/tracks`, {
    uris,
    position,
  });
};
// 공동 플레이리스트 트랙 삭제
const deleteCommonPlayListTrack = async (
  playlistId: PlayList['id'],
  uri: string,
  positions: number[],
) => {
  await authApi.delete<void>(`${COMMON_PLAYLISTS_URL}/${playlistId}/tracks`, {
    tracks: [{ uri, positions }],
  });
};
// 공동 플레이리스트 트랙 순서 변경
const updateCommonPlayListTrack = async (
  playlistId: PlayList['id'],
  changeTrackIndex: ChangeTrackIndex,
) => {
  await authApi.put<void>(
    `${COMMON_PLAYLISTS_URL}/${playlistId}/tracks`,
    changeTrackIndex,
  );
};

export {
  getCommonPlayList,
  createCommonPlayList,
  createCommonPlayListTrack,
  deleteCommonPlayListTrack,
  updateCommonPlayListTrack,
};