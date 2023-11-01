package com.tunemate.social.tunematesocial.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tunemate.social.tunematesocial.dto.request.FriendRequestDto;
import com.tunemate.social.tunematesocial.dto.request.PlaylistRequestDto;
import com.tunemate.social.tunematesocial.dto.response.ReceivedFriendRequestResponseDto;
import com.tunemate.social.tunematesocial.service.SocialService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@Slf4j
@RequestMapping("/social")
public class SocialController {
	private final SocialService socialService;

	@Autowired
	public SocialController(SocialService socialService) {
		this.socialService = socialService;
	}

	/**
	 * 친구 신청하는 API입니다.
	 * @param friendRequestDto
	 * @param userId
	 * @return
	 */
	@PostMapping("/friend-request")
	public ResponseEntity<?> addFriendRequest(@RequestBody FriendRequestDto friendRequestDto,
		@RequestHeader("UserId") String userId) {
		log.debug("친구 요청");
		socialService.addFriendRequest(userId, friendRequestDto);

		return ResponseEntity.ok().build();
	}

	/**
	 * 받은 친구요청 목록을 조회하는 API입니다.
	 * @param userId
	 * @return
	 */
	@GetMapping("/friend-requests")
	public ResponseEntity<?> getFriendRequests(@RequestHeader("UserId") String userId) {
		log.debug("친구 요청 목록 조회");

		List<ReceivedFriendRequestResponseDto> friendRequests = socialService.getFriendRequests(userId);

		return ResponseEntity.ok(friendRequests);
	}

	/**
	 * 해당 친구 요청을 수락하는 API입니다.
	 * @param newFriendId
	 * @param userId
	 * @return
	 */
	@PostMapping("/acceptance/{userId}")
	public ResponseEntity<?> acceptFriendRequest(@PathVariable("userId") String newFriendId,
		@RequestHeader("UserId") String userId) {
		log.debug(userId + "님이 " + newFriendId + "님의 친구 요청을 수락하였습니다.");

		socialService.acceptFriendRequest(userId, newFriendId);

		return ResponseEntity.ok().build();
	}

	@PostMapping("/decline/{userId}")
	public ResponseEntity<?> declineFriendRequest(@PathVariable("userId") String notFriendId,
		@RequestHeader("UserId") String userId) {
		log.debug(userId + "님이 " + notFriendId + "님의 친구 요청을 거절하였습니다.");

		socialService.declineFriendRequest(userId, notFriendId);

		return ResponseEntity.ok().build();
	}

	@PostMapping("/common-playlist")
	public ResponseEntity<?> addCommonPlayListInfo(@RequestBody PlaylistRequestDto playlistRequestDto) {
		log.debug("플레이리스트 id 및 host 정보를 저장합니다.");

		socialService.addPlaylistIdAndHost(playlistRequestDto);

		return ResponseEntity.ok().build();
	}
}
