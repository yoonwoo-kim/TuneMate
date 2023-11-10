import { Friend } from "@/types/social";

const TUNEMATE_DOMAIN = `tunemate.co.kr`;
const TUNEMATE_API_VERSION = "api/v1";
export const TUNEMATE_API_BASE_URL = `https://${TUNEMATE_DOMAIN}/${TUNEMATE_API_VERSION}`;
export const SPOTIFY_API_BASE_URL = `https://api.spotify.com/v1`;
export const SOCKET_API_BASE_URL = `${TUNEMATE_API_BASE_URL}/social-service`;

export const SOCKET_URL = Object.freeze({
  brokerURL: () =>
    `wss://${TUNEMATE_DOMAIN}/${TUNEMATE_API_VERSION}/social-service/chat`,
  // `ws://k9A603.p.ssafy.io:8082/chat`,
  subscribeURL: (relationId: Friend["relationId"]) => `/topic/${relationId}`,
  // `${SOCKET_API_BASE_URL}/topic/${relationId}`,

  publishURL: () => `/pub/chat`,
});